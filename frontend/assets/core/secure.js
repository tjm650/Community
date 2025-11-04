import { StyleSheet } from 'react-native';
//import EncryptedStorage from "react-native-encrypted-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Use this import (NOT the deprecated one)
// import AsyncStorage from '@react-native-async-storage/async-storage';



// Set Item
/*
async function set(key, object) {
  try {
    const jsonObject = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonObject);
  } catch (error) {
    console.log("secure.set: ", error);
  }
}
*/


const secure = () => {
 
}



const styles = StyleSheet.create({})

const canUseStorage = typeof window !== 'undefined';

const set = async (key, value) => {
  if (!canUseStorage) {
    return; // Skip during static rendering/SSR
  }
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("secure.set: ", e);
  }
};


// Get Item
/*
async function get(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== undefined) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("secure.get:", error);
  }
}
*/

const get = async (key) => {
  if (!canUseStorage) {
    return null; // Skip during static rendering/SSR
  }
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("secure.get: ", e);
  }
};



// Remove Item
/*
async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("secure.remove:", error);
  }
}
  */

const remove = async (key) => {
  if (!canUseStorage) {
    return; // Skip during static rendering/SSR
  }
  try {
    await AsyncStorage.removeItem(key);
  } catch(e) {
    console.log("secure.remove:", e);
  }
  console.log('Done.');
}






// Wipe Item

/*
async function wipe() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("secure.wipe:", error);
  }
}
  */

const wipe = async (key) => {
  if (!canUseStorage) {
    return; // Skip during static rendering/SSR
  }
  try {
    await AsyncStorage.clear(key);
  } catch(e) {
    console.log("secure.wipe:", e);
  }
  console.log('Done.');
}

export default { set, get, remove, wipe, secure };
 