// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Linking, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useGlobal from '@/assets/common/core/useGlobal';

const RBZ_ARCHIVE = 'https://www.rbz.co.zw/index.php/research/markets/exchange-rates';

function safeNumber(s){
  if(!s) return null;
  const n = parseFloat(s.replace(/,/g, ''));
  return Number.isFinite(n)? n : null;
}

async function fetchHtml(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Network error');
  return await res.text();
}

// Very small heuristic parser: look for USD and ZAR rows and pick first numeric token after them
function parseRatesFromHtml(html){
  const usdMatch = html.match(/USD[\s\S]{0,200}?([0-9]+\.?[0-9,]*)/i);
  const zarMatch = html.match(/ZAR[\s\S]{0,200}?([0-9]+\.?[0-9,]*)/i);
  const gbpMatch = html.match(/GBP[\s\S]{0,200}?([0-9]+\.?[0-9,]*)/i);
  const results = {};
  if(usdMatch) results.usd = safeNumber(usdMatch[1]);
  if(zarMatch) results.zar = safeNumber(zarMatch[1]);
  if(gbpMatch) results.gbp = safeNumber(gbpMatch[1]);
  return results;
}

export default function ExchangeRates({ navigation }){
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dateInput, setDateInput] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const fetchLatest = useCallback(async (dateStr) => {
    setLoading(true);
    try{
      // fetch archive page and try to find a day block containing rates for the requested date (if provided)
      const archive = await fetchHtml(RBZ_ARCHIVE);

      // If user requested a specific date, try to find that date string in archive and follow a nearby link.
      // Otherwise try to find the first occurrence of a table containing USD or ZAR in the archive HTML itself.

      let targetHtml = archive;

      // quick heuristic: if archive contains tables with USD/ZAR we can parse directly
      let parsed = parseRatesFromHtml(targetHtml);

      // if not found or user requested date, try to find a link to the specific month page
      if((!parsed.usd && !parsed.zar) || dateStr){
        // find month link (e.g. 'september-2025') by searching for month-year of provided date or current month
        const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
        const target = dateStr ? new Date(dateStr) : new Date();
        const monthName = monthNames[target.getMonth()];
        const year = target.getFullYear();

        const re = new RegExp(`/index.php/research/markets/exchange-rates/\\d+-${monthName}-${year}`,'i');
        const monthMatch = archive.match(re);
        let monthUrl = null;
        if(monthMatch){
          // extract full href
          const hrefRe = new RegExp(`href=["']([^"']*${monthMatch[0].replace('/','') }[^"']*)["']`,'i');
          const href = archive.match(hrefRe);
          if(href && href[1]) monthUrl = href[1].startsWith('http')? href[1] : `https://www.rbz.co.zw/${href[1].replace(/^\//,'')}`;
        }

        if(monthUrl){
          const monthHtml = await fetchHtml(monthUrl);
          // try to parse month page content for USD/ZAR
          parsed = parseRatesFromHtml(monthHtml);
          targetHtml = monthHtml;
        } else {
          // fallback: try to find any day-link in archive that contains 'pdf' or 'xlsx' and follow its url (can't parse pdf client-side reliably)
          const linkMatch = archive.match(/href=["']([^"']*exchange-rates[^"']*\.pdf)["']/i);
          if(linkMatch && linkMatch[1]){
            // we cannot parse PDF reliably; return the archive link for the user to open
            setRates({ error: 'PDF only: open RBZ site', link: (linkMatch[1].startsWith('http')? linkMatch[1] : `https://www.rbz.co.zw/${linkMatch[1].replace(/^\//,'')}`) });
            setLastUpdated(new Date().toISOString());
            setLoading(false);
            return;
          }
        }
      }

      // After parsing we expect USD and ZAR to be present; compute derived pairs
      const usd = parsed.usd || null;
      const zar = parsed.zar || null;
      const zwlPerUsd = usd; // RBZ reports local currency per USD
      const zwlPerZar = zar;

      let usdPerZar = null;
      if(zwlPerUsd && zwlPerZar) usdPerZar = zwlPerUsd / zwlPerZar;

      setRates({ zwlPerUsd, zwlPerZar, usdPerZar, raw: parsed });
      setLastUpdated(new Date().toISOString());
    }catch(e){
      setRates({ error: e.message });
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(()=>{
    fetchLatest();
    const iv = setInterval(()=> fetchLatest(), 60_000); // refresh every 60s
    return ()=> clearInterval(iv);
  }, [fetchLatest]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: isLight? '#fff' : '#000' }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: isLight? '#111' : '#eee' }]}>Exchange rates (RBZ)</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('ExchangeDisclaimer')} style={styles.disclaimerBtn}>
          <Text style={{ color: '#fff' }}>Disclaimer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <TouchableOpacity onPress={()=> fetchLatest()} style={styles.refreshBtn}>
          <Text style={{ color: '#fff' }}>Refresh</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator />}

        {rates.error && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: isLight? '#333' : '#ddd' }}>{rates.error}</Text>
            {rates.link && (
              <TouchableOpacity onPress={()=> Linking.openURL(rates.link)}>
                <Text style={{ color: '#06f', marginTop: 6 }}>Open RBZ document</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!loading && !rates.error && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ color: isLight? '#111' : '#fff', fontWeight: '700' }}>ZWL per USD: {rates.zwlPerUsd ?? '—'}</Text>
            <Text style={{ color: isLight? '#111' : '#fff', fontWeight: '700' }}>ZWL per ZAR: {rates.zwlPerZar ?? '—'}</Text>
            <Text style={{ color: isLight? '#111' : '#fff', fontWeight: '700' }}>USD per ZAR (computed): {rates.usdPerZar ? rates.usdPerZar.toFixed(6) : '—'}</Text>
            <Text style={{ color: isLight? '#666' : '#ccc', marginTop: 8 }}>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : '—'}</Text>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={{ color: isLight? '#333' : '#ddd', marginBottom: 6 }}>Get historical rates (select date & time)</Text>

          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
              // open date picker first
              setShowDatePicker(true);
            }} style={{ borderWidth: 1, padding: 10, borderRadius: 6, borderColor: '#ccc' }}>
              <Text style={{ color: isLight? '#111' : '#fff' }}>{dateTime ? new Date(dateTime).toLocaleDateString() : 'Pick date'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              // open time picker
              if(!dateTime) setDateTime(new Date());
              setShowTimePicker(true);
            }} style={{ borderWidth: 1, padding: 10, borderRadius: 6, borderColor: '#ccc' }}>
              <Text style={{ color: isLight? '#111' : '#fff' }}>{dateTime ? new Date(dateTime).toLocaleTimeString() : 'Pick time'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> {
                // pass YYYY-MM-DD to fetchLatest
                const ds = dateTime ? new Date(dateTime).toISOString().slice(0,10) : '';
                fetchLatest(ds);
              }} style={{ marginLeft: 8, backgroundColor: '#057d8c', padding: 10, borderRadius: 6 }}>
              <Text style={{ color: '#fff' }}>Fetch for date</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dateTime ? new Date(dateTime) : new Date()}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(e, selected) => {
                setShowDatePicker(Platform.OS === 'ios');
                if(selected){
                  // preserve existing time
                  const base = new Date(selected);
                  const prev = dateTime ? new Date(dateTime) : new Date();
                  base.setHours(prev.getHours());
                  base.setMinutes(prev.getMinutes());
                  setDateTime(base);
                  // on Android open time picker next
                  if(Platform.OS !== 'ios') setShowTimePicker(true);
                }
              }}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={dateTime ? new Date(dateTime) : new Date()}
              mode={'time'}
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, selected) => {
                setShowTimePicker(Platform.OS === 'ios');
                if(selected){
                  const prev = dateTime ? new Date(dateTime) : new Date();
                  prev.setHours(selected.getHours());
                  prev.setMinutes(selected.getMinutes());
                  setDateTime(prev);
                }
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  disclaimerBtn: { backgroundColor: '#d9534f', padding: 8, borderRadius: 6 },
  body: { padding: 16 },
  refreshBtn: { backgroundColor: '#057d8c', padding: 10, borderRadius: 6, alignSelf: 'flex-start' }
});
