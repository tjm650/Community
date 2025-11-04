import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import { Animated, Keyboard } from "react-native";

async function pickImage(setImage, setImage1) {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaType:
      ImagePicker.CameraType.front || ImagePicker.PermissionStatus.GRANTED,
    allowsEditing: true,
    quality: 1,
    base64: true,
  });
  if (!result.canceled) {
    file = result.assets[0];
    //uploadImage(file);
    setImage(result.assets[0].uri);
    setImage1(result.assets[0]);

    // UploadImage(file);
  }
}
const isKeyboardDismissed = (setShowIfor, translateY, opacity) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowIfor(false);
        // hideView();
        hideView(setShowIfor, translateY, opacity);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowIfor(true);
        // showView();
        showView(setShowIfor, translateY, opacity);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
};

const handleCreateComment = (
  nav,
  postId,
  user,
  newComment,
  setNewComment,
  notifPostCommentsList,
  image,
  image1,
  setImage,
  setImage1,
  sendNotifPostComment
) => {
  Keyboard.dismiss();

  const cleaned = newComment.replace(/\s+/g, " ").trim();
  const details = {
    userId: user.id,
    postId: postId,
    description: newComment,
    // image: image ? image1 : null,
  };

  if (cleaned.length === 0) return;
  try {
    sendNotifPostComment(details);
    notifPostCommentsList;
    setImage(null);
    setImage1(null);
    setNewComment("");
    nav;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

const hideView = (setShowIfor, translateY, opacity) => {
  // Parallel animation for both translation and opacity
  Animated.parallel([
    Animated.timing(translateY, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start(() => {
    setShowIfor(false);
  });
};

const showView = (setShowIfor, translateY, opacity) => {
  setShowIfor(true);
  // Reset values before animating
  translateY.setValue(100);
  opacity.setValue(0);

  Animated.parallel([
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start();
};

export const CreateNotifComment = {
  handleCreateComment,
  pickImage,
  hideView,
  showView,
  isKeyboardDismissed,
};
