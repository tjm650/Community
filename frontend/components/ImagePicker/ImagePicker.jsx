import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 3 - 8;

const InstagramStyleImagePicker = ({
  images = [],
  onImagesChange,
  maxImages = 6,
  theme
}) => {
  const { global: globalState } = useGlobal();
  let isLight = theme === "light";

  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera and media library permissions are required to upload images.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async (source) => {
    if (images.length >= maxImages) {
      Alert.alert("Limit Reached", `You can only upload up to ${maxImages} images.`);
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setUploading(true);
    try {
      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          allowsMultipleSelection: true,
          selectionLimit: maxImages - images.length,
        });
      }

      if (!result.canceled) {
        const newImages = source === "camera"
          ? [result.assets[0]]
          : result.assets;

        const validImages = newImages.filter(img =>
          img.type === "image" && img.uri
        );

        if (validImages.length > 0) {
          const updatedImages = [...images, ...validImages];
          onImagesChange(updatedImages);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
      console.error("Image picker error:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const renderImageGrid = () => {
    const gridItems = [];

    // Add existing images
    images.forEach((image, index) => {
      gridItems.push(
        <View key={`image-${index}`} style={{ position: "relative" }}>
          <Image
            source={{ uri: image.uri }}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => removeImage(index)}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 12,
              width: 24,
              height: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="close" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    });

    // Add upload buttons if under limit
    if (images.length < maxImages) {
      gridItems.push(
        <View key="upload-buttons" style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => pickImage("camera")}
            disabled={uploading}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              borderStyle: "dashed",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isLight
                ? `${LGlobals.bluetext}10`
                : `${DGlobals.bluetext}20`,
            }}
          >
            {uploading ? (
              <ActivityIndicator color={isLight ? LGlobals.bluetext : DGlobals.bluetext} />
            ) : (
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="camera-alt"
                  size={24}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                />
                <Text
                  style={{
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                    fontSize: 10,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  Camera
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pickImage("gallery")}
            disabled={uploading}
            style={{
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              borderStyle: "dashed",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isLight
                ? `${LGlobals.bluetext}10`
                : `${DGlobals.bluetext}20`,
            }}
          >
            {uploading ? (
              <ActivityIndicator color={isLight ? LGlobals.bluetext : DGlobals.bluetext} />
            ) : (
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="photo-library"
                  size={24}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                />
                <Text
                  style={{
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                    fontSize: 10,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  Gallery
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: images.length === 0 ? "center" : "flex-start"
      }}>
        {gridItems}
      </View>
    );
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        Photos ({images.length}/{maxImages})
      </Text>

      <View
        style={{
          backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
          borderRadius: 12,
          padding: 16,
          minHeight: IMAGE_SIZE + 32,
        }}
      >
        {images.length === 0 ? (
          <View style={{ alignItems: "center", justifyContent: "center", height: IMAGE_SIZE }}>
            <MaterialIcons
              name="add-photo-alternate"
              size={48}
              color={isLight ? LGlobals.greyText : DGlobals.greyText}
            />
            <Text
              style={{
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontSize: 14,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Add photos to help others identify your item
            </Text>
          </View>
        ) : (
          renderImageGrid()
        )}
      </View>

      {images.length > 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <FontAwesomeIcon
            icon={faCamera}
            size={12}
            color={isLight ? LGlobals.greyText : DGlobals.greyText}
            style={{ marginRight: 4 }}
          />
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            Tip: Multiple angles help others identify your item faster
          </Text>
        </View>
      )}
    </View>
  );
};

export default InstagramStyleImagePicker;