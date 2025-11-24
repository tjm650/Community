from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce
from django.core.files.base import ContentFile
import base64

from api.serializers import UserSerializer #SearchSerializer
from afollows.serializers import FriendSerializer, RequestSerializer
from afollows.models import Connection


from api.models import User

from amessages.models import Message
from amessages.serializers import MessageSerializer


# --------------------------------------------------------------
#                    receive_user_Agreement
# --------------------------------------------------------------
def receive_user_agreement(self, data):
    user = self.scope["user"]
    agreement = data.get("agreement")

    # User.objects.filter(username=user.username).update(email=data['email'], phone=data['phone'])
    User.objects.filter(username=user.username).update(agreement=agreement)
    # Serialize User
    serialized = UserSerializer(user)

    # Send Updated user.data with Email
    self.send_group(self.username, "user.agreement", serialized.data)


# --------------------------------------------------------------
#                    receive_user_email
# --------------------------------------------------------------
def receive_user_email(self, data):
    user = self.scope["user"]
    email = data.get("email")

    # User.objects.filter(username=user.username).update(email=data['email'], phone=data['phone'])
    User.objects.filter(username=user.username).update(email=email)
    # Serialize User
    serialized = UserSerializer(user)

    # Send Updated user.data with Email
    self.send_group(self.username, "user.email", serialized.data)



# --------------------------------------------------------------
#                    receive_image
# --------------------------------------------------------------
def receive_image(self, data):
    user = self.scope["user"]
    # Covert base64
    image_str = data.get("base64")
    image = ContentFile(base64.b64decode(image_str))

    # Update Image Field
    filename = data.get("filename")
    print("filename;->", filename)
    user.image.save(filename, image, save=True)

    # Serialize User
    serialized = UserSerializer(user)

    # Send Updated user.data with Image
    self.send_group(self.username, "image.upload", serialized.data)


# --------------------------------------------------------------
#                    receive_user_profile_image
# --------------------------------------------------------------
def receive_user_profile(self, data):
    user = self.scope["user"]
    action = data.get("action")
    first_name = data.get("profile_value")
    last_name = data.get("profile_value2")
    bio = data.get("profile_value")
    prof_initial = data.get("profile_value")
    program = data.get("profile_value")
    profession = data.get("profile_value")
    service_id = data.get("profile_value")
    agreement = data.get("profile_value")
    market_agreement = data.get("profile_value")
    verified = data.get("profile_value")
    cell = data.get("profile_value")

    profile_image_filename = data.get("profile_image_filename")
    profile_image_base64 = data.get("profile_image_imageBase64")

    cover_image_filename = data.get("cover_image_filename")
    cover_image_base64 = data.get("cover_image_base64")

    try:
        modify_user = User.objects.get(id=user.id)
    except User.verified or User.DoesNotExist:
        print("Error: couldnt find user")
        return

    if action == "first_name":
        try:
            modify_user.first_name = first_name
            modify_user.save()
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "last_name":
        try:
            modify_user.last_name = last_name
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "bio":
        try:
            modify_user.bio = bio
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "profession":
        try:
            modify_user.profession = profession
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "prof_initial":
        try:
            modify_user.prof_initial = prof_initial
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "program":
        try:
            modify_user.program = program
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "agreement":
        try:
            modify_user.agreement = agreement
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "market_agreement":
        try:
            modify_user.market_agreement = market_agreement
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "verified":
        try:
            modify_user.verified = verified
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "cell":
        try:
            modify_user.cell = cell
            modify_user.save()
        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "profile_image":
        try:
            # print("profile_image_filename--->", profile_image_filename)
            decoded_profile_image = base64.b64decode(profile_image_base64)
            get_profile_image = ContentFile(
                decoded_profile_image, name=profile_image_filename
            )
            modify_user.profile_image.save(get_profile_image, save=True)

        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "coverImage":
        try:
            # print("cover_image_filename-->", cover_image_filename)
            decoded_cover_image = base64.b64decode(cover_image_base64)
            get__cover_image = ContentFile(
                decoded_cover_image, name=cover_image_filename
            )
            modify_user.coverImage.save(get__cover_image, save=True)

        except User.DoesNotExist:
            print("Error: couldnt find user")
        return

    if action == "service_name":
        try:
            # service_connection = CommunityDirectory.objects.get(id=service_id)
            service_name = service_id
            modify_user.service_name(service_name)
        except User.DoesNotExist:
            print("Error: couldnt find user")
            return

    # # Covert base64
    # image_str = data.get("base64")
    # image = ContentFile(base64.b64decode(image_str))

    # # Update Image Field
    # filename = data.get("filename")
    # print("filename;->", filename)
    # user.image.save(filename, image, save=True)

    # # Serialize User
    modify_user.save()
    serialized = UserSerializer(modify_user)
    print("user update saved")

    self.send_group(self.username, "user.profile", serialized.data)
