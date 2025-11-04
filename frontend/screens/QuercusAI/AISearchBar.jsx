import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AISearchBar = ({
  value,
  onChangeText,
  onSubmit,
  isLoading,
  placeholder = "Ask Quercus AI anything about campus life...",
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";

  const handleSubmit = () => {
    if (!value.trim()) {
      Alert.alert("Please enter a question or request");
      return;
    }
    onSubmit();
  };

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        },
      ]}
    >
      <LinearGradient
        colors={["#8B5CF6", "#EC4899", "#F97316"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.searchGradient}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isLight
                ? "rgba(255,255,255,0.95)"
                : "rgba(21, 23, 24, 0.95)",
            },
          ]}
        >
          <FontAwesome
            name="search"
            size={18}
            color={isLight ? LGlobals.icon : DGlobals.icon}
            style={styles.searchIcon}
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isLight ? LGlobals.text : DGlobals.text },
            ]}
            placeholder={placeholder}
            placeholderTextColor={
              isLight ? LGlobals.lighttext : DGlobals.lighttext
            }
            value={value}
            onChangeText={onChangeText}
            multiline
            numberOfLines={3}
          />
          <Pressable
            style={({ pressed }) => [
              styles.generateButton,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <LinearGradient
              colors={["#8B5CF6", "#EC4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.generateButtonGradient}
            >
              {isLoading ? (
                // <FontAwesome name="circle-stop" size={16} color="#fff" />
                <FontAwesomeIcon size={16} color="#fff" icon={'circle-stop'} /> 
              ) : (
                <>
                  <FontAwesome name="magic" size={16} color="#fff" />
                  <Text style={styles.generateButtonText}>Generate</Text>
                </>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchGradient: {
    borderRadius: 20,
    padding: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    borderRadius: 18,
  },
  searchIcon: {
    marginRight: 12,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    minHeight: 24,
    maxHeight: 80,
    textAlignVertical: "top",
  },
  generateButton: {
    marginLeft: 12,
    marginBottom: 4,
  },
  generateButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});

export default AISearchBar;
