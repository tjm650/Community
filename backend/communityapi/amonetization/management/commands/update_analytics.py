from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from ...models import PageVisit, MonetizationAnalytics
import os


class Command(BaseCommand):
    help = 'Update daily monetization analytics data and calculate 7-day trends'

    def handle(self, *args, **options):
        self.stdout.write('Starting daily analytics update...')

        # Use provided date or default to today
        date_str = options.get('date')
        if date_str:
            try:
                from datetime import datetime
                today = datetime.strptime(date_str, '%Y-%m-%d').date()
            except ValueError:
                self.stdout.write(self.style.ERROR('Invalid date format. Use YYYY-MM-DD.'))
                return
        else:
            today = timezone.now().date()

        # Get all unique page names from all visits (to ensure all pages are updated)
        page_names = PageVisit.objects.values_list('page_name', flat=True).distinct()

        # Also include all monetization pages to ensure they're tracked
        monetization_pages = [
            'OnlineTransactions', 'AccommodationAgents', 'Marketing', 'Library',
            'CampusMap', 'ServiceGuide', 'CommunityAds', 'Blogs', 'LostFound'
        ]

        all_pages = set(page_names).union(set(monetization_pages))

        for page_name in all_pages:
            self.update_page_analytics(page_name, today)

        self.stdout.write(
            self.style.SUCCESS(f'Successfully updated daily analytics for {len(all_pages)} pages')
        )

    def add_arguments(self, parser):
        parser.add_argument(
            '--date',
            help='Specific date to update analytics for (YYYY-MM-DD format). Defaults to today.'
        )

    def update_page_analytics(self, page_name, today):
        """Update daily analytics for a specific page."""
        try:
            # Get or create today's analytics record
            analytics, created = MonetizationAnalytics.get_or_create_today(page_name)

            # Calculate today's visits (daily stats)
            today_start = today
            today_end = today + timedelta(days=1)
            today_visits = PageVisit.objects.filter(
                page_name=page_name,
                visited_at__date=today
            )

            # Update today's visit count
            previous_total_visits = analytics.total_visits
            analytics.total_visits = today_visits.count()
            analytics.unique_visitors = today_visits.values('user', 'session_id').distinct().count()

            # Calculate 7-day trends for comparison
            last_7_days_start = today - timedelta(days=7)
            last_7_days_visits = PageVisit.objects.filter(
                page_name=page_name,
                visited_at__date__gte=last_7_days_start,
                visited_at__date__lt=today
            ).count()

            # Calculate previous 7 days for comparison
            last_14_days_start = today - timedelta(days=14)
            previous_7_days_visits = PageVisit.objects.filter(
                page_name=page_name,
                visited_at__date__gte=last_14_days_start,
                visited_at__date__lt=last_7_days_start
            ).count()

            # Calculate percentage change based on 7-day periods
            if previous_7_days_visits > 0:
                analytics.visit_change_percentage = round(
                    ((last_7_days_visits - previous_7_days_visits) / previous_7_days_visits) * 100, 1
                )
            else:
                analytics.visit_change_percentage = 100.0 if last_7_days_visits > 0 else 0.0

            # Update engagement metrics based on daily visits
            # These are calculated as daily estimates based on visit patterns
            daily_visits = analytics.total_visits

            # More realistic daily engagement calculations
            analytics.engagement_rate = min(15.0, max(0.5, (daily_visits / 100.0) * 2.5))
            analytics.link_clicks = max(0, int(daily_visits * 0.12))  # 12% of daily visits
            analytics.profile_visits = max(0, int(daily_visits * 0.08))  # 8% of daily visits
            analytics.likes = max(0, int(daily_visits * 0.15))  # 15% of daily visits
            analytics.replies = max(0, int(daily_visits * 0.06))  # 6% of daily visits
            analytics.reposts = max(0, int(daily_visits * 0.04))  # 4% of daily visits
            analytics.new_followers = max(0, int(daily_visits * 0.025))  # 2.5% of daily visits

            analytics.save()

            self.stdout.write(
                f'Updated daily analytics for {page_name}: {analytics.total_visits} visits today, '
                f'{last_7_days_visits} visits last 7 days, '
                f'{analytics.visit_change_percentage}% change'
            )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error updating daily analytics for {page_name}: {str(e)}')
            )