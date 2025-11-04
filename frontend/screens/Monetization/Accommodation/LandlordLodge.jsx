import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ImageBackground,
  Dimensions,
  RefreshControl,
  FlatList,

} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faStar, faPhone } from "@fortawesome/free-solid-svg-icons";
// ========================== Colors ==========================================//
// ============= Dark ============================//

import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import ActivityIndicate from "@/screens/GlobalScreens/ActivityIndicate";
import EmptyScreen from "@/screens/GlobalScreens/EmptyScreen";
import { trackPageVisit } from "@/assets/core/storeContext/amonetization/analytics";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width - 32; // padding 16 each side

const LandlordLodge = () => {
  const { theme } = useGlobal();
  const monetizationSocketFetchAccommodations = useGlobal((s) => s.monetizationSocketFetchAccommodations);
  const monetizationSocketCreateListing = useGlobal((s) => s.monetizationSocketCreateListing);
  const monetizationFetchAccommodations = useGlobal((s) => s.monetizationFetchAccommodations);
  const globalAccommodations = useGlobal((s) => s.monetization.accommodations || []);
  let isLight = theme === "light";

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [listings, setListings] = useState(null);

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const accs = await monetizationFetchAccommodations();
      if (Array.isArray(accs) && accs.length) {
        setListings(shuffleArray(accs));
      } else {
        await monetizationSocketFetchAccommodations(0);
        const listingsToShuffle = Array.isArray(globalAccommodations) ? globalAccommodations : [];
        setListings(shuffleArray(listingsToShuffle));
      }
    } catch (e) {
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [globalAccommodations, monetizationFetchAccommodations, shuffleArray]);

  useEffect(() => {
    if (Array.isArray(globalAccommodations) && globalAccommodations.length) {
      setListings(shuffleArray(globalAccommodations));
    }
  }, [globalAccommodations, shuffleArray]);

  useEffect(() => {
    fetchListings();
  }, []);

  // Track page visit when component mounts
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const userAgent = 'React Native App';
        await trackPageVisit('AccommodationAgents', sessionId, userAgent);
      } catch (error) {
        console.error('Error tracking accommodation visit:', error);
      }
    };
    trackVisit();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchListings(); // fetchListings already includes shuffling
    setRefreshing(false);
  };

  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const onCreatePress = () => navigation.navigate("CreateAccommodationPost");

  const renderCard = ({ item }) => {
    const title = item.title || "Untitled";
    const price = item.price ? `${item.price} ${item.currency || "USD"}` : "-";
    const images = Array.isArray(item.images) && item.images.length ? item.images : [null];
    const rating = item.rating || 4.2;
    const reviewCount = item.reviewCount || 45;
    const phoneNumber = item.phone || "+263 71 987 6543";
    const location = item.location || item.address || "Hillside Road, 2km from NUST";
    const discount = item.discount || "20% Student Discount";

    const onCardPress = async () => {
      const user = item.sender || item.user || {};
      const ConnectList = useGlobal.getState().ConnectList;
      const requestConnect = useGlobal.getState().requestConnect;

      const createOrGetConnection = async (username) => {
        const found = (ConnectList || []).find((c) => c.connect && c.connect.username === username);
        if (found) return found;
        try {
          await requestConnect(username);
        } catch (e) {}
        const start = Date.now();
        while (Date.now() - start < 2000) {
          const latest = (useGlobal.getState().ConnectList || []).find((c) => c.connect && c.connect.username === username);
          if (latest) return latest;
          await new Promise((r) => setTimeout(r, 150));
        }
        return null;
      };

      const username = user.username || user.name || null;
      let connectObj = null;
      if (username) connectObj = await createOrGetConnection(username);

      const connectParam = connectObj
        ? connectObj.connect
        : {
            id: user.connection_id || user.id || item.id || null,
            name: user.name || user.username || item.title || "Agent",
            username: user.username || user.name || "",
            profile_image: user.profile_image || user.image || null,
            online: user.online || false,
          };

      const tag = { text: item.title || "Service", serviceId: item.id || null, serviceRaw: item };

      navigation.navigate("MesssageInbox", { connect: connectParam, sender: useGlobal.getState().user?.id, id: connectParam.id, tagedMessage: tag });
    };

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={0.95} style={styles.cardWrap} onPress={onCardPress}>
          <View style={[styles.card, { backgroundColor: isLight ? "#f0f0f0" : "#222" }]}>
            <Animated.ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
              {images.map((img, ix) => (
                <ImageBackground
                  key={ix}
                  source={img ? { uri: img } : require("@/assets/images/adminblock.jpg")}
                  style={styles.cardImageBG}
                  imageStyle={styles.cardImage}
                >
                  <View style={styles.imageDim} />
                  <View style={styles.topIconsRow}>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.geo_lat && item.geo_lng) {
                          navigation.navigate("DataSaverHub", { lat: item.geo_lat, lng: item.geo_lng, title: item.title });
                        } else {
                          navigation.navigate("DataSaverHub", { title: item.title });
                        }
                      }}
                      style={styles.iconBtn}
                    >
                      <FontAwesomeIcon icon={faLocationDot} size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              ))}
            </Animated.ScrollView>

            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{price}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.cardContent, { backgroundColor: isLight ? "#fff" : "#1a1a1a", borderColor: isLight ? "#e0e0e0" : "#333" }]}>
          <View style={styles.headerRow}>
            <View style={styles.titleSection}>
              <Text numberOfLines={1} style={[styles.titleText, { color: isLight ? LGlobals.text : DGlobals.text }]}>
                {title}
              </Text>
              <Text numberOfLines={1} style={[styles.subtitleText, { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }]}>
                Student Accommodation Near Campus
              </Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.priceTextSmall}>{price}</Text>
            </View>
          </View>

          <View style={styles.categoryRow}>
            <View style={[styles.categoryBadge, { backgroundColor: "#e3f2fd" }]}>
              <Text style={[styles.categoryText, { color: "#1976d2" }]}>Accommodation</Text>
            </View>
            <View style={styles.ratingContainer}>
               <FontAwesomeIcon icon={faStar} size={14} color="#FFD700" />
               <Text style={[styles.ratingText, { color: isLight ? LGlobals.text : DGlobals.text }]}>
                 {rating} ({reviewCount})
               </Text>
             </View>
          </View>

          <Text style={[styles.descriptionText, { color: isLight ? LGlobals.text : DGlobals.text }]}>
               Quecus Campus Residential Estate  
          </Text>

          <View style={styles.locationRow}>
            <FontAwesomeIcon icon={faLocationDot} size={14} color={isLight ? LGlobals.lighttext : DGlobals.lighttext} />
            <Text style={[styles.locationText, { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }]}>
              {location}
            </Text>
          </View>

          <View style={styles.phoneRow}>
            <FontAwesomeIcon icon={faPhone} size={14} color={isLight ? LGlobals.lighttext : DGlobals.lighttext} />
            <Text style={[styles.phoneText, { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }]}>
              {phoneNumber}
            </Text>
          </View>

         

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLight ? LGlobals.background : DGlobals.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { color: isLight ? LGlobals.text : DGlobals.text }]}>Accommodation</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onCreatePress} style={[styles.headerBtn, { marginLeft: 8, backgroundColor: "#2a9d8f" }]}> 
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.headerBtnText}>Create</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {listings === null || loading ? (
        <View style={styles.centered}>
          <ActivityIndicate size={45} color={isLight ? LGlobals.bluetext : DGlobals.bluetext} />
        </View>
      ) : Array.isArray(listings) && listings.length === 0 ? (
        <EmptyScreen icon={null} btn={true} marginBottom={50} OnPressText={"Refresh"} color={isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground} text={"No listings yet"} />
      ) : (
        <FlatList
          data={listings}
          renderItem={renderCard}
          keyExtractor={(it, i) => (it.id ? String(it.id) : String(i))}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} />}
        />
      )}
    </SafeAreaView>
  );
};

export default LandlordLodge;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerActions: { flexDirection: "row", alignItems: "center" },
  headerBtn: { backgroundColor: "#057d8c", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  headerBtnText: { color: "#fff", fontWeight: "600" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  cardContainer: { marginBottom: 16, paddingHorizontal: 16 },
  cardWrap: { marginBottom: 8 },
  card: { width: CARD_WIDTH, height: CARD_HEIGHT, overflow: "hidden", borderRadius: 12, justifyContent: "flex-end" },
  carousel: { width: CARD_WIDTH, height: CARD_HEIGHT },
  cardImageBG: { width: CARD_WIDTH, height: CARD_HEIGHT, justifyContent: "flex-end" },
  cardImage: { resizeMode: "cover" },
  priceBadge: { position: "absolute", top: 12, right: 12, backgroundColor: "rgba(0,0,0,0.6)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  priceText: { color: "#fff", fontWeight: "700" },
  priceTextSmall: { color: "#fff", fontWeight: "700", fontSize: 14 },
  cardContent: { padding: 16, borderRadius: 12, marginTop: -8, borderWidth: 1 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  titleSection: { flex: 1, marginRight: 12 },
  titleText: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  subtitleText: { fontSize: 14, opacity: 0.7 },
  priceSection: { backgroundColor: "#2a9d8f", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16 },
  categoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 12 },
  categoryText: { fontSize: 12, fontWeight: "600" },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  starIcon: { fontSize: 14, marginRight: 4 },
  ratingText: { fontSize: 12, fontWeight: "600" },
  descriptionText: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  locationIcon: { fontSize: 14, marginRight: 8 },
  locationText: { fontSize: 12, flex: 1 },
  phoneRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  phoneIcon: { fontSize: 14, marginRight: 8 },
  phoneText: { fontSize: 12, flex: 1 },
  discountRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  discountIcon: { fontSize: 16, marginRight: 8, color: "#ff6b35" },
  discountText: { fontSize: 14, fontWeight: "600", color: "#ff6b35" },
  specialOffersRow: { marginBottom: 16 },
  specialOffersTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  offersContainer: { flexDirection: "row", justifyContent: "space-between" },
  offerText: { fontSize: 12, flex: 1 },
  detailsButton: { paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  detailsButtonText: { fontSize: 14, fontWeight: "600" },
  imageDim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  topIconsRow: { position: 'absolute', top: 12, right: 12, flexDirection: 'row' },
  iconBtn: { marginLeft: 8, padding: 6, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 18 },
});


