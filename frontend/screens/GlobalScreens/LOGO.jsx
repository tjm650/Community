import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const LOGO = ({ width, height}) => {
    const logo = require("../../assets/images/general.jpg")
  return (
    <View>
      <Image
      style={{
        width: width,
        height:height,
        shadowColor:"red",
        shadowOffset: {width:50, height:50},
        shadowRadius:50,
      }}
      source={logo}
      />
    </View>
  )
}

export default LOGO

const styles = StyleSheet.create({})