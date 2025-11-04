import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";
import utils from "@/assets/core/utils";
import CheckClientType from "../../GlobalScreens/CheckClientType";

const OnlineTransactions = () => {
  const { theme } = useGlobal();
  const CreateMonetizationAgentTx = useGlobal(
    (s) => s.CreateMonetizationAgentTx
  );
  const monetizationSocketFetchTxAgents = useGlobal(
    (s) => s.monetizationSocketFetchTxAgents
  );
  const monetizationFetchTXAgent = useGlobal((s) => s.monetizationFetchTXAgent);
  // return the store value directly (avoid returning a new [] each render)
  const txList = useGlobal((s) => s.monetization.tx);
  console.log("txList:-->", txList);

  const currentUser = useGlobal((s) => s.user);
  let isLight = theme === "light";
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState(null);
  const [listings, setListings] = useState([]);
  const [zwlPerUsd, setZwlPerUsd] = useState(null);
  const navigation = useNavigation();

  // Track page visit when component mounts
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const { monetization } = useGlobal.getState();
        await monetization.trackPageVisit('online_transactions');
      } catch (error) {
        console.error('Error tracking online transactions visit:', error);
      }
    };
    trackVisit();
  }, []);

  // remove or deprecate test tx usage in UI; keep function for backward compatibility but not exposed

  // Create listing UI state
  const [showCreate, setShowCreate] = useState(false);
  const [methodInput, setMethodInput] = useState("ecocash");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [providerNameInput, setProviderNameInput] = useState("");
  const [providerLocationInput, setProviderLocationInput] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateAgent = async () => {
    if (!methodInput || !methodInput.trim()) {
      Alert.alert(
        "Missing method",
        "Please enter the transaction method (e.g. ecocash)."
      );
      return;
    }
    if (!currentUser || !currentUser.id) {
      Alert.alert(
        "Not logged in",
        "You must be logged in to create a listing."
      );
      return;
    }

    // check duplicates: user may only post once per transaction method
    const existing = (txList || []).find((l) => {
      const lmethod = (l.method || l.payment_method || l.type || l.title || "")
        .toString()
        .toLowerCase();
      const uid =
        l.user?.id || l.user?._id || l.user_id || l.creator_id || null;
      return (
        uid === (currentUser.id || currentUser._id || currentUser.userId) &&
        lmethod === methodInput.trim().toLowerCase()
      );
    });

    if (existing) {
      Alert.alert(
        "Agent exists",
        `You already have a agent for '${methodInput.trim()}'`
      );
      return;
    }

    setCreating(true);
    try {
      const payload = {
        userId: currentUser.id,
        title: `${
          currentUser.name || currentUser.username || "Agent"
        } - ${methodInput.trim()}`,
        description:
          descriptionInput ||
          `${methodInput.trim()} service by ${
            currentUser.name || currentUser.username
          }`,
        method: methodInput.trim().toLowerCase(),
        type: "transaction_agent",
        provider_name:
          providerNameInput || currentUser.name || currentUser.username,
        provider_location: providerLocationInput || "",
      };

      await CreateMonetizationAgentTx(payload);

      // optimistic UI: close form and clear inputs — listing will appear when socket emits listing_created
      setShowCreate(false);
      setMethodInput("");
      setDescriptionInput("");
    } catch (e) {
      Alert.alert(
        "Create failed",
        e && e.message ? e.message : "Failed to create Agent"
      );
    } finally {
      setCreating(false);
    }
  };

  // const fetchListings = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const accs = await monetizationFetchTXAgent();
  //     if (Array.isArray(accs) && accs.length) {
  //       setListings(accs);
  //     } else {
  //       await monetizationSocketFetchTxAgents(0);
  //       setListings(Array.isArray(txList) ? txList : []);
  //     }
  //   } catch (e) {
  //     setListings([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [txList, monetizationFetchTXAgent]);

  // useEffect(() => {
  //   fetchListings();
  // }, []);

  const AgentCard = ({ item }) => {
    const user = item.user || {};
    const method = item.method || item.type || "Agent";
    const verified = item.verified || user.verified || false;

    const currentUser = useGlobal((s) => s.user);

    const requestConnect = useGlobal((s) => s.requestConnect);
    const ConnectList = useGlobal((s) => s.ConnectList);

    // Ensure there's a connection; if not, request one and wait briefly for the response
    const createOrGetConnection = async (username) => {
      // try to find an existing connect in ConnectList
      const found = (ConnectList || []).find(
        (c) => c.connect && c.connect.username === username
      );
      if (found) return found;

      // otherwise request connect and wait for connect.new via ConnectList update
      try {
        await requestConnect(username);
      } catch (e) {
        // requestConnect is a socket send; it doesn't throw, but we keep safe
      }

      // wait up to 2s for ConnectList to populate
      const start = Date.now();
      while (Date.now() - start < 2000) {
        const latest = (ConnectList || []).find(
          (c) => c.connect && c.connect.username === username
        );
        if (latest) return latest;
        // small delay
        await new Promise((r) => setTimeout(r, 150));
      }
      return null;
    };

    const openInboxWithTag = async () => {
      // ensure a connection exists (create or find)
      const username =
        user.username ||
        user.name ||
        item.user?.username ||
        item.user?.name ||
        null;
      let connectObj = null;
      if (username) {
        connectObj = await createOrGetConnection(username);
      }

      const connectParam = connectObj
        ? connectObj.connect
        : {
            id: user.connection_id || user.id || user._id || item.id || null,
            name: user.name || user.username || item.title || "Agent",
            username: user.username || user.name || "",
            profile_image: user.profile_image || user.image || null,
            online: user.online || false,
          };

      const tag = {
        text: item.title || method || "Service",
        serviceId: item.id || item._id || null,
        serviceRaw: item,
      };

      navigation.navigate("MesssageInbox", {
        connect: connectParam,
        sender: currentUser?.id,
        id: connectParam.id,
        tagedMessage: tag,
      });
    };

    return (
      <CheckClientType
        DirectoryView={
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={openInboxWithTag}
            style={{
              flexDirection: "row",
              // alignItems: "center",
              paddingVertical: 12,
              // paddingHorizontal: 8,
              width: "100%",
              marginBottom: 8,
            }}
          >
            <View>
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48,
                  backgroundColor: "#5a5a5b",
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.provider.profile_image ? (
                  <Image
                    style={{ height: 48, width: 48 }}
                    source={utils.GetImage(user.profile_image)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    size={20}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                  />
                )}
              </View>
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
              <View
                style={{
                  // flexDirection: "row",
                  // alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    // flexDirection: "row",
                    // alignItems: "center",
                    // gap: 8,
                    flex: 1,
                  }}
                >
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: "600",
                        color: isLight ? LGlobals.text : DGlobals.text,
                      }}
                    >
                      {item.provider.name || "Unknown"}
                    </Text>
                  </View>

                  <View style={{}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: isLight ? LGlobals.greyText : DGlobals.greyText,
                        maxWidth: "97%",
                      }}
                    >
                      {item.description || "tx Agent"}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "flex-start",
                    flexDirection: "row",
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.borderColor : DGlobals.borderColor,
                      textTransform: "capitalize",
                      borderWidth: 0.3,
                      borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                      backgroundColor: isLight ? "#e6f0ff" : "#00336636",
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {method}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }
        directoryStatus={user.directory_status1}
        verified={verified}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {/* Header with title and test tx icon */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("ExchangeDisclaimer")}
          activeOpacity={0.8}
          style={{
            backgroundColor: isLight
              ? LGlobals.BottomTab.active
              : DGlobals.BottomTab.active,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 20,
            marginBottom: 15,
            marginVertical: 5,
            minWidth: "43%",
            maxWidth: "50%",
            alignItems: "flex-start",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: 600,
            }}
          >
            USD/ZWL: {zwlPerUsd ?? "—"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowCreate((s) => !s)}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          <FontAwesomeIcon
            icon=" fa-solid fa-add"
            size={17}
            color={DGlobals.icon}
          />
        </TouchableOpacity>
      </View>

      {showCreate && (
        <View
          style={{
            padding: 16,
            borderTopWidth: 1,
            borderColor: isLight ? "#eee" : "#333",
            backgroundColor: isLight ? "#fff" : "#1a1a1a",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              marginBottom: 6,
              fontWeight: "700",
              fontSize: 25,
            }}
          >
            Add transaction agent
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: isLight ? "#ddd" : "#333",
              borderRadius: 6,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={methodInput}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,
              }}
              onValueChange={(v) => setMethodInput(v)}
            >
              <Picker.Item label="Ecocash" value="ecocash" />
              <Picker.Item label="Onemoney" value="onemoney" />
            </Picker>
          </View>
          <TextInput
            placeholder="Short description"
            placeholderTextColor={isLight ? "#888" : "#999"}
            value={descriptionInput}
            onChangeText={setDescriptionInput}
            style={{
              borderWidth: 1,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
              borderColor: isLight ? "#ddd" : "#333",
              padding: 8,
              paddingVertical: 15,
              borderRadius: 6,
              color: isLight ? LGlobals.text : DGlobals.text,
              marginBottom: 8,
            }}
          />

          <TextInput
            placeholder="Provider location (city/address)"
            placeholderTextColor={isLight ? "#888" : "#999"}
            value={providerLocationInput}
            onChangeText={setProviderLocationInput}
            style={{
              borderWidth: 1,
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
              borderColor: isLight ? "#ddd" : "#333",
              padding: 8,
              paddingVertical: 12,
              borderRadius: 6,
              color: isLight ? LGlobals.text : DGlobals.text,
              marginBottom: 8,
            }}
          />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={handleCreateAgent}
              style={{
                backgroundColor: isLight
                  ? LGlobals.BottomTab.active
                  : DGlobals.BottomTab.active,
                padding: 10,
                borderRadius: 6,
              }}
            >
              {creating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "700" }}>Create</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowCreate(false);
                setMethodInput("");
                setDescriptionInput("");
              }}
              style={{
                padding: 10,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: isLight ? "#ddd" : "#333",
              }}
            >
              <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
        {txList.length === 0 ? (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>
              No agents found
            </Text>
          </View>
        ) : (
          <FlatList
            data={txList}
            renderItem={({ item }) => <AgentCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineTransactions;

const styles = StyleSheet.create({});
