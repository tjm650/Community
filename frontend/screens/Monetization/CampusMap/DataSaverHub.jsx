import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";
import { trackPageVisit } from "@/assets/common/core/storeContext/amonetization/analytics";

const DataSaverHub = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  // Track page visit when component mounts
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const userAgent = 'React Native App';
        await trackPageVisit('CampusMap', sessionId, userAgent);
      } catch (error) {
        console.error('Error tracking campus map visit:', error);
      }
    };
    trackVisit();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          Campus Map
        </Text>
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 14,
            marginTop: 8,
          }}
        >
          Campus map features coming soon...
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default DataSaverHub

const styles = StyleSheet.create({})