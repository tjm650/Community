import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import ExchangeRates from './ExchangeRates';
import useGlobal from '@/assets/common/core/useGlobal';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import { DGlobals } from '@/constants/DarkColor/DGlobals';

export default function ExchangeDisclaimer({ navigation }){
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  // Note: For history we'll navigate back to ExchangeRates and ask it to fetch a date
  const openHistory = ()=>{
    navigation.navigate('ExchangeRates', { date });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isLight ? LGlobals.background : DGlobals.background }]} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.title, { color: isLight ? LGlobals.text : DGlobals.text }]}>Disclaimer</Text>
      <Text style={[styles.body, { color: isLight ? LGlobals.greyText : DGlobals.greyText }] }>
        It is important to note that the interbank rate is the rate at which commercial banks trade foreign currency with each other and with the central bank. The rates you see at commercial banks will differ from these as they also incorporate their own fees and profit margins.
      </Text>

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: '700', marginBottom: 6, color: isLight ? LGlobals.text : DGlobals.text }}>Check interbank rate history</Text>
        {/* <TextInput placeholder={'YYYY-MM-DD'} value={date} onChangeText={setDate} style={{ borderWidth: 1, padding: 8, borderRadius: 6, borderColor: isLight ? '#ddd' : '#333', color: isLight ? LGlobals.text : DGlobals.text }} placeholderTextColor={isLight ? '#888' : '#999'} /> */}
        <TouchableOpacity onPress={openHistory} style={{ marginTop: 8, backgroundColor: isLight ? LGlobals.BottomTab.active : DGlobals.BottomTab.active, padding: 10, borderRadius: 6 }}>
          <Text style={{ color: isLight ? '#fff' : '#fff' }}>Open in rates viewer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  body: { marginTop: 12, fontSize: 14, lineHeight: 20 }
});
