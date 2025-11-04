import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";

const MessageStatus = ({ 
  status = 'sending', // 'sending', 'sent', 'delivered', 'read', 'failed'
  time,
  showTime = true
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return { name: 'time-outline', color: isLight ? '#666' : '#999' };
      case 'sent':
        return { name: 'checkmark', color: isLight ? '#666' : '#999' };
      case 'delivered':
        return { name: 'checkmark-done', color: isLight ? '#666' : '#999' };
      case 'read':
        return { name: 'checkmark-done', color: '#4CAF50' };
      case 'failed':
        return { name: 'close-circle', color: '#f44336' };
      default:
        return { name: 'time-outline', color: isLight ? '#666' : '#999' };
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'sending':
        return 'Sending...';
      case 'sent':
        return 'Sent';
      case 'delivered':
        return 'Delivered';
      case 'read':
        return 'Read';
      case 'failed':
        return 'Failed to send';
      default:
        return '';
    }
  };

  const statusIcon = getStatusIcon();
  const statusText = getStatusText();

  return (
    <View style={styles.container}>
      {showTime && time && (
        <Text style={[
          styles.timeText,
          { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }
        ]}>
          {time}
        </Text>
      )}
      
      <View style={styles.statusContainer}>
        <Ionicons 
          name={statusIcon.name} 
          size={14} 
          color={statusIcon.color} 
        />
        {status === 'sending' && (
          <Text style={[
            styles.statusText,
            { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }
          ]}>
            {statusText}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '400',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '400',
  },
});

export default MessageStatus;
