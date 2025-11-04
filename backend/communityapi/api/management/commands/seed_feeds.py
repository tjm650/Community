import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction

from api.models import User, CommunityDirectory
from auserpost.models import Post as UserPost, Comment as UserPostComment
from anotif.models import Notif as ServiceNotif, Comment as ServiceNotifComment


class Command(BaseCommand):
    help = "Seed database with sample users, communities, posts, and notifications for all feeds"

    def add_arguments(self, parser):
        parser.add_argument("--users", type=int, default=5, help="Number of users to create")
        parser.add_argument(
            "--communities", type=int, default=5, help="Number of communities to create"
        )
        parser.add_argument(
            "--posts", type=int, default=20, help="Number of user posts to create"
        )
        parser.add_argument(
            "--notifs", type=int, default=15, help="Number of service notifications to create"
        )

    @transaction.atomic
    def handle(self, *args, **options):
        num_users = options["users"]
        num_communities = options["communities"]
        num_posts = options["posts"]
        num_notifs = options["notifs"]

        self.stdout.write(self.style.MIGRATE_HEADING("Seeding data..."))

        users = self._ensure_users(num_users)
        communities = self._ensure_communities(users, num_communities)

        self._seed_user_posts(users, num_posts)
        self._seed_service_notifs(users, communities, num_notifs)

        self.stdout.write(self.style.SUCCESS("Seeding completed."))

    def _ensure_users(self, count: int):
        users = list(User.objects.all()[:count])
        needed = count - len(users)
        if needed <= 0:
            return users

        for idx in range(1, needed + 1):
            n = len(users) + 1
            username = f"seed_user{n}"
            email = f"seed_user{n}@example.com"
            user = User.objects.create_user(
                username=username,
                email=email,
                password="password123",
                first_name=f"Seed{n}",
                last_name="User",
            )
            user.bio = "This is a seeded user for development feeds."
            user.agreement = True
            user.market_agreement = True
            user.verified = random.choice([True, False])
            user.save()
            users.append(user)
        return users

    def _ensure_communities(self, users, count: int):
        communities = list(CommunityDirectory.objects.all()[:count])
        needed = count - len(communities)
        if needed <= 0:
            return communities

        for i in range(needed):
            n = len(communities) + 1
            creator = random.choice(users)
            community = CommunityDirectory.objects.create(
                username=f"seed_community{n}",
                directory_status1="COMMUNITY",
                directory_status2="",
                directory_status3="",
                public=True,
                agreement=True,
                verified=random.choice([True, False]),
                email=f"community{n}@example.com",
                bio="This is a seeded community for development feeds.",
                code=f"C{1000+n}",
                creator=creator,
            )
            # auto-followers for some engagement
            followers = random.sample(users, k=min(len(users), random.randint(1, len(users))))
            for u in followers:
                community.followers.add(u)
            community.save()
            communities.append(community)
        return communities

    def _seed_user_posts(self, users, count: int):
        if not users:
            return
        created_posts = []
        for i in range(count):
            sender = random.choice(users)
            post = UserPost.objects.create(
                sender=sender,
                description=f"Seeded post {i+1} by {sender.username}. This content is for populating feeds.",
            )
            # random likes/interactions
            likers = random.sample(users, k=random.randint(0, min(5, len(users))))
            for u in likers:
                post.likes.add(u)
                post.interactions.add(u)
            post.created = timezone.now() - timedelta(days=random.randint(0, 30))
            post.save()
            created_posts.append(post)

            # comments
            for c in range(random.randint(0, 3)):
                commenter = random.choice(users)
                comment = UserPostComment.objects.create(
                    post=post,
                    sender=commenter,
                    description=f"Seeded comment {c+1} on post {post.id}.",
                )
                reactors = random.sample(users, k=random.randint(0, min(3, len(users))))
                for r in reactors:
                    comment.likes.add(r)
                    comment.interactions.add(r)
                comment.created = post.created + timedelta(minutes=c + 1)
                comment.save()

        self.stdout.write(self.style.HTTP_INFO(f"Created {len(created_posts)} user posts"))

    def _seed_service_notifs(self, users, communities, count: int):
        if not users or not communities:
            return
        created_notifs = []
        update_types = ["EventPost", "UpdatePost", "LiveForum"]
        for i in range(count):
            sender = random.choice(users)
            service = random.choice(communities)
            notif = ServiceNotif.objects.create(
                sender=sender,
                service=service,
                update_type=random.choice(update_types),
                description=f"Seeded {i+1}: update for {service.username}",
                extra_data={
                    "title": f"Update {i+1}",
                    "venue": random.choice(["Main Hall", "Room 12", "Auditorium", "Online"]),
                    "duration": "09:00-12:00",
                },
            )
            # random likes/interactions
            reactors = random.sample(users, k=random.randint(0, min(5, len(users))))
            for u in reactors:
                notif.likes.add(u)
                notif.interactions.add(u)
            notif.created = timezone.now() - timedelta(days=random.randint(0, 30))
            notif.save()
            created_notifs.append(notif)

            # comments
            for c in range(random.randint(0, 3)):
                commenter = random.choice(users)
                comment = ServiceNotifComment.objects.create(
                    post=notif,
                    sender=commenter,
                    description=f"Seeded comment {c+1} on notif {notif.id}.",
                )
                reactors = random.sample(users, k=random.randint(0, min(3, len(users))))
                for r in reactors:
                    comment.likes.add(r)
                    comment.interactions.add(r)
                comment.created = notif.created + timedelta(minutes=c + 1)
                comment.save()

        self.stdout.write(self.style.HTTP_INFO(f"Created {len(created_notifs)} service notifications"))


