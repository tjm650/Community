import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import useGlobal from '@/assets/core/useGlobal';

const AISuggestions = ({ onSuggestionPress, title = "Popular questions" }) => {
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  const defaultSuggestions = [
    'Help me understand calculus concepts',
    'Create a study schedule for exams',
    'Explain this programming concept',
    'Find campus events this weekend'
  ];

  const renderSuggestion = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.suggestionItem,
        {
          backgroundColor: pressed
            ? (isLight ? 'rgba(7, 125, 140, 0.1)' : 'rgba(7, 125, 140, 0.2)')
            : (isLight ? 'rgba(143, 193, 211, 0.3)' : 'rgba(29, 38, 42, 0.8)'),
          borderColor: isLight ? 'rgba(7, 125, 140, 0.3)' : 'rgba(7, 125, 140, 0.4)'
        }
      ]}
      onPress={() => onSuggestionPress(item)}
    >
      <Text style={[
        styles.suggestionText,
        { color: isLight ? LGlobals.text : DGlobals.text }
      ]}>
        {item}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.suggestionsContainer}>
      <Text style={[
        styles.suggestionsTitle,
        { color: isLight ? LGlobals.text : DGlobals.text }
      ]}>
        {title}
      </Text>
      <FlatList
        data={defaultSuggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.suggestionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  suggestionsList: {
    paddingBottom: 20,
  },
  suggestionItem: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default AISuggestions;