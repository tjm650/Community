import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanGestureHandler,
  State,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Import theme constants
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading',
};

const NotificationSystem = () => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  
  const [currentNotification, setCurrentNotification] = useState(null);
  
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(1)).current;
  
  const notificationQueue = useRef([]);
  const isShowing = useRef(false);
  const timeoutRef = useRef(null);

  // Memoized styles for better performance
  const containerStyle = useMemo(() => [
    styles.container,
    { backgroundColor: isLight ? LGlobals.surface : DGlobals.surface },
  ], [isLight]);

  // Get notification styles based on type
  const getNotificationStyle = useCallback((type) => {
    const baseStyle = [styles.notification];
    
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? '#4CAF50' : '#66BB6A' },
        ];
      case NOTIFICATION_TYPES.ERROR:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? '#F44336' : '#EF5350' },
        ];
      case NOTIFICATION_TYPES.WARNING:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? '#FF9800' : '#FFB74D' },
        ];
      case NOTIFICATION_TYPES.INFO:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? LGlobals.primary : DGlobals.primary },
        ];
      case NOTIFICATION_TYPES.LOADING:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? LGlobals.primary : DGlobals.primary },
        ];
      default:
        return [
          ...baseStyle,
          { backgroundColor: isLight ? LGlobals.surface : DGlobals.surface },
        ];
    }
  }, [isLight]);

  // Get icon for notification type
  const getNotificationIcon = useCallback((type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return { name: 'checkmark-circle', color: 'white' };
      case NOTIFICATION_TYPES.ERROR:
        return { name: 'close-circle', color: 'white' };
      case NOTIFICATION_TYPES.WARNING:
        return { name: 'warning', color: 'white' };
      case NOTIFICATION_TYPES.INFO:
        return { name: 'information-circle', color: 'white' };
      case NOTIFICATION_TYPES.LOADING:
        return { name: 'refresh', color: 'white' };
      default:
        return { name: 'notifications', color: 'white' };
    }
  }, []);

  // Show notification
  const showNotification = useCallback((notification) => {
    const notificationWithId = {
      id: Date.now() + Math.random(),
      duration: 4000,
      type: NOTIFICATION_TYPES.INFO,
      ...notification,
    };

    notificationQueue.current.push(notificationWithId);
    
    if (!isShowing.current) {
      processNextNotification();
    }
  }, [processNextNotification]);

  // Process next notification in queue
  const processNextNotification = useCallback(() => {
    if (notificationQueue.current.length === 0) {
      isShowing.current = false;
      return;
    }

    const notification = notificationQueue.current.shift();
    setCurrentNotification(notification);
    isShowing.current = true;

    // Animate in
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(opacityAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();

    // Start progress animation
    if (notification.duration > 0) {
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: notification.duration,
        useNativeDriver: false,
      }).start();
    }

    // Auto hide after duration
    if (notification.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        hideNotification();
      }, notification.duration);
    }

    // Haptic feedback
    if (notification.haptic) {
      Haptics.notificationAsync(
        notification.type === NOTIFICATION_TYPES.ERROR
          ? Haptics.NotificationFeedbackType.Error
          : notification.type === NOTIFICATION_TYPES.SUCCESS
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Warning
      );
    }
  }, [slideAnim, opacityAnim, scaleAnim, progressAnim, hideNotification]);

  // Hide current notification
  const hideNotification = useCallback(() => {
    if (!currentNotification) return;

    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Animate out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentNotification(null);
      progressAnim.setValue(1);
      processNextNotification();
    });
  }, [currentNotification, slideAnim, opacityAnim, scaleAnim, progressAnim, processNextNotification]);

  // Handle gesture
  const onGestureEvent = useCallback((event) => {
    const { translationY, state } = event.nativeEvent;
    
    if (state === State.ACTIVE) {
      slideAnim.setValue(translationY);
    } else if (state === State.END) {
      if (translationY < -50) {
        hideNotification();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [slideAnim, hideNotification]);

  // Handle notification press
  const handleNotificationPress = useCallback(() => {
    if (currentNotification?.onPress) {
      currentNotification.onPress();
    }
    hideNotification();
  }, [currentNotification, hideNotification]);

  // Handle close button press
  const handleClosePress = useCallback(() => {
    hideNotification();
  }, [hideNotification]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Expose methods globally
  useEffect(() => {
    global.showNotification = showNotification;
    global.showSuccess = (message, options = {}) => 
      showNotification({ message, type: NOTIFICATION_TYPES.SUCCESS, ...options });
    global.showError = (message, options = {}) => 
      showNotification({ message, type: NOTIFICATION_TYPES.ERROR, ...options });
    global.showWarning = (message, options = {}) => 
      showNotification({ message, type: NOTIFICATION_TYPES.WARNING, ...options });
    global.showInfo = (message, options = {}) => 
      showNotification({ message, type: NOTIFICATION_TYPES.INFO, ...options });
    global.showLoading = (message, options = {}) => 
      showNotification({ message, type: NOTIFICATION_TYPES.LOADING, duration: 0, ...options });
    global.hideNotification = hideNotification;

    return () => {
      delete global.showNotification;
      delete global.showSuccess;
      delete global.showError;
      delete global.showWarning;
      delete global.showInfo;
      delete global.showLoading;
      delete global.hideNotification;
    };
  }, [showNotification, hideNotification]);

  if (!currentNotification) return null;

  const { message, title, type, progress } = currentNotification;
  const notificationStyle = getNotificationStyle(type);
  const icon = getNotificationIcon(type);

  return (
    <View style={styles.overlay}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            containerStyle,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={notificationStyle}
            onPress={handleNotificationPress}
            activeOpacity={0.8}
          >
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons 
                name={icon.name} 
                size={24} 
                color={icon.color} 
              />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
              {title && (
                <Text style={styles.titleText}>{title}</Text>
              )}
              <Text style={styles.messageText}>{message}</Text>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <Ionicons 
                name="close" 
                size={20} 
                color="white" 
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Progress Bar */}
          {progress !== false && currentNotification.duration > 0 && (
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  container: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  progressBar: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default NotificationSystem;
