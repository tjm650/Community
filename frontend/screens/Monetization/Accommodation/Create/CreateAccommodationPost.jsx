// @ts-nocheck
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomNotif from "../../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import MainHeader from "../../../GlobalScreens/MainHeader";
import InputPost from "../../../CreatePost/PostMethods/InputPost";
import SendIcon from "../../../CreatePost/PostMethods/SendIcon";
import UserDetailsView from "../../../CreatePost/UserDetailsView";
import FilePicker from "../../../CreatePost/FilePicker";
import SelectedFiles from "../../../CreatePost/SelectedFiles";
import CreatePostRBSheet from "../../../CreatePost/PostMethods/CreatePostRBSheet";

//======================================================================================
const CreateAccommodationPost = () => {
  const navigation = useNavigation();
  const user = useGlobal((state) => state.user);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  // Form state
  const [post, setPost] = useState("");
  const [showInfor, setShowIfor] = useState(true);
  const [images, setImages] = useState([]);
  const [image1, setImage1] = useState(null);
  const [longPressing, setLongPressing] = useState(false);

  // Accommodation specific fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [phone, setPhone] = useState("");
  const [locationText, setLocationText] = useState("");
  const [geoLat, setGeoLat] = useState(null);
  const [geoLng, setGeoLng] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [maxOccupants, setMaxOccupants] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [pricingType, setPricingType] = useState("monthly");
  const [contactPreference, setContactPreference] = useState("phone");

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  const [showPropertyTypeSheet, setShowPropertyTypeSheet] = useState(false);
  const [showAmenitiesSheet, setShowAmenitiesSheet] = useState(false);
  const [showPricingSheet, setShowPricingSheet] = useState(false);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [showRichTextToolbar, setShowRichTextToolbar] = useState(false);

  // use the monetization helper from useGlobal
  const monetizationCreateAccommodation = useGlobal(
    (state) => state.monetizationCreateAccommodation
  );

  //////////////////////////////////////////// Functions /////////////////////////////////////////
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...newImages]);
      if (result.assets[0]) {
        setImage1(result.assets[0]);
      }
    }
  }

  function HandleRemoveImage(params) {
    setLongPressing((value) => (value = true));
  }

  const handlePropertyTypeSelect = (type) => {
    setPropertyType(type);
    setShowPropertyTypeSheet(false);
  };

  const handleAmenitySelect = (amenity) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handlePricingTypeSelect = (type) => {
    setPricingType(type);
    setShowPricingSheet(false);
  };

  const handleContactPreferenceSelect = (preference) => {
    setContactPreference(preference);
    setShowContactSheet(false);
  };

  const insertRichText = (beforeText, afterText = '') => {
    const textarea = document.getElementById('description-textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = post.substring(start, end);
      const newText = beforeText + selectedText + afterText;
      const newPost = post.substring(0, start) + newText + post.substring(end);
      setPost(newPost);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + beforeText.length, start + beforeText.length + selectedText.length);
      }, 0);
    }
  };

  const handleBold = () => insertRichText('**', '**');
  const handleItalic = () => insertRichText('*', '*');
  const handleBullet = () => insertRichText('- ');
  const handleNumberedList = () => insertRichText('1. ');
  const handleLink = () => insertRichText('[', '](url)');

  const handleLocationSelect = () => {
    const commonLocations = [
      "Campus Main Gate",
      "Library",
      "Student Union",
      "Cafeteria",
      "Lecture Hall A",
      "Lecture Hall B",
      "Dormitory Block A",
      "Dormitory Block B",
      "Sports Complex",
      "Parking Area",
      "Near Campus",
      "City Center",
      "Other"
    ];

    Alert.alert(
      "Select Location",
      "Choose a location or enter manually",
      [
        ...commonLocations.map(location => ({
          text: location,
          onPress: () => {
            if (location === "Other") {
              // Show manual input
              Alert.prompt(
                "Enter Location",
                "Please enter the accommodation location:",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "OK",
                    onPress: (manualLocation) => {
                      if (manualLocation && manualLocation.trim()) {
                        setLocationText(manualLocation.trim());
                      }
                    }
                  }
                ],
                "plain-text",
                locationText || ""
              );
            } else {
              setLocationText(location);
            }
          }
        })),
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleDateSelect = (type) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 2); // Allow booking up to 2 years in advance

    Alert.alert(
      `Select ${type}`,
      `Choose the ${type.toLowerCase()} date for your accommodation`,
      [
        {
          text: "Today",
          onPress: () => {
            const todayStr = today.toISOString().split('T')[0];
            if (type === "Available From") {
              setAvailableFrom(todayStr);
            } else {
              setAvailableTo(todayStr);
            }
          }
        },
        {
          text: "Tomorrow",
          onPress: () => {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            if (type === "Available From") {
              setAvailableFrom(tomorrowStr);
            } else {
              setAvailableTo(tomorrowStr);
            }
          }
        },
        {
          text: "Next Week",
          onPress: () => {
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const nextWeekStr = nextWeek.toISOString().split('T')[0];
            if (type === "Available From") {
              setAvailableFrom(nextWeekStr);
            } else {
              setAvailableTo(nextWeekStr);
            }
          }
        },
        {
          text: "Next Month",
          onPress: () => {
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            const nextMonthStr = nextMonth.toISOString().split('T')[0];
            if (type === "Available From") {
              setAvailableFrom(nextMonthStr);
            } else {
              setAvailableTo(nextMonthStr);
            }
          }
        },
        {
          text: "Custom Date",
          onPress: () => {
            // Show manual date input
            Alert.prompt(
              `Enter ${type}`,
              `Please enter the ${type.toLowerCase()} date (YYYY-MM-DD):`,
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "OK",
                  onPress: (dateStr) => {
                    if (dateStr && dateStr.trim()) {
                      // Basic date validation
                      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                      if (dateRegex.test(dateStr.trim())) {
                        const selectedDate = new Date(dateStr.trim());
                        if (selectedDate >= today && selectedDate <= maxDate) {
                          if (type === "Available From") {
                            setAvailableFrom(dateStr.trim());
                          } else {
                            setAvailableTo(dateStr.trim());
                          }
                        } else {
                          Alert.alert("Invalid Date", "Please select a date between today and 2 years from now.");
                        }
                      } else {
                        Alert.alert("Invalid Format", "Please use YYYY-MM-DD format (e.g., 2024-12-25)");
                      }
                    }
                  }
                }
              ],
              "plain-text",
              type === "Available From" ? availableFrom : availableTo
            );
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  async function onSend() {
    // Validation
    if (!title.trim()) {
      setAuth(true);
      setRes("Please enter a title for your accommodation");
      return;
    }

    if (!post.trim()) {
      setAuth(true);
      setRes("Please enter a description");
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setAuth(true);
      setRes("Please enter a valid price");
      return;
    }

    if (!phone.trim()) {
      setAuth(true);
      setRes("Please enter a phone number");
      return;
    }

    if (!locationText.trim()) {
      setAuth(true);
      setRes("Please enter a location");
      return;
    }

    // Build accommodation payload
    const details = {
      userId: user.id,
      title: title.trim(),
      description: post.trim(),
      images: images.length > 0 ? images.map((uri, index) => ({
        uri,
        type: 'image/jpeg',
        fileName: `image_${index}.jpg`
      })) : [],
      price: parseFloat(price),
      currency: currency,
      phone: phone.trim(),
      location: locationText.trim(),
      geo_lat: geoLat,
      geo_lng: geoLng,
      property_type: propertyType,
      bedrooms: bedrooms ? parseInt(bedrooms) : null,
      bathrooms: bathrooms ? parseInt(bathrooms) : null,
      max_occupants: maxOccupants ? parseInt(maxOccupants) : null,
      amenities: amenities,
      available_from: availableFrom,
      available_to: availableTo,
      pricing_type: pricingType,
      contact_preference: contactPreference,
    };

    try {
      await monetizationCreateAccommodation(details);
      // Reset form
      setTitle("");
      setPost("");
      setImages([]);
      setPrice("");
      setPhone("");
      setLocationText("");
      setPropertyType("");
      setBedrooms("");
      setBathrooms("");
      setMaxOccupants("");
      setAmenities([]);
      setAvailableFrom("");
      setAvailableTo("");
      navigation.goBack();
    } catch (e) {
      console.warn(e);
      setAuth(true);
      setRes("Failed to create accommodation post. Please try again.");
    }
  }

  const handleSend = () => {
    if (post.length >= 10 && !user.verified) {
      setAuth(true);
      setRes(
        "reached maximum number of words, get verified for unlimited messages."
      );
    } else {
      onSend();
    }
  };

  ////////////////// onType //////////////////
  function onType(value) {
    setPost(value);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Accommodation Post
            </Text>
          }
        />
      ),
    });
  });

  function HandleOk(params) {
    setAuth((value) => (value = false));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {Auth && <BottomNotif Auth={res} HandleOk={HandleOk} />}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: "2%", paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Details */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ width: "65%", flexDirection: "row", marginBottom: 20 }}
        >
          <View>
            <UserDetailsView itemDesc={"User"} Desc={user.name} />
            <UserDetailsView itemDesc={"Email"} Desc={user.email} />
          </View>
        </TouchableOpacity>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Title *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                color: isLight ? LGlobals.text : DGlobals.text,
                borderColor: isLight ? "#ddd" : "#444"
              }
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter accommodation title"
            placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Description *
            </Text>
            <TouchableOpacity
              onPress={() => setShowRichTextToolbar(!showRichTextToolbar)}
              style={styles.richTextToggle}
            >
              <FontAwesomeIcon
                icon="edit"
                size={16}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
              <Text style={[styles.toggleText, { color: isLight ? LGlobals.text : DGlobals.text }]}>
                {showRichTextToolbar ? 'Simple' : 'Rich Text'}
              </Text>
            </TouchableOpacity>
          </View>

          {showRichTextToolbar && (
            <View style={[styles.richTextToolbar, { backgroundColor: isLight ? "#f0f0f0" : "#333" }]}>
              <TouchableOpacity onPress={handleBold} style={styles.toolbarButton}>
                <FontAwesomeIcon icon="bold" size={16} color={isLight ? LGlobals.icon : DGlobals.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleItalic} style={styles.toolbarButton}>
                <FontAwesomeIcon icon="italic" size={16} color={isLight ? LGlobals.icon : DGlobals.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBullet} style={styles.toolbarButton}>
                <FontAwesomeIcon icon="list-ul" size={16} color={isLight ? LGlobals.icon : DGlobals.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNumberedList} style={styles.toolbarButton}>
                <FontAwesomeIcon icon="list-ol" size={16} color={isLight ? LGlobals.icon : DGlobals.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLink} style={styles.toolbarButton}>
                <FontAwesomeIcon icon="link" size={16} color={isLight ? LGlobals.icon : DGlobals.icon} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.textAreaContainer}>
            <TextInput
              id="description-textarea"
              style={[
                styles.textArea,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={post}
              onChangeText={onType}
              placeholder="Describe your accommodation, amenities, rules, and any other important information..."
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={[styles.charCount, { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }]}>
              {post.length}/1000
            </Text>
          </View>
        </View>

        {/* Images */}
        {images.length > 0 && (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Images ({images.length})
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {images.map((imageUri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    >
                      <FontAwesomeIcon icon="times" size={12} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Price and Currency */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 2 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Price *
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Currency
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={currency}
              onChangeText={setCurrency}
              placeholder="USD"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
          </View>
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Phone Number *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                color: isLight ? LGlobals.text : DGlobals.text,
                borderColor: isLight ? "#ddd" : "#444"
              }
            ]}
            value={phone}
            onChangeText={setPhone}
            placeholder="+263 71 987 6543"
            keyboardType="phone-pad"
            placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
          />
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Location *
          </Text>
          <TouchableOpacity
            style={[
              styles.locationButton,
              {
                backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                borderColor: isLight ? "#ddd" : "#444"
              }
            ]}
            onPress={handleLocationSelect}
          >
            <FontAwesomeIcon
              icon="map-marker-alt"
              size={16}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
            <Text style={[
              styles.locationText,
              { color: locationText ? (isLight ? LGlobals.text : DGlobals.text) : (isLight ? LGlobals.lighttext : DGlobals.lighttext) }
            ]}>
              {locationText || "Select location"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Property Type Selection */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Property Type
          </Text>
          <CreatePostRBSheet
            SheetName={propertyType || "Select Property Type"}
            Data={propertyTypes}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handlePropertyTypeSelect(item.value)}
              >
                <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
                  {item.label}
                </Text>
                {propertyType === item.value && (
                  <FontAwesomeIcon icon="check" size={16} color="#2a9d8f" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Room Details */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Bedrooms
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={bedrooms}
              onChangeText={setBedrooms}
              placeholder="2"
              keyboardType="numeric"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Bathrooms
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={bathrooms}
              onChangeText={setBathrooms}
              placeholder="1"
              keyboardType="numeric"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Max Occupants
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              value={maxOccupants}
              onChangeText={setMaxOccupants}
              placeholder="4"
              keyboardType="numeric"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
            />
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Amenities
          </Text>
          <CreatePostRBSheet
            SheetName={`Selected: ${amenities.length}`}
            Data={amenityOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleAmenitySelect(item.value)}
              >
                <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
                  {item.label}
                </Text>
                {amenities.includes(item.value) && (
                  <FontAwesomeIcon icon="check" size={16} color="#2a9d8f" />
                )}
              </TouchableOpacity>
            )}
          />
          {amenities.length > 0 && (
            <View style={styles.selectedAmenities}>
              {amenities.map(amenity => (
                <View key={amenity} style={[styles.amenityTag, { backgroundColor: "#2a9d8f" }]}>
                  <Text style={styles.amenityTagText}>{amenity}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Pricing Type */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Pricing Type
          </Text>
          <CreatePostRBSheet
            SheetName={pricingType.charAt(0).toUpperCase() + pricingType.slice(1)}
            Data={pricingOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handlePricingTypeSelect(item.value)}
              >
                <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
                  {item.label}
                </Text>
                {pricingType === item.value && (
                  <FontAwesomeIcon icon="check" size={16} color="#2a9d8f" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Contact Preference */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
            Contact Preference
          </Text>
          <CreatePostRBSheet
            SheetName={contactPreference.charAt(0).toUpperCase() + contactPreference.slice(1)}
            Data={contactOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleContactPreferenceSelect(item.value)}
              >
                <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
                  {item.label}
                </Text>
                {contactPreference === item.value && (
                  <FontAwesomeIcon icon="check" size={16} color="#2a9d8f" />
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Availability Dates */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Available From
            </Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              onPress={() => handleDateSelect("Available From")}
            >
              <FontAwesomeIcon
                icon="calendar"
                size={16}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
              <Text style={[
                styles.dateText,
                { color: availableFrom ? (isLight ? LGlobals.text : DGlobals.text) : (isLight ? LGlobals.lighttext : DGlobals.lighttext) }
              ]}>
                {availableFrom || "Select date"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.label, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Available To
            </Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: isLight ? "#f5f5f5" : "#2a2a2a",
                  borderColor: isLight ? "#ddd" : "#444"
                }
              ]}
              onPress={() => handleDateSelect("Available To")}
            >
              <FontAwesomeIcon
                icon="calendar"
                size={16}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
              <Text style={[
                styles.dateText,
                { color: availableTo ? (isLight ? LGlobals.text : DGlobals.text) : (isLight ? LGlobals.lighttext : DGlobals.lighttext) }
              ]}>
                {availableTo || "Select date"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
            <FontAwesomeIcon
              icon="image"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
            <Text style={[styles.actionButtonText, { color: isLight ? LGlobals.text : DGlobals.text }]}>
              Add Images ({images.length})
            </Text>
          </TouchableOpacity>
          <SendIcon onPress={handleSend} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccommodationPost;

// Data arrays for dropdowns
const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Room", value: "room" },
  { label: "Studio", value: "studio" },
  { label: "Shared House", value: "shared_house" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Condo", value: "condo" },
  { label: "Duplex", value: "duplex" },
];

const amenityOptions = [
  { label: "WiFi", value: "WiFi" },
  { label: "Parking", value: "Parking" },
  { label: "Laundry", value: "Laundry" },
  { label: "Gym", value: "Gym" },
  { label: "Pool", value: "Pool" },
  { label: "Air Conditioning", value: "Air Conditioning" },
  { label: "Heating", value: "Heating" },
  { label: "Kitchen", value: "Kitchen" },
  { label: "Balcony", value: "Balcony" },
  { label: "Garden", value: "Garden" },
  { label: "Security", value: "Security" },
  { label: "Pet Friendly", value: "Pet Friendly" },
  { label: "Smoking Allowed", value: "Smoking Allowed" },
  { label: "Wheelchair Accessible", value: "Wheelchair Accessible" },
];

const pricingOptions = [
  { label: "Per Day", value: "daily" },
  { label: "Per Week", value: "weekly" },
  { label: "Per Month", value: "monthly" },
  { label: "Per Semester", value: "semester" },
  { label: "Per Year", value: "yearly" },
];

const contactOptions = [
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Any", value: "any" },
];

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedAmenities: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  amenityTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeImageBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a9d8f",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  richTextToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "500",
  },
  richTextToolbar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  toolbarButton: {
    padding: 4,
  },
  textAreaContainer: {
    position: "relative",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 120,
    maxHeight: 200,
  },
  charCount: {
    position: "absolute",
    bottom: 8,
    right: 12,
    fontSize: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
