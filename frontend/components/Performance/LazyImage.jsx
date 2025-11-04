import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const LazyImage = ({
  source,
  style,
  resizeMode = "cover",
  placeholder,
  theme,
  onLoad,
  onError
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);

  let isLight = theme === "light";

  useEffect(() => {
    // Simple intersection observer simulation
    const timer = setTimeout(() => {
      setInView(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  if (!inView) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: isLight ? "#f0f0f0" : "#333",
            justifyContent: "center",
            alignItems: "center",
          }
        ]}
      >
        <ActivityIndicator
          size="small"
          color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
            justifyContent: "center",
            alignItems: "center",
          }
        ]}
      >
        <MaterialIcons
          name="broken-image"
          size={24}
          color={isLight ? LGlobals.greyText : DGlobals.greyText}
        />
        {placeholder && (
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 10,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            {placeholder}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={style}>
      {loading && (
        <View
          style={[
            style,
            {
              position: "absolute",
              backgroundColor: isLight ? "#f0f0f0" : "#333",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }
          ]}
        >
          <ActivityIndicator
            size="small"
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        </View>
      )}
      <Image
        source={source}
        style={[
          style,
          { opacity: loading ? 0 : 1 }
        ]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
      />
    </View>
  );
};

export default LazyImage;