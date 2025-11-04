import { useCallback, useMemo } from "react";
import { Animated, Keyboard, SafeAreaView, StyleSheet } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//==
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Search from "../SearchScreens/Search/Search";
import Trending from "../SearchScreens/Trending/Trending";
import { trendingData } from "@/DammyData";
import HomeSearchTopView from "../TopViews/HomeSearchTopView";

const HomeSearch = () => {
  const navigation = useNavigation(); 
  const [val, setVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pressSearch, setPressSearch] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const appSearchAll = useGlobal((state) => state.appSearchAll);
  const appGetTrending = useGlobal((state) => state.appGetTrending);

  // Add safety checks for undefined functions
  const safeAppSearchAll = useMemo(() => {
    return appSearchAll && typeof appSearchAll === 'function'
      ? (searchTerm) => {
          try {
            const result = appSearchAll(searchTerm);
            return result && typeof result.catch === 'function'
              ? result.catch(error => {
                  console.error('Search error:', error);
                  return [];
                })
              : Promise.resolve([]);
          } catch (error) {
            console.error('Search function error:', error);
            return Promise.resolve([]);
          }
        }
      : () => Promise.resolve([]);
  }, [appSearchAll]);

  const safeAppGetTrending = useMemo(() => {
    return appGetTrending && typeof appGetTrending === 'function'
      ? () => {
          try {
            const result = appGetTrending();
            return result && typeof result.catch === 'function'
              ? result.catch(error => {
                  console.error('Trending error:', error);
                  return [];
                })
              : Promise.resolve([]);
          } catch (error) {
            console.error('Trending function error:', error);
            return Promise.resolve([]);
          }
        }
      : () => Promise.resolve([]);
  }, [appGetTrending]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Memoized styles for better performance
  const containerStyle = useMemo(() => ({
    flex: 1,
    backgroundColor: isLight ? LGlobals.background : DGlobals.background,
  }), [isLight]);

  const contentStyle = useMemo(() => ({
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  }), []);

  // Enhanced search function with debouncing
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          try {
            if (searchTerm.length > 2) {
              setIsLoading(true);
              if (safeAppSearchAll && typeof safeAppSearchAll === 'function') {
                await safeAppSearchAll(searchTerm);
              }
              // Add to search history
              if (searchTerm && !searchHistory.includes(searchTerm)) {
                const newHistory = [searchTerm, ...searchHistory.slice(0, 9)];
                setSearchHistory(newHistory);
              }
            } else if (searchTerm.length === 0) {
              if (safeAppGetTrending && typeof safeAppGetTrending === 'function') {
                await safeAppGetTrending();
              }
            }
          } catch (error) {
            console.error('Debounced search error:', error);
          } finally {
            setIsLoading(false);
          }
        }, 500);
      };
    })(),
    [safeAppSearchAll, safeAppGetTrending, searchHistory]
  );

  function onType(value) {
    setVal(value);
    setIsLoading(true);
    debouncedSearch(value);
  }

  // Pull to refresh functionality
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (val.length > 2 && safeAppSearchAll && typeof safeAppSearchAll === 'function') {
        await safeAppSearchAll(val);
      } else if (safeAppGetTrending && typeof safeAppGetTrending === 'function') {
        await safeAppGetTrending();
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [val, safeAppSearchAll, safeAppGetTrending]);

  // Enhanced keyboard handling
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowTrends(false);
        // Animate content up
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
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowTrends(true);
        // Animate content back
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0, 
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fadeAnim, slideAnim]);

  // Enhanced search effect with better error handling
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (val.length > 2 && safeAppSearchAll && typeof safeAppSearchAll === 'function') {
          setIsLoading(true);
          await safeAppSearchAll(val);
        } else if (val.length === 0 && safeAppGetTrending && typeof safeAppGetTrending === 'function') {
          await safeAppGetTrending();
        }
      } catch (error) {
        console.error('Search effect error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [val, safeAppSearchAll, safeAppGetTrending]);

  // Initialize trending on mount
  useEffect(() => {
    if (safeAppGetTrending && typeof safeAppGetTrending === 'function') {
      safeAppGetTrending().catch(error => {
        console.error('Initial trending error:', error);
      });
    }
  }, [safeAppGetTrending]);

  // Enhanced layout effect
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeSearchTopView 
          message={val} 
          setMessage={onType}
          isLoading={isLoading}
          searchHistory={searchHistory}
          onHistoryItemPress={(item) => {
            setVal(item);
            onType(item);
          }}
        />
      ),
    });
  }, [val, isLoading, searchHistory]);

  const textInputRef = useRef(null);

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  // Enhanced render with better performance
  const renderContent = useMemo(() => {
      if (val.length > 2) {
  return (
        <Animated.View
          style={[
            contentStyle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Search
            val={val}
            isLoading={isLoading}
            focusTextInput={focusTextInput}
          />
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          style={[
            contentStyle,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
              }),
            },
          ]}
        >
          <Trending
            trendingData={trendingData}
            isLoading={isLoading}
            focusTextInput={focusTextInput}
            setVal={setVal}
          />
        </Animated.View>
      );
    }
  }, [val, isLoading, showTrends, refreshing, fadeAnim, slideAnim, contentStyle, onRefresh, recentSearches]);

  return (
    <SafeAreaView style={containerStyle}>
      {renderContent}
    </SafeAreaView>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({});
