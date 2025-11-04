import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PickerView = ({
  placeholder,
  value,
  value1,
  onChangeText,
  placeholderTextColor,  
  Forgot_Password,
  Space = true,
  icon,
  secureTextEntry,
  onPress,
  readOnly,
  fontWeight,
  pickerOption,
  open,
  items,
  setOpen,
  setValue,
  setItems,
  arrowColor,
}) => {
  return (
    <View
      style={{
        marginBottom: Space ? 0 : "5%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#3838389a",
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderWidth: 0,
          borderColor: "#ffffffcb",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: "85%",
          alignSelf: "center",
        }}
      >
        <View>{icon}</View>
        <DropDownPicker
          style={{
            width: "80%",
            overflow: "hidden",
            backgroundColor: "transparent",
            borderWidth: 0,
          }}
          dropDownContainerStyle={{
            marginTop: "5%",
            backgroundColor: "rgba(159, 159, 159,0.8)",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 0,
            borderColor: "#ffffffcb",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            width: "85%",
          }}
          placeholder={placeholder}
          placeholderStyle={{ color: placeholderTextColor }}
          labelStyle={{
            color: placeholderTextColor,
          }}
          selectedItemLabelStyle={{
            color: "#fff",
            fontWeight: "bold",
          }}
          itemStyle={{
            color: "white",
            fontWeight: "800",
          }}
          arrowIconStyle={{
            tintColor: placeholderTextColor,
            width: 20,
            height: 20,
          }}
          // Tick icon styling
          tickIconStyle={{
            tintColor: placeholderTextColor,
            padding: 5,
            width: 18,
            height: 18,
          }}
          onChangeValue={onChangeText}
          open={open}
          value={value || value1}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: "5%",
        }}
      >
        <Text
          onPress={onPress}
          style={{
            color: "#82cdffdd",
            fontWeight: "500",
            marginLeft: "10%",
            marginTop: "2%",
          }}
        >
          {Forgot_Password}
        </Text>
      </View>
    </View>
  );
};

export default PickerView;

const styles = StyleSheet.create({});
