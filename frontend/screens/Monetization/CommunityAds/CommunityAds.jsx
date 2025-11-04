import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/common/core/useGlobal";

const CommunityAds = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [ads, setAds] = useState([
    {
      id: '1',
      title: 'Campus Event Photography',
      description: 'Professional photography services for campus events, parties, and gatherings.',
      category: 'Services',
      contact: 'photo@example.com',
      location: 'Campus Center',
      price: 'From $50'
    },
    {
      id: '2',
      title: 'Tutoring - Math & Science',
      description: 'Experienced tutor offering help with Mathematics, Physics, and Chemistry.',
      category: 'Education',
      contact: 'tutor@example.com',
      location: 'Library Study Area',
      price: '$25/hour'
    },
    {
      id: '3',
      title: 'Roommate Wanted',
      description: 'Looking for a roommate to share 2-bedroom apartment near campus.',
      category: 'Housing',
      contact: 'roommate@example.com',
      location: 'Near Campus',
      price: '$400/month'
    },
    {
      id: '4',
      title: 'Used Textbooks Sale',
      description: 'Selling used textbooks for Computer Science, Engineering, and Business courses.',
      category: 'Books',
      contact: 'books@example.com',
      location: 'Student Union',
      price: 'Various prices'
    },
    {
      id: '5',
      title: 'Campus Delivery Service',
      description: 'Fast and reliable delivery service for food, groceries, and packages around campus.',
      category: 'Services',
      contact: 'delivery@example.com',
      location: 'Campus Wide',
      price: '$5-15'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Services', 'Education', 'Housing', 'Books', 'Jobs', 'Other'];

  const filteredAds = selectedCategory === 'All'
    ? ads
    : ads.filter(ad => ad.category === selectedCategory);

  const AdCard = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isLight ? '#2A2A2A' : '#1A1A1A',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: isLight ? '#404040' : '#333333',
      }}
      onPress={() => {
        Alert.alert(
          item.title,
          `${item.description}\n\nLocation: ${item.location}\nContact: ${item.contact}\nPrice: ${item.price}`,
          [
            { text: 'Close', style: 'cancel' },
            { text: 'Contact', onPress: () => Alert.alert('Contact', `Email: ${item.contact}`) }
          ]
        );
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <Text
          style={{
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 4,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            color: isLight ? '#4CAF50' : '#66BB6A',
            fontSize: 12,
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          {item.category}
        </Text>
      </View>

      <Text
        style={{
          color: isLight ? '#E0E0E0' : '#B0B0B0',
          fontSize: 14,
          lineHeight: 20,
          marginBottom: 12,
        }}
        numberOfLines={3}
      >
        {item.description}
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faLocationDot} size={12} color={isLight ? '#B0B0B0' : '#888888'} />
          <Text
            style={{
              color: isLight ? '#B0B0B0' : '#888888',
              fontSize: 12,
              marginLeft: 4,
            }}
          >
            {item.location}
          </Text>
        </View>
        <Text
          style={{
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ padding: 16, paddingBottom: 8 }}>
          <Text
            style={{
              color: isLight ? LGlobals.textcolor : DGlobals.textcolor,
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 8,
            }}
          >
            Community Ads
          </Text>
          <Text
            style={{
              color: isLight ? '#B0B0B0' : '#888888',
              fontSize: 14,
            }}
          >
            Connect with your campus community through classified ads
          </Text>
        </View>

        {/* Category Filter */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category
                      ? (isLight ? LGlobals.bluetext : DGlobals.bluetext)
                      : (isLight ? '#2A2A2A' : '#1A1A1A'),
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: isLight ? '#404040' : '#333333',
                  }}
                >
                  <Text
                    style={{
                      color: selectedCategory === category
                        ? '#FFFFFF'
                        : (isLight ? '#E0E0E0' : '#B0B0B0'),
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Ads List */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {filteredAds.length > 0 ? (
            <FlatList
              data={filteredAds}
              renderItem={({ item }) => <AdCard item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 40,
            }}>
              <Text
                style={{
                  color: isLight ? '#B0B0B0' : '#888888',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                No ads found in {selectedCategory} category
              </Text>
            </View>
          )}
        </View>

        {/* Post Ad Button */}
        <View style={{ padding: 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
            onPress={() => Alert.alert('Post Ad', 'Feature coming soon! Contact admin to post your ad.')}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Post Your Ad
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityAds;

const styles = StyleSheet.create({});