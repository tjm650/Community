import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Colors
import useGlobal from '@/assets/common/core/useGlobal';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';

const AISearchResults = ({
  searchResults,
  onClose,
  onNewSearch
}) => {
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  const [expandedService, setExpandedService] = useState(null);
  const [expandedDocument, setExpandedDocument] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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

  const handleServicePress = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleDocumentPress = (documentId) => {
    setExpandedDocument(expandedDocument === documentId ? null : documentId);
  };

  const handleUrlPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open URL');
    }
  };

  const handleEmailPress = (email) => {
    const url = `mailto:${email}`;
    Linking.openURL(url);
  };

  const getIntentColor = (intent) => {
    switch (intent) {
      case 'FINANCIAL': return '#4CAF50';
      case 'ACADEMIC': return '#2196F3';
      case 'HEALTH': return '#F44336';
      case 'CAREER': return '#FF9800';
      case 'HOUSING': return '#9C27B0';
      default: return '#757575';
    }
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.7) return 'Medium';
    return 'Low';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#4CAF50';
    if (confidence >= 0.8) return '#8BC34A';
    if (confidence >= 0.7) return '#FF9800';
    return '#F44336';
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 30,
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
        <View style={styles.headerLeft}>
          <Text style={[styles.title, {
            color: isLight ? '#FFFFFF' : '#E0E0E0',
          }]}>
            AI Search Results
          </Text>
          <View style={[styles.confidenceBadge, {
            backgroundColor: getConfidenceColor(searchResults.confidence),
          }]}>
            <Text style={styles.confidenceText}>
              {getConfidenceText(searchResults.confidence)} Confidence
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <FontAwesomeIcon icon={faTimes} size={20} color={isLight ? '#B0B0B0' : '#888888'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Intent Badge */}
        <View style={styles.intentContainer}>
          <Text style={[styles.intentLabel, {
            color: isLight ? '#E0E0E0' : '#CCCCCC',
          }]}>
            Detected Intent:
          </Text>
          <View style={[styles.intentBadge, {
            backgroundColor: getIntentColor(searchResults.intent),
          }]}>
            <Text style={styles.intentText}>{searchResults.intent}</Text>
          </View>
        </View>

        {/* AI Response */}
        <View style={styles.responseContainer}>
          <Text style={[styles.responseTitle, {
            color: isLight ? '#FFFFFF' : '#E0E0E0',
          }]}>
            AI Assistant Response
          </Text>
          <Text style={[styles.responseText, {
            color: isLight ? '#E0E0E0' : '#CCCCCC',
          }]}>
            {searchResults.results.answer}
          </Text>
        </View>

        {/* Relevant Services */}
        {searchResults.results.relevantServices && searchResults.results.relevantServices.length > 0 && (
          <View style={styles.servicesContainer}>
            <Text style={[styles.sectionTitle, {
              color: isLight ? '#FFFFFF' : '#E0E0E0',
            }]}>
              Relevant Services ({searchResults.results.relevantServices.length})
            </Text>
            {searchResults.results.relevantServices.map((service) => (
              <View key={service.id}>
                <TouchableOpacity
                  style={[styles.serviceCard, {
                    backgroundColor: isLight ? '#404040' : '#2A2A2A',
                    borderColor: isLight ? '#666666' : '#444444',
                  }]}
                  onPress={() => handleServicePress(service.id)}
                >
                  <View style={styles.serviceHeader}>
                    <Text style={[styles.serviceName, {
                      color: isLight ? '#FFFFFF' : '#E0E0E0',
                    }]}>
                      {service.service_name}
                    </Text>
                    <View style={styles.serviceMeta}>
                      <Text style={[styles.serviceType, {
                        color: getIntentColor(service.service_type),
                      }]}>
                        {service.service_type}
                      </Text>
                      <Text style={[styles.relevanceScore, {
                        color: getConfidenceColor(service.relevance_score),
                      }]}>
                        {(service.relevance_score * 100).toFixed(0)}%
                      </Text>
                    </View>
                  </View>
                  {expandedService === service.id && (
                    <View style={styles.serviceDetails}>
                      <Text style={[styles.serviceDescription, {
                        color: isLight ? '#E0E0E0' : '#CCCCCC',
                      }]}>
                        {service.description}
                      </Text>
                      <View style={styles.serviceActions}>
                        <TouchableOpacity
                          style={[styles.actionButton, {
                            backgroundColor: isLight ? '#2196F3' : '#1976D2',
                          }]}
                          onPress={() => handleUrlPress(service.website_url)}
                        >
                          <Text style={styles.actionButtonText}>Visit Website</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, {
                                          backgroundColor: isLight ? LGlobals.blueIcon : DGlobals.blueIcon,

                          }]}
                          onPress={() => handleEmailPress(service.contact_email)}
                        >
                          <Text style={styles.actionButtonText}>Contact</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Relevant Documents */}
        {searchResults.results.documents && searchResults.results.documents.length > 0 && (
          <View style={styles.documentsContainer}>
            <Text style={[styles.sectionTitle, {
              color: isLight ? '#FFFFFF' : '#E0E0E0',
            }]}>
              Relevant Documents ({searchResults.results.documents.length})
            </Text>
            {searchResults.results.documents.map((doc) => (
              <View key={doc.id}>
                <TouchableOpacity
                  style={[styles.documentCard, {
                    backgroundColor: isLight ? '#404040' : '#2A2A2A',
                    borderColor: isLight ? '#666666' : '#444444',
                  }]}
                  onPress={() => handleDocumentPress(doc.id)}
                >
                  <View style={styles.documentHeader}>
                    <Text style={[styles.documentTitle, {
                      color: isLight ? '#FFFFFF' : '#E0E0E0',
                    }]}>
                      {doc.title}
                    </Text>
                    <View style={styles.documentMeta}>
                      <Text style={[styles.documentService, {
                        color: isLight ? '#B0B0B0' : '#888888',
                      }]}>
                        {doc.service_guide}
                      </Text>
                      <Text style={[styles.relevanceScore, {
                        color: getConfidenceColor(doc.relevance_score),
                      }]}>
                        {(doc.relevance_score * 100).toFixed(0)}%
                      </Text>
                    </View>
                  </View>
                  {expandedDocument === doc.id && (
                    <View style={styles.documentDetails}>
                      <Text style={[styles.documentDescription, {
                        color: isLight ? '#E0E0E0' : '#CCCCCC',
                      }]}>
                        {doc.description}
                      </Text>
                      <TouchableOpacity
                        style={[styles.actionButton, {
                          backgroundColor: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                        }]}
                        onPress={() => handleUrlPress(doc.file_url)}
                      >
                        <Text style={styles.actionButtonText}>View Document</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* New Search Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.newSearchButton, {
              backgroundColor: isLight ? LGlobals.blueIcon : DGlobals.blueIcon,
            }]}
            onPress={onNewSearch}
          >
            <Text style={styles.newSearchButtonText}>New Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  intentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  intentLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  intentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  intentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  responseContainer: {
    marginBottom: 24,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
  },
  servicesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  serviceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  serviceHeader: {
    marginBottom: 0,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceType: {
    fontSize: 12,
    fontWeight: '600',
  },
  relevanceScore: {
    fontSize: 12,
    fontWeight: '600',
  },
  serviceDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 8,
  },
  documentsContainer: {
    marginBottom: 24,
  },
  documentCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  documentHeader: {
    marginBottom: 0,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentService: {
    fontSize: 12,
  },
  documentDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  documentDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  newSearchButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  newSearchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AISearchResults;