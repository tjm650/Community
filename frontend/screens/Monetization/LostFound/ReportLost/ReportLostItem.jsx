import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";
import InstagramStyleImagePicker from "@/components/ImagePicker/ImagePicker";

const ReportLostItem = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    location: "",
    dateLost: "",
    timeLost: "",
    color: "",
    brand: "",
    uniqueFeatures: "",
    estimatedValue: "",
    contactPhone: "",
    contactEmail: "",
    rewardOffered: "",
    urgency: "medium",
    reportedBy: "", // Will be auto-filled with current user
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const categories = [
    "Electronics",
    "Books & Documents",
    "Clothing & Accessories",
    "Keys & Cards",
    "Bags & Wallets",
    "Sports Equipment",
    "Musical Instruments",
    "Other",
  ];

  const urgencyLevels = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.itemName.trim()) {
      Alert.alert("Missing Information", "Please enter the item name.");
      return false;
    }
    if (!formData.category) {
      Alert.alert("Missing Information", "Please select a category.");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Missing Information", "Please provide a description.");
      return false;
    }
    if (!formData.location.trim()) {
      Alert.alert("Missing Information", "Please specify where the item was lost.");
      return false;
    }
    if (!formData.contactPhone.trim() && !formData.contactEmail.trim()) {
      Alert.alert("Missing Information", "Please provide at least one contact method.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Implement API call to submit lost item report
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      Alert.alert(
        "Success",
        "Your lost item report has been submitted successfully. You will be notified if someone finds your item.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, placeholder, value, onChangeText, multiline = false, keyboardType = "default" }) => (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
          fontSize: 14,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={isLight ? "#888" : "#999"}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1,
          borderColor: isLight ? "#ddd" : "#333",
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          padding: 12,
          borderRadius: 8,
          color: isLight ? LGlobals.text : DGlobals.text,
          minHeight: multiline ? 80 : 44,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: isLight ? "#eee" : "#333",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Report Lost Item
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Item Information */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 16,
          }}
        >
          Item Information
        </Text>

        <InputField
          label="Item Name *"
          placeholder="e.g., iPhone 12 Pro, Student ID, Backpack"
          value={formData.itemName}
          onChangeText={(value) => handleInputChange("itemName", value)}
        />

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            Category *
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: isLight ? "#ddd" : "#333",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={formData.category}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? LGlobals.background : DGlobals.background,
              }}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>
        </View>

        <InputField
          label="Description *"
          placeholder="Describe the item in detail (color, size, brand, etc.)"
          value={formData.description}
          onChangeText={(value) => handleInputChange("description", value)}
          multiline
        />

        {/* Image Upload Section */}
        <InstagramStyleImagePicker
          images={selectedImages}
          onImagesChange={setSelectedImages}
          maxImages={6}
          theme={theme}
        />

        <InputField
          label="Location Lost *"
          placeholder="e.g., Library, Cafeteria, Lecture Hall A"
          value={formData.location}
          onChangeText={(value) => handleInputChange("location", value)}
        />

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "600",
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Date Lost
            </Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isLight ? "#888" : "#999"}
              value={formData.dateLost}
              onChangeText={(value) => handleInputChange("dateLost", value)}
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#ddd" : "#333",
                backgroundColor: isLight ? LGlobals.background : DGlobals.background,
                padding: 12,
                borderRadius: 8,
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "600",
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Time Lost
            </Text>
            <TextInput
              placeholder="HH:MM"
              placeholderTextColor={isLight ? "#888" : "#999"}
              value={formData.timeLost}
              onChangeText={(value) => handleInputChange("timeLost", value)}
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#ddd" : "#333",
                backgroundColor: isLight ? LGlobals.background : DGlobals.background,
                padding: 12,
                borderRadius: 8,
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            />
          </View>
        </View>

        {/* Additional Details */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          Additional Details
        </Text>

        <InputField
          label="Color"
          placeholder="e.g., Black, Red, Blue"
          value={formData.color}
          onChangeText={(value) => handleInputChange("color", value)}
        />

        <InputField
          label="Brand/Model"
          placeholder="e.g., Samsung, Nike, Dell"
          value={formData.brand}
          onChangeText={(value) => handleInputChange("brand", value)}
        />

        <InputField
          label="Unique Features"
          placeholder="e.g., Scratch on the back, Missing button"
          value={formData.uniqueFeatures}
          onChangeText={(value) => handleInputChange("uniqueFeatures", value)}
          multiline
        />

        <InputField
          label="Estimated Value"
          placeholder="e.g., $500, ZWL 1000"
          value={formData.estimatedValue}
          onChangeText={(value) => handleInputChange("estimatedValue", value)}
          keyboardType="numeric"
        />

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 6,
            }}
          >
            Urgency Level
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: isLight ? "#ddd" : "#333",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={formData.urgency}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? LGlobals.background : DGlobals.background,
              }}
              onValueChange={(value) => handleInputChange("urgency", value)}
            >
              {urgencyLevels.map((level) => (
                <Picker.Item key={level.value} label={level.label} value={level.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Contact Information */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          Contact Information
        </Text>

        <InputField
          label="Phone Number *"
          placeholder="e.g., +263 77 123 4567"
          value={formData.contactPhone}
          onChangeText={(value) => handleInputChange("contactPhone", value)}
          keyboardType="phone-pad"
        />

        <InputField
          label="Email Address"
          placeholder="e.g., student@university.edu"
          value={formData.contactEmail}
          onChangeText={(value) => handleInputChange("contactEmail", value)}
          keyboardType="email-address"
        />

        <InputField
          label="Reward Offered"
          placeholder="e.g., $50, Coffee voucher"
          value={formData.rewardOffered}
          onChangeText={(value) => handleInputChange("rewardOffered", value)}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: loading
              ? (isLight ? "#ccc" : "#555")
              : (isLight ? LGlobals.bluetext : DGlobals.bluetext),
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Submit Report
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportLostItem;

const styles = StyleSheet.create({});