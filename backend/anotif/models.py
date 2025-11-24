from django.db import models
from django.utils import timezone
from datetime import timedelta

from api.models import CommunityDirectory, User

# Create your models here.
def upload_post_images(instance, filename):
    path = f'anotif/Notifs{instance.service}'
    extension = filename.split('.')[-1]
    if extension:
        path = path + '.' + extension
        return path

class Notif(models.Model):
    # UPDATE_TYPES = [
    #     ('EVE', 'Event'),
    #     ('UPD', 'Update'), 
    #     ('FOR', 'LiveForumn')
    # ]
    
    sender = models.ForeignKey(
        User,
        related_name='notif_sender',
        on_delete=models.CASCADE
    )
    
    service = models.ForeignKey(
        CommunityDirectory,
        related_name='notif_name', 
        on_delete=models.CASCADE
    ) 
      
    update_type = models.CharField(max_length=50)
    description = models.TextField(max_length=1500)
    image = models.ImageField(upload_to=upload_post_images, blank=True, null=True)
    extra_data = models.JSONField(default=dict)  # Additional context data
    likes = models.ManyToManyField(
        User,
        related_name='notif_likes',
    )
    interactions = models.ManyToManyField( 
        User,
        related_name='notif_interactions',
    )
    
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.update_type} : ({self.service})"
    
    
    
    

class Comment(models.Model):
    post = models.ForeignKey(Notif, related_name="notif_comments", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name="notif_comments", on_delete=models.CASCADE)
    description = models.TextField()
    interactions = models.ManyToManyField( 
        User,   
        related_name='notif_comment_interactions',
    )
    likes = models.ManyToManyField(User, related_name="notif_comment_likes", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"Comment by {self.sender.username} on {self.post.id}"

    class Meta:
        ordering = ["-created"]


class PollManager(models.Manager):
    """Custom manager for Poll model with additional query methods"""

    def active_polls(self):
        """Get polls that haven't expired yet"""
        return self.filter(
            is_active=True,
            expired=False
        ).filter(
            models.Q(expires_at__isnull=True) |
            models.Q(expires_at__gt=timezone.now())
        )

    def expired_polls(self):
        """Get polls that have expired"""
        return self.filter(expired=True)

    def get_polls_by_service(self, service_id):
        """Get all polls for a specific service"""
        return self.filter(service_id=service_id)

    def get_popular_polls(self, limit=10):
        """Get most voted polls"""
        return self.annotate(
            total_votes=models.Sum('poll_sections__items__votes')
        ).order_by('-total_votes')[:limit]


class Poll(models.Model):
    """
    Comprehensive Poll model that extends the Notif model functionality
    Stores all poll-specific data and provides rich poll functionality
    """

    POLL_TYPES = [
        ('single', 'Single Choice'),
        ('multiple', 'Multiple Choice'),
    ]

    POLL_CATEGORIES = [
        ('general', 'General'),
        ('entertainment', 'Entertainment'),
        ('education', 'Education'),
        ('sports', 'Sports'),
        ('technology', 'Technology'),
        ('politics', 'Politics'),
        ('business', 'Business'),
        ('health', 'Health'),
        ('lifestyle', 'Lifestyle'),
    ]

    VISIBILITY_TYPES = [
        ('public', 'Public'),
        ('followers', 'Followers Only'),
        ('private', 'Private'),
    ]

    # Link to the base notification
    notification = models.OneToOneField(
        Notif,
        on_delete=models.CASCADE,
        related_name='poll_data',
        primary_key=True
    )

    # Update type for the poll
    update_type = models.CharField(max_length=50, default='Poll')

    # Poll-specific fields
    title = models.CharField(max_length=200, help_text="Poll title")
    poll_question = models.TextField(help_text="The main poll question")
    poll_type = models.CharField(
        max_length=20,
        choices=POLL_TYPES,
        default='single',
        help_text="Type of poll voting"
    )
    category = models.CharField(
        max_length=20,
        choices=POLL_CATEGORIES,
        default='general',
        help_text="Poll category"
    )
    visibility = models.CharField(
        max_length=20,
        choices=VISIBILITY_TYPES,
        default='public',
        help_text="Who can see and vote on this poll"
    )

    # Poll sections and items stored as JSON
    poll_sections = models.JSONField(
        default=list,
        help_text="Poll sections with items and colors"
    )

    # Poll images - support for multiple images
    images = models.JSONField(
        default=list,
        help_text="List of poll images (base64 encoded or URLs)"
    )

    # Settings and configuration
    settings = models.JSONField(
        default=dict,
        help_text="Poll settings and configuration"
    )

    # Timing
    duration_hours = models.PositiveIntegerField(
        default=24,
        help_text="Poll duration in hours"
    )
    expires_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the poll expires"
    )

    # Statistics
    total_votes = models.PositiveIntegerField(default=0)
    total_voters = models.PositiveIntegerField(default=0)
    unique_voter_count = models.PositiveIntegerField(default=0)

    # Status flags
    is_active = models.BooleanField(default=True)
    expired = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    allow_multiple_votes = models.BooleanField(default=False)
    anonymous_voting = models.BooleanField(default=False)
    hide_results_until_expired = models.BooleanField(default=False)
    show_results_after_vote = models.BooleanField(default=True)

    # Reminder settings
    send_reminders = models.BooleanField(default=True)
    reminder_frequency_hours = models.PositiveIntegerField(default=12)

    # Metadata
    tags = models.JSONField(default=list, help_text="Poll tags for search")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Custom manager
    objects = PollManager()

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['expires_at']),
            models.Index(fields=['is_active', 'expired']),
            models.Index(fields=['category']),
            models.Index(fields=['visibility']),
        ]

    def __str__(self):
        return f"Poll: {self.title} ({self.notification.service.username})"

    def save(self, *args, **kwargs):
        """Override save to set expiration time and update notification"""
        if not self.expires_at and self.duration_hours:
            self.expires_at = timezone.now() + timedelta(hours=self.duration_hours)

        # Update the base notification's extra_data with poll information
        if self.notification:
            poll_data = {
                'title': self.title,
                'poll_question': self.poll_question,
                'poll_type': self.poll_type,
                'poll_sections': self.poll_sections,
                'images': self.images,
                'category': self.category,
                'settings': self.settings,
                'expires_at': self.expires_at.isoformat() if self.expires_at else None,
                'total_votes': self.total_votes,
                'total_voters': self.total_voters,
                'is_active': self.is_active,
                'is_expired': self.is_expired,
            }
            self.notification.extra_data.update(poll_data)
            self.notification.save()

        super().save(*args, **kwargs)

    @property
    def time_remaining(self):
        """Get time remaining until poll expires"""
        if not self.expires_at:
            return None

        now = timezone.now()
        if self.expires_at <= now:
            return None

        time_diff = self.expires_at - now
        hours, remainder = divmod(time_diff.total_seconds(), 3600)
        minutes, _ = divmod(remainder, 60)

        return f"{int(hours)}h {int(minutes)}m"

    @property
    def is_expired(self):
        """Check if poll has expired"""
        if not self.expires_at:
            return False
        return timezone.now() >= self.expires_at

    @property
    def is_active_computed(self):
        """Check if poll is active (computed property)"""
        return self.is_active and not self.is_expired

    def can_accept_votes(self):
        """Check if poll can accept new votes"""
        return self.is_active_computed and bool(self.poll_sections)

    @property
    def vote_statistics(self):
        """Get comprehensive vote statistics"""
        total_votes = sum(
            item.get('votes', 0)
            for section in self.poll_sections
            for item in section.get('items', [])
        )

        total_options = sum(
            len(section.get('items', []))
            for section in self.poll_sections
        )

        if total_votes == 0:
            return {
                'total_votes': 0,
                'total_options': total_options,
                'average_votes_per_option': 0,
                'participation_rate': 0,
                'most_voted_option': None,
                'least_voted_option': None,
            }

        # Find most and least voted options
        all_options = []
        for section in self.poll_sections:
            for item in section.get('items', []):
                all_options.append({
                    'text': item.get('text', ''),
                    'votes': item.get('votes', 0),
                    'section': section.get('name', ''),
                })

        most_voted = max(all_options, key=lambda x: x['votes'])
        least_voted = min(all_options, key=lambda x: x['votes'])

        return {
            'total_votes': total_votes,
            'total_options': total_options,
            'average_votes_per_option': round(total_votes / total_options, 2),
            'participation_rate': 0,  # Would need total potential voters
            'most_voted_option': most_voted,
            'least_voted_option': least_voted,
        }

    def get_vote_distribution(self):
        """Get vote distribution as percentages"""
        total_votes = self.vote_statistics['total_votes']
        if total_votes == 0:
            return []

        distribution = []
        for section in self.poll_sections:
            section_name = section.get('name', '')
            section_color = section.get('color', '#FF6B6B')

            for item in section.get('items', []):
                votes = item.get('votes', 0)
                percentage = round((votes / total_votes) * 100, 1) if total_votes > 0 else 0

                distribution.append({
                    'section_name': section_name,
                    'option_text': item.get('text', ''),
                    'votes': votes,
                    'percentage': percentage,
                    'color': section_color,
                })

        return distribution

    def get_winner_options(self):
        """Get options with the highest votes"""
        if not self.poll_sections:
            return []

        max_votes = 0
        winners = []

        for section in self.poll_sections:
            for item in section.get('items', []):
                votes = item.get('votes', 0)
                if votes > max_votes:
                    max_votes = votes
                    winners = [{
                        'section_name': section.get('name', ''),
                        'option_text': item.get('text', ''),
                        'votes': votes,
                        'color': section.get('color', '#FF6B6B'),
                    }]
                elif votes == max_votes and votes > 0:
                    winners.append({
                        'section_name': section.get('name', ''),
                        'option_text': item.get('text', ''),
                        'votes': votes,
                        'color': section.get('color', '#FF6B6B'),
                    })

        return winners

    def record_vote(self, user, option_indices):
        """
        Record a vote for the poll
        option_indices: list of indices for voted options (for multiple choice)
        """
        # Check if poll can accept votes
        if not self.can_accept_votes():
            if self.is_expired:
                raise ValueError("Poll has expired")
            elif not self.is_active:
                raise ValueError("Poll is not active")
            else:
                raise ValueError("Poll cannot accept votes")

        # Additional validation - ensure poll is properly initialized
        if not self.poll_sections:
            raise ValueError("Poll has no voting options")

        # Get all options in flat structure
        all_options = []
        section_item_map = {}  # Maps global index to (section_index, item_index)

        for section_idx, section in enumerate(self.poll_sections):
            for item_idx, item in enumerate(section.get('items', [])):
                global_idx = len(all_options)
                all_options.append(item)
                section_item_map[global_idx] = (section_idx, item_idx)

        # Validate option indices
        for idx in option_indices:
            if idx >= len(all_options):
                raise ValueError(f"Invalid option index: {idx}")

        # Handle single vs multiple choice
        if self.poll_type == 'single':
            if len(option_indices) == 0:
                raise ValueError("No option selected for single choice poll")
            if len(option_indices) > 1:
                raise ValueError("Single choice poll can only have one vote")

            # Remove previous vote if exists
            for i, option in enumerate(all_options):
                if user.id in option.get('user_ids', []):
                    option['votes'] = max(0, option.get('votes', 0) - 1)
                    option['user_ids'] = [uid for uid in option.get('user_ids', []) if uid != user.id]
                    break

            # Add new vote - validate index exists
            if option_indices[0] >= len(all_options):
                raise ValueError(f"Invalid option index: {option_indices[0]}")

            target_option = all_options[option_indices[0]]
            if 'user_ids' not in target_option:
                target_option['user_ids'] = []
            target_option['user_ids'].append(user.id)
            target_option['votes'] = target_option.get('votes', 0) + 1

        else:  # multiple choice
            # Toggle votes for each selected option
            for idx in option_indices:
                option = all_options[idx]
                user_ids = option.get('user_ids', [])

                if user.id in user_ids:
                    # Remove vote
                    option['votes'] = max(0, option.get('votes', 0) - 1)
                    option['user_ids'] = [uid for uid in user_ids if uid != user.id]
                else:
                    # Add vote
                    option['user_ids'].append(user.id)
                    option['votes'] = option.get('votes', 0) + 1

        # Update poll sections with modified options
        for global_idx, (section_idx, item_idx) in section_item_map.items():
            self.poll_sections[section_idx]['items'][item_idx] = all_options[global_idx]

        # Update statistics
        self.total_votes = sum(
            item.get('votes', 0)
            for section in self.poll_sections
            for item in section.get('items', [])
        )

        # Count unique voters
        all_user_ids = set()
        for section in self.poll_sections:
            for item in section.get('items', []):
                user_ids = item.get('user_ids', [])
                all_user_ids.update(user_ids)
        self.unique_voter_count = len(all_user_ids)

        # Check if poll should be marked as expired
        if self.is_expired:
            self.expired = True
            self.is_active = False

        self.save()

    def get_poll_results(self):
        """Get comprehensive poll results"""
        return {
            'id': self.notification.id,
            'title': self.title,
            'poll_question': self.poll_question,
            'poll_type': self.poll_type,
            'category': self.category,
            'total_votes': self.total_votes,
            'unique_voters': self.unique_voter_count,
            'is_expired': self.is_expired,
            'is_active': self.is_active,
            'time_remaining': self.time_remaining,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'created_at': self.created_at.isoformat(),
            'winners': self.get_winner_options(),
            'vote_distribution': self.get_vote_distribution(),
            'statistics': self.vote_statistics,
            'sections': self.poll_sections,
            'settings': self.settings,
        }

    def export_poll_data(self):
        """Export poll data for sharing or backup"""
        return {
            'id': self.notification.id,
            'title': self.title,
            'description': self.poll_question,
            'type': self.poll_type,
            'category': self.category,
            'sections': self.poll_sections,
            'total_votes': self.total_votes,
            'unique_voters': self.unique_voter_count,
            'created_at': self.created_at.isoformat(),
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'is_expired': self.is_expired,
            'results': self.get_poll_results(),
        }


'''
class Comments(models.Model):
    post = models.ForeignKey(
        Notif,
        related_name='comment',
        on_delete=models.CASCADE
        
        )
    sender = models.ForeignKey(
        User,
        related_name='comment_sender',
        on_delete=models.CASCADE
    )
    description = models.TextField(max_length=1500)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"commented by {self.sender.username} @{self.post}"
    
    class Event(models.Model): 
    TITLE_TYPES = [
        ('ENT', 'Entertainment'),
        ('CON', 'Conference'),
        ('WSK', 'Workshop'),
        ('MET', 'Meeting'),
        ('SEM', 'Seminar')
    ]
    update_type = models.OneToOneField(Notif, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, choices=TITLE_TYPES)
    venue = models.CharField(max_length=200)
    speaker = models.CharField(max_length=100)
    duration = models.DurationField()
    

    def __str__(self):
        return f"Update: {self.Notif.update_type} at {self.venue}"
    
'''
    

        
    