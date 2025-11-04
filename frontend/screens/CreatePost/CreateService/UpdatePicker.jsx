import React from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { useNavigation } from "@react-navigation/native";

const UpdatePicker = ({
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
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View style={{}}>
      <View
        style={{
          alignItems:"center",
          backgroundColor: "#3838389a",
          borderWidth: 0,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View>{icon}</View>
        <DropDownPicker
          style={{
            overflow: "hidden",
            backgroundColor: "transparent",
            borderWidth: 0,
            width: "auto",
          }}
          dropDownContainerStyle={{
            marginTop: "5%",
            backgroundColor: isLight
              ? LGlobals.background
              : DGlobals.background,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 0,
            borderColor: "#ffffffcb",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
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
    </View>
  );
};

export default UpdatePicker;

const styles = StyleSheet.create({});
