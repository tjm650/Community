// @ts-nocheck
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";

const LandlordLodge = () => {
  const { theme } = useGlobal();
  const monetizationSocketFetchAccommodations = useGlobal((s) => s.monetizationSocketFetchAccommodations);
  const monetizationSocketCreateListing = useGlobal((s) => s.monetizationSocketCreateListing);
  const globalListings = useGlobal((s) => s.monetization.accommodations || []);
  let isLight = theme === "light";
  const [loading, setLoading] = useState(false);
  /** @type {any[]} */
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    setLoading(true);
    try {
  monetizationSocketFetchAccommodations(0);
  // populate from global when available
  setListings(globalListings || []);
    } catch (e) {
      const msg = e && e.message ? e.message : String(e);
      setListings([{ error: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async () => {
    setLoading(true);
    try {
  const payload = { title: "Test Room", description: "Short term room", type: "accommodation", price: 10.0, currency: "USD" };
  monetizationSocketCreateListing(payload);
  // newly created listing will arrive over socket; optimistic UI can prepend
  setListings((s) => [payload, ...s]);
    } catch (e) {
      const msg = e && e.message ? e.message : String(e);
      setListings([{ error: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLight ? LGlobals.background : DGlobals.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: isLight ? LGlobals.text : DGlobals.text, fontSize: 20, marginBottom: 12 }}>Accommodation listings</Text>

        <TouchableOpacity onPress={fetchListings} style={{ backgroundColor: "#057d8c", padding: 12, borderRadius: 8, marginBottom: 8 }}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff" }}>Fetch listings</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={createListing} style={{ backgroundColor: "#2a9d8f", padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ color: "#fff" }}>Create sample listing</Text>
        </TouchableOpacity>

        <View>
          {listings.map((l, idx) => (
            <View key={idx} style={{ padding: 10, borderWidth: 1, borderColor: "#eee", marginBottom: 8, borderRadius: 6 }}>
              <Text style={{ color: isLight ? LGlobals.text : DGlobals.text, fontWeight: "700" }}>{l.title || l.id || JSON.stringify(l)}</Text>
              <Text style={{ color: isLight ? LGlobals.text : DGlobals.text }}>{l.description || JSON.stringify(l)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandlordLodge;

const styles = StyleSheet.create({});
