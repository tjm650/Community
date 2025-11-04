import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import api from "@/assets/core/api";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const Agreement = () => {
  const navigation = useNavigation();
  const [isAgreed, setIsAgreed] = useState(false);
  const [AgreedError, setAgreedError] = useState("");
  const [Error, setError] = useState(false);
  const [isLink, setIsLink] = useState(true);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const userAgreement = useGlobal((state) => state.userAgreement);
  const user = useGlobal((state) => state.user);

  const handleUserAgreed = async () => {
    if (AgreedError) {
      setAgreedError("");
    }
    setError(false);
    setIsAgreed((value) => !value);
  };

  const handleAgreed = async (value) => {
    if (!isAgreed) {
      setError(true);
      setAgreedError(".");
    } else {
      //Make another Agreement Request
      api({
        method: "POST",
        url: "/api/agreement",
        data: {
          username: user.username,
          agreement: isAgreed,
        },
      })
        .then(
          // userAgreement(user),
          navigation.navigate("CompleteSignUp"),
          console.log(`user ${user.username} agreed`)
        )
        .catch((error) => {
          console.log(`user ${user.username} failed to agree`);
        });

      // Reload when screen comes into focus
    }
    // agree(isAgreed, user);
  };

  useEffect(() => {
    user;
  });

  const TermsLink = ({ linkText }) => {
    return <Text style={{ color: "#82cdffdd" }}>{linkText}</Text>;
  };

  const Terms = () => {
    const TermsInfor = ({ term, termlaws }) => {
      return (
        <View style={{ marginBottom: "10%" }}>
          <Text
            style={{
              color: isLight ? LGlobals.text : "rgba(248, 252, 254, 0.683)",
              textAlign: "left",
              fontWeight: "500",
            }}
            children={term}
          />

          <Text
            style={{
              color: isLight ? DGlobals.text : "rgba(248, 252, 254, 0.683)",
              textAlign: "left",
              width: "100%",
            }}
            children={termlaws}
          />
        </View>
      );
    };

    return (
      <ScrollView
        style={{
          paddingHorizontal: "5%",
          backgroundColor: "#000",
          height: "60%",
          flexDirection: "column",
        }}
      >
        <TermsInfor
          termlaws={
            `The Terms and Conditions govern your use of the app, including any services, features, and content provided. ` +
            `By downloading, accessing, or using this app, you agree to comply with these Terms and our Privacy Policy. If you do not agree, please do not use the app.`
          }
        />
        <TermsInfor
          term={"1. Eligibility"}
          termlaws={
            `The app is intended for college students, staff, and authorized users of an institution.` +
            ` By using the app, you confirm that you are affiliated with the institution or have obtained required specifications or permissions.`
          }
        />

        <TermsInfor
          term={"2. User Responsibilities"}
          termlaws={
            `Provide accurate and current information, keep login credentials secure, not misuse the app for unauthorized purposes,` +
            ` comply with the app policies and applicable laws.`
          }
        />

        <TermsInfor
          term={"3. Third-Party Services & Links"}
          termlaws={`The app may integrate third-party services. Their use is subject to their respective terms and privacy policies.`}
        />

        <TermsInfor
          term={"4. Data Collection and Usage"}
          termlaws={
            `To enhance performance, personalize your experience, and improve services, the app collects and processes personal data including your location.` +
            ` The purposes of data processing is to provide and improve app functionality, ` +
            `personalize your experience, conduct analytics for performance optimization, Send relevant notifications, Online marketing and promotional communications.`
          }
        />

        <View
          style={{
            marginBottom: "10%",
          }}
        >
          <Text
            style={{
              color: isLight ? DGlobals.text : "rgba(248, 252, 254, 0.683)",
              textAlign: "left",
              fontWeight: "500",
            }}
            children={"5. Online Marketing"}
          />
          <Text
            style={{
              color: isLight ? DGlobals.text : "rgba(248, 252, 254, 0.683)",
              textAlign: "left",
              width: "100%",
            }}
          >
            This{" "}
            {isLink && (
              <TermsLink linkText={"Marketing & Communications Policy"} />
            )}{" "}
            explains how the app collects, uses, and protects your online
            marketing data when you create your onlline marketing catalogue.
          </Text>
        </View>

        <View>
          <Text
            style={{
              color: isLight ? LGlobals.text : "rgba(248, 252, 254, 0.683)",
              textAlign: "left",
              fontWeight: "500",
              marginBottom: "2%",
            }}
            children={"4. Disclaimer & Limitation of Liability"}
          />

          <TermsInfor
            term={"(a) No Warranty"}
            termlaws={`The Community app is provided on an "as is" and "as available" basis, and expressly disclaims all warranties, whether express or implied. `}
          />
          <TermsInfor
            term={"(b) Limitation of Liability"}
            termlaws={`The app shall not be liable for, indirect damages, user misconduct, third-party services. `}
          />
          <TermsInfor
            term={"(c) Exceptions"}
            termlaws={`The app does not exclude or limit liability where prohibited by law, including for statutory consumer rights (e.g, under the data protection laws).`}
          />

          <TermsInfor
            term={"(d) User Acknowledgment"}
            termlaws={`By using the app, you agree that, you will back up critical data, technical support is provided on a best-effort basis with no guaranteed resolution time.`}
          />
        </View>

        <TermsInfor
          term={"6. Privacy Policy"}
          termlaws={
            `The app collects personal data to deliver services, ` +
            `personalize experiences, and improve performance. Data may be used for analytics, notifications, and marketing.` +
            `The app shares information only with trusted partners and comply with the governing law. Users retain rights to access, correct, or delete their data.`
          }
        />

        <TermsInfor
          term={"7. Policy Updates"}
          termlaws={`The app will notify users of material changes via in-app alerts and email.`}
        />

        <TermsInfor
          term={"8. More Terms & Conditions and Privacy Policy, visit"}
          termlaws={isLink && <TermsLink  linkText={"campuscommunity.com"} />}
        />
        
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingHorizontal: "2%",
      }}
    >
      <View style={{ paddingTop: "10%" }} />
      <View>
        <Text
          style={{
            color: "rgba(248, 252, 254, 0.683)",
            fontSize: 45,
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Community
        </Text>
      </View>

      <View style={{ marginTop: "5%", marginBottom: "5%" }}>
        <Text
          style={{
            marginBottom: "2%",
            color: "rgba(248, 252, 254, 0.683)",
            fontWeight: "500",
            marginHorizontal: "15%",
          }}
        >
          Terms & Conditions and Privacy Policy
        </Text>

        <Terms />
      </View>

      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",

          gap: 5,
        }}
      >
        <View style={{ width: "80%" }}>
          {Error && (
            <Text style={{ color: "#ff3636" }}>
              {AgreedError && "Agree to the Terms and Conditions."}
            </Text>
          )}

          <Text
            style={{
              color: "rgba(248, 252, 254, 0.683)",
              fontWeight: "400",
            }}
          >
            I agree to the{" "}
            <Text style={{ color: "#82cdffdd", fontWeight: "600" }}>
              Terms & Conditions and Privacy Policy of this app
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleUserAgreed}
          activeOpacity={0.8}
          style={{
            height: 25,
            width: 25,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(248, 252, 254, 0.683)",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isAgreed && (
            <TouchableOpacity
              onPress={() => setIsAgreed((value) => !value)}
              style={{
                height: 20,
                width: 20,
                backgroundColor: "#82cdffdd",
                borderWidth: 1,
                borderColor: "#82cdffdd",
                borderBottomLeftRadius: 2,
                borderBottomRightRadius: 2,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-check"
                size={12}
                color={isLight ? LGlobals.background : DGlobals.background}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleAgreed}
        style={{
          width: "90%",
          backgroundColor: DGlobals.icon,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignSelf: "center",
          paddingVertical: 15,
          marginVertical: "5%",
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Agreement;

const styles = StyleSheet.create({});
