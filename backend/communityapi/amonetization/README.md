# Daily Analytics System

This system tracks daily visit statistics for all monetization pages and provides 7-day trend analysis.

## Features

- **Daily Visit Tracking**: Tracks individual page visits per day
- **7-Day Trend Analysis**: Compares current 7-day period with previous 7-day period
- **Real-time Analytics Display**: Shows daily statistics in the frontend
- **Automated Updates**: Daily management command to update analytics

## Setup

### 1. Run Daily Analytics Update

To update analytics data daily, run the management command:

```bash
# Update today's analytics
python manage.py update_analytics

# Update analytics for a specific date
python manage.py update_analytics --date 2024-01-15
```

### 2. Schedule Daily Updates

Add this to your crontab to run daily at midnight:

```bash
# Daily at 00:00 (midnight)
0 0 * * * /path/to/your/project/manage.py update_analytics
```

### 3. Frontend Integration

The frontend automatically:
- Tracks page visits when users navigate to monetization pages
- Fetches daily analytics data for display
- Shows daily visit counts and 7-day trend percentages

## Analytics Data Structure

Each monetization page tracks:
- **Daily Visits**: Number of visits for the current day
- **7-Day Trend**: Percentage change compared to previous 7-day period
- **Engagement Metrics**: Daily estimates for likes, replies, etc.

## Page Names

The system tracks these monetization pages:
- `OnlineTransactions` - Online transactions page
- `AccommodationAgents` - Accommodation listings
- `Marketing` - Marketing content
- `Library` - Library content
- `CampusMap` - Campus map
- `Blogs` - Blog content
- `LostFound` - Lost and found items

## API Endpoints

- `GET /api/amonetization/analytics/dashboard` - Get daily dashboard data
- `POST /api/amonetization/analytics/track-visit` - Track a page visit
- `GET /api/amonetization/analytics/data` - Get analytics data with filters

## Database Models

- **PageVisit**: Individual visit records with timestamps
- **MonetizationAnalytics**: Daily aggregated statistics per page

## Frontend Components

- **Monetization.jsx**: Main analytics dashboard display
- **AnalyticsCard**: Individual page analytics display component
- **analytics.js**: Utility functions for tracking and fetching data