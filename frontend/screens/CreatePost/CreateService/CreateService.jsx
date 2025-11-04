import { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
 
// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";
import FilePicker from "../FilePicker";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import SelectedFiles from "../SelectedFiles";
import UserDetailsView from "../UserDetailsView";
import SelectedService from "./SelectedService";
import ServicesData from "./ServicesData";

//======================================================================================

const CreateService = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showInfor, setShowIfor] = useState(true);
  const user = useGlobal((state) => state.user);

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [showSelectedService, setshowSelectedService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectService = (item) => {
    setSelectedServices((prevItems) => [...prevItems, item]);
    setshowSelectedService((value) => (value = true));
  };

  function onSend() {
    ////////////////// get selected department ///////////////////////////////
    //let getSelectedDpt = selectedDepartments.map((item) => item.dpt);
    //let SelectedDpt = getSelectedDpt.toString((item) => item.dpt);
    ////////////////// get selected tags ///////////////////////////////
    //let getSelectedTags = selectedtags.map((item) => "•" + item.email);
    //let SelectedTags = getSelectedTags.toString((item) => item.email);
    //console.log("selected tages", ki)
    // Trim the message text spaces
    //const cleaned = blog.replace(/\s+/g, " ").trim();
    //const details = {
    // username: user.username,
    //name: user.name,
    //email: user.email,
    // image: image ? image1 : null,
    //department: SelectedDpt,
    //tags: SelectedTags,
    //description: blog,
    //};
    //if (cleaned.length === 0) return;
    //blogSend(details);
    //setBlog("");
  }

  ////////////////// onType //////////////////
  // function onType(value) {
  // setBlog(value);
  //}

  ////////////////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Update
            </Text>
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
    
      <View
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
          justifyContent: "flex-end",
        }}
      >
        {showInfor && (
          <View
            style={{
              gap: 5,
              padding: 5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
              }}
            >
              {showSelectedService ? (
                <SelectedService selectedServices={selectedServices} />
              ) : null}
            </View>

            <InputPost
              //  onPressIn={() => setShowIfor((value) => (value = false))}
              //postmessage={post}
             // setPostMessage={onType}
             // onSend={onSend}
              textdescription={true}
              height={"auto"}
              MoreIcons={true}
              post={false}
              showAdd={showInfor ? false : true}
              moreOptions={
                () => "" // setShowIfor((value) => (value = true)) || Keyboard.dismiss()
              }
              backgroundColor={
                isLight ? LGlobals.background : DGlobals.background
              }
            />

            {image && <SelectedFiles image={image} />}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <ServicesData
                handleSelectService={handleSelectService}
                SelectedServices={selectedServices}
              />

              <FilePicker  setImage={setImage} setImage1={setImage1} />
              <SendIcon/>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateService;

const styles = StyleSheet.create({});
