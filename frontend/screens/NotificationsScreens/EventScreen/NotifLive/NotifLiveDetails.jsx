import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DetailsView from "../DetailsView";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//
import { LNotifs } from "@/constants/LightColor/LNotifs";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { Ionicons } from "@expo/vector-icons";
//======================================================================================

const NotifLiveDetails = ({ image, title, venue, date, duration }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [LiveDetailsOpen, setLiveDetailsOpen] = useState(false);

  function Onpressing(params) {
    //setShow((value) => !value);
    setLiveDetailsOpen((value) => !value);
    null;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "1%",
        flex: 1,
      }}
    >
      {image ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: Dimensions.get("window").width / 2,
            aspectRatio: 1,
            backgroundColor: isLight
              ? LNotifs.events.notifLiveView.imageBackgroundColor
              : DNotifs.events.notifLiveView.imageBackgroundColor,
            borderRadius: 20,
            marginRight: "1%",
            marginLeft: "2%",
            borderWidth: 0,
            borderColor: isLight
              ? LNotifs.events.notifLiveView.imageBorderColor
              : DNotifs.events.notifLiveView.imageBorderColor,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              resizeMode: "cover",
              justifyContent: "center",
              alignSelf: "center",
              width: "100%",
              height: "100%",
            }}
            source={utils.GetImage(image)}
          />
        </TouchableOpacity>
      ) : null}

      {image ? (
        <View
          style={{
            flex: 1,
            maxWidth: "45%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={Onpressing} style={{}}>
            <DetailsView itemDesc={"Event"} Desc={title} image={image} />
            <DetailsView itemDesc={"Venue"} Desc={venue} image={image} />
            <DetailsView itemDesc={"Date"} Desc={date} image={image} />
            <DetailsView itemDesc={"Period"} Desc={duration} image={image} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          {LiveDetailsOpen ? (
            <TouchableOpacity activeOpacity={0.5} onPress={Onpressing}>
              <DetailsView itemDesc={"Event"} Desc={title} image={image} />
              <DetailsView itemDesc={"Venue"} Desc={venue} image={image} />
              <DetailsView itemDesc={"Date"} Desc={date} image={image} />
              <DetailsView itemDesc={"Period"} Desc={duration} image={image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.5} onPress={Onpressing}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 20,
                }}
                onPress={() => setLiveDetailsOpen((value) => (value = true))}
              >
                <Ionicons
                  name={"chevron-up"}
                  size={20}
                  color={isLight ? "#001f29" : "#7cf0ffe7"}
                />
              </TouchableOpacity>
              <DetailsView itemDesc={"Event"} Desc={title} image={image} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default NotifLiveDetails;

const styles = StyleSheet.create({});
