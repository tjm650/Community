import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
    View,
} from 'react-native';

// Colors
import useGlobal from '@/assets/common/core/useGlobal';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';

// AI Service
// import aiService from './AIService';

const AISearchInterface = ({
  onSearchResults,
  onClose
}) => {
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    'How to apply for financial aid?',
    'Library hours and services',
    'Student health services',
    'Career counseling',
    'Academic advising',
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // Add to search history
      const updatedHistory = [query, ...searchHistory.slice(0, 4)];
      setSearchHistory(updatedHistory);

      // Call backend AI search via WebSocket
      if (onSearchResults) {
        onSearchResults({
          query,
          results: {
            answer: "Searching...",
            relevantServices: [],
            documents: [],
          },
          confidence: 0,
          intent: 'SEARCHING',
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleSuggestionPress = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(true);
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) {
        onClose();
      }
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, {
              color: isLight ? LGlobals.text : DGlobals.text,
            }]}>
              Describe Service 
            </Text>
           
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} size={20} color={isLight ? '#B0B0B0' : '#888888'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.subtitle, {
          color: isLight ? LGlobals.fadetext : DGlobals.fadetext,
        }]}>
          Ask me anything about campus services and I'll help you find what you need
        </Text>

        <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, {
          backgroundColor: isLight ? LGlobals.backgroundColorView : DGlobals.backgroundColorView,
          borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
        }]}>
          <TextInput
            style={[styles.searchInput, { color: isLight ? LGlobals.text : DGlobals.text }]}
            placeholder="e.g., 'How do I apply for financial aid?'"
            placeholderTextColor={isLight ? LGlobals.fadetext : DGlobals.fadetext}
            value={query}
            onChangeText={setQuery}
            multiline
            numberOfLines={2}
            onFocus={() => setShowSuggestions(false)}
            onBlur={() => setShowSuggestions(true)}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <FontAwesomeIcon icon={faTimes} size={16} color={isLight ? LGlobals.fadetext : DGlobals.fadetext} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.searchButton, {
            backgroundColor: 'transparent',
            borderColor: isLoading ? (isLight ? '#666666' : '#444444') : (isLight ? LGlobals.bluetext : DGlobals.bluetext),
            borderWidth: 0.5
          }]}
          onPress={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={isLight ? LGlobals.bluetext : DGlobals.bluetext} />
          ) : (
            <Text style={[styles.searchButtonText, {
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }]}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.suggestionsTitle, {
            color: isLight ? LGlobals.text : DGlobals.text,
          }]}>
            Popular Questions:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {searchHistory.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionChip, {
                  backgroundColor: 'transparent',
                  borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                  borderWidth: 1,
                }]}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={[styles.suggestionText, {
                  color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                }]}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  aiIconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    borderRadius: 16,
    borderWidth: 0.3,
    padding: 20,
    marginBottom: 20,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 16,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 50,
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  clearButtonText: {
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 5,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: '#FFFFFF',
    // fontSize: 16,
    fontWeight: '600',
  },
  suggestionsContainer: {
    flex: 1,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  suggestionText: {
    fontSize: 14,
  },
});

export default AISearchInterface;