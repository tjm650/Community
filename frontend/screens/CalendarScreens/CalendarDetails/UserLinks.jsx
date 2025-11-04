import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
//======================================================================================

function NetworkingAccounts({
  GetView,
  AccountName,
  AccountDetails,
  AccountUsername,
  icon,
}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        justifyContent: "center",
        marginBottom: 25,
        borderBottomWidth: 0.3,
        borderColor: "#d0d0d0",
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginBottom: "1%",
        }}
      >
        {GetView}
        <Text
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            fontWeight: 700,
          }}
        >
          {AccountName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: "2%",
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          color={isLight ? LGlobals.icon : DGlobals.icon}
          size={14}
        />
        <Text
          style={{
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          }}
        >
          {AccountDetails}
        </Text>
      </View>
    </View>
  );
}

function AddNewAccountDetails(params) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        justifyContent: "center",
        borderBottomWidth: 0.3,
        borderColor: isLight ? LGlobals.icon : DGlobals.icon,
        borderRadius:15,
        backgroundColor: isLight
          ? LGlobals.buttonBackground
          : DGlobals.buttonBackground,
        height: 30,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Text
        style={{
          color:  DGlobals.text,
          fontWeight:600
        }}
      >
        Settings
      </Text>
    </TouchableOpacity>
  );
}

const UserLinks = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        marginTop: "3%",
      }}
      id="Accounts Details"
    >
      <NetworkingAccounts
        icon={"fa-solid fa-envelope"}
        AccountDetails={"tinotendajenya.org@gmail.com"}
        AccountName={"Email Address"}
      />
      <AddNewAccountDetails />
    </View>
  );
};

export default UserLinks;

const styles = StyleSheet.create({});
