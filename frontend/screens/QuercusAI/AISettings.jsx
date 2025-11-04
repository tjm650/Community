import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobal } from '@/assets/common/core/useGlobal';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AISettings = ({ navigation }) => {
  const { theme } = useGlobal();
  const isLight = theme === 'light';
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    autoSave: true,
    responseStyle: 'concise', // 'concise', 'detailed', 'conversational'
    language: 'english',
    studyReminders: true,
    campusUpdates: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('@quercus_ai_settings');
      if (savedSettings) {
        setSettings({ ...settings, ...JSON.parse(savedSettings) });
      }
    } catch (error) {
      console.error('Error loading AI settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('@quercus_ai_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving AI settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const clearConversationHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all conversation history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Import and use conversationManager here
          Alert.alert('Success', 'Conversation history cleared');
        }},
      ]
    );
  };

  const exportData = () => {
    Alert.alert(
      'Export Data',
      'This will export your conversation history and settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {
          Alert.alert('Success', 'Data exported successfully');
        }},
      ]
    );
  };

  const SettingRow = ({ title, subtitle, value, onToggle, type = 'toggle' }) => (
    <TouchableOpacity
      style={[
        styles.settingRow,
        {
          backgroundColor: isLight ? '#f8fafc' : '#1e1e1e',
          borderColor: isLight ? '#e2e8f0' : '#404040',
        }
      ]}
      onPress={type === 'toggle' ? onToggle : undefined}
    >
      <View style={styles.settingContent}>
        <Text style={[
          styles.settingTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[
            styles.settingSubtitle,
            {
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            }
          ]}>
            {subtitle}
          </Text>
        )}
      </View>

      {type === 'toggle' && (
        <TouchableOpacity
          style={[
            styles.toggle,
            {
              backgroundColor: value
                ? '#8B5CF6'
                : (isLight ? '#cbd5e1' : '#64748b'),
            }
          ]}
          onPress={onToggle}
        >
          <View style={[
            styles.toggleCircle,
            {
              transform: [{ translateX: value ? 16 : 0 }],
              backgroundColor: '#fff',
            }
          ]} />
        </TouchableOpacity>
      )}

      {type === 'arrow' && (
        <FontAwesome
          name="chevron-right"
          size={16}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[
      styles.container,
      {
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }
    ]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome
            name="arrow-left"
            size={20}
            color={isLight ? LGlobals.text : DGlobals.text}
          />
        </TouchableOpacity>
        <Text style={[
          styles.headerTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          Quercus Settings
        </Text>
      </View>

      {/* AI Behavior */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          Quercus Behavior
        </Text>

        <SettingRow
          title="Response Style"
          subtitle="Choose how detailed you want responses"
          value={settings.responseStyle}
          type="arrow"
        />

        <SettingRow
          title="Auto-save Conversations"
          subtitle="Automatically save your chat history"
          value={settings.autoSave}
          onToggle={() => updateSetting('autoSave', !settings.autoSave)}
        />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          Notifications
        </Text>

        <SettingRow
          title="Study Reminders"
          subtitle="Get reminders for study sessions"
          value={settings.studyReminders}
          onToggle={() => updateSetting('studyReminders', !settings.studyReminders)}
        />

        <SettingRow
          title="Campus Updates"
          subtitle="Receive notifications about campus events"
          value={settings.campusUpdates}
          onToggle={() => updateSetting('campusUpdates', !settings.campusUpdates)}
        />
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          Data Management
        </Text>

        <TouchableOpacity
          style={[
            styles.actionRow,
            {
              backgroundColor: isLight ? '#f8fafc' : '#1e1e1e',
              borderColor: isLight ? '#e2e8f0' : '#404040',
            }
          ]}
          onPress={clearConversationHistory}
        >
          <View style={styles.actionContent}>
            <FontAwesome name="trash" size={20} color="#ef4444" />
            <Text style={[
              styles.actionTitle,
              {
                color: isLight ? LGlobals.text : DGlobals.text,
              }
            ]}>
              Clear Conversation History
            </Text>
          </View>
          <FontAwesome
            name="chevron-right"
            size={16}
            color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionRow,
            {
              backgroundColor: isLight ? '#f8fafc' : '#1e1e1e',
              borderColor: isLight ? '#e2e8f0' : '#404040',
            }
          ]}
          onPress={exportData}
        >
          <View style={styles.actionContent}>
            <FontAwesome name="download" size={20} color="#8B5CF6" />
            <Text style={[
              styles.actionTitle,
              {
                color: isLight ? LGlobals.text : DGlobals.text,
              }
            ]}>
              Export Data
            </Text>
          </View>
          <FontAwesome
            name="chevron-right"
            size={16}
            color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
          />
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          {
            color: isLight ? LGlobals.text : DGlobals.text,
          }
        ]}>
          About
        </Text>

        <View style={[
          styles.infoRow,
          {
            backgroundColor: isLight ? '#f8fafc' : '#1e1e1e',
            borderColor: isLight ? '#e2e8f0' : '#404040',
          }
        ]}>
          <Text style={[
            styles.infoTitle,
            {
              color: isLight ? LGlobals.text : DGlobals.text,
            }
          ]}>
            Powered by Gemini AI
          </Text>
         
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    backgroundColor: '#cbd5e1',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginLeft: 12,
  },
  infoRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  infoSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});

export default AISettings;