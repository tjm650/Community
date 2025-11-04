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

const handleCreateFeedback = (
  user,
  newFeedback,
  setNewFeedback,
  image,
  image1,
  setImage,
  setImage1,
  appFeedback
) => {
  Keyboard.dismiss();

  const cleaned = newFeedback.replace(/\s+/g, " ").trim();
  const details = {
    userId: user.id,
    description: newFeedback,
    image: image ? image1 : null,
  };

  if (cleaned.length === 0) return;
  try {
    appFeedback(details);
    setImage(null);
    setImage1(null);
    setNewFeedback("");
  } catch (error) {
    console.error("Error feedback not sent: ", error);
  }
};

export const CreateFeedback = {
  handleCreateFeedback,
  pickImage,
  hideView,
  showView,
  isKeyboardDismissed,
};
