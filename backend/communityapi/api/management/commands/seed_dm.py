import random
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from django.core.files.base import ContentFile

from api.models import User
from afollows.models import Connection
from amessages.models import Message


class Command(BaseCommand):
    help = "Seed direct messages between 'admin1' and another available user. Includes images."

    def add_arguments(self, parser):
        parser.add_argument("--count", type=int, default=12, help="Number of messages to create")

    @transaction.atomic
    def handle(self, *args, **options):
        count = options["count"]

        try:
            admin = User.objects.get(username="admin1")
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("User 'admin1' not found."))
            return

        # pick another user
        other = (
            User.objects.exclude(id=admin.id).order_by("id").first()
        )
        if not other:
            self.stdout.write(self.style.ERROR("No other user available to DM with admin1."))
            return

        # ensure connection exists and accepted
        conn = (
            Connection.objects.filter(sender=admin, receiver=other)
            .union(Connection.objects.filter(sender=other, receiver=admin))
            .first()
        )
        if not conn:
            # create with arbitrary direction
            conn = Connection.objects.create(sender=admin, receiver=other, accepted=True)
        else:
            if not conn.accepted:
                conn.accepted = True
                conn.save(update_fields=["accepted"])

        # small set of sample texts
        texts = [
            "Hey there! Checking in on the new features.",
            "Looks great! Can you share a screenshot?",
            "Uploading an image now.",
            "This is awesome. Let's iterate on the UI.",
            "Sure, I will push another update.",
            "How does the message bubble styling look?",
            "Nice! Reactions will be supported later.",
            "Cool. Also verified the read status flag.",
        ]

        created = 0
        media_root = Path("media/amessage")
        sample_images = list(media_root.glob("**/*.jpg")) + list(media_root.glob("**/*.png"))

        # create alternating messages
        for i in range(count):
            sender = admin if i % 2 == 0 else other
            msg = Message(connection=conn, sender=sender, description=random.choice(texts))

            # Attach an image occasionally if any exist in media
            if sample_images and i % 3 == 2:
                img_path = random.choice(sample_images)
                try:
                    with img_path.open("rb") as f:
                        msg.image.save(img_path.name, ContentFile(f.read()), save=False)
                except Exception:
                    # ignore image failures and continue with text only
                    pass

            msg.red = i % 4 == 0  # randomly mark as read
            msg.created = timezone.now()
            msg.save()
            created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {created} messages between '{admin.username}' and '{other.username}' (connection id {conn.id})."
            )
        )

import random
from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import User
from afollows.models import Connection
from amessages.models import Message


class Command(BaseCommand):
    help = "Create a demo DM thread between admin1 and another user, with images and reactions-like data"

    def add_arguments(self, parser):
        parser.add_argument("--other", type=str, default="", help="Optional other username")
        parser.add_argument("--count", type=int, default=10, help="Number of messages")

    @transaction.atomic
    def handle(self, *args, **options):
        other_username = options["other"]
        count = options["count"]

        try:
            admin = User.objects.get(username="admin1")
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR("User 'admin1' not found."))
            return

        if other_username:
            try:
                other = User.objects.get(username=other_username)
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"User '{other_username}' not found."))
                return
        else:
            other = User.objects.exclude(id=admin.id).order_by('?').first()
            if not other:
                self.stdout.write(self.style.ERROR("No other users available."))
                return

        # Ensure connection
        conn, _ = Connection.objects.get_or_create(sender=admin, receiver=other, defaults={"accepted": True})
        if not conn.accepted:
            conn.accepted = True
            conn.save()

        # Also create reverse connection if your logic expects it
        rev, _ = Connection.objects.get_or_create(sender=other, receiver=admin, defaults={"accepted": True})
        if not rev.accepted:
            rev.accepted = True
            rev.save()

        # Seed messages alternating senders, include some images (leave path null; UI uses image picker)
        texts = [
            "Hey there! 👋",
            "How's your day going?",
            "Sharing an image now...",
            "That looks great! 😄",
            "Let’s meet at 14:00?",
            "Cool! See you then.",
            "Did you check the new post?",
            "Yep, liked and commented! ❤️",
            "Awesome, talk later.",
            "Bye! 👋",
        ]

        created = 0
        for i in range(count):
            sender = admin if i % 2 == 0 else other
            msg = Message.objects.create(
                connection=conn,
                sender=sender,
                description=texts[i % len(texts)],
                red=bool(i % 3 == 0),
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(
            f"Created DM between '{admin.username}' and '{other.username}': {created} messages"
        ))


