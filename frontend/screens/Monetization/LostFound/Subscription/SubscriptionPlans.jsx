import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";

const SubscriptionPlans = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "$2.99",
      duration: "1 Month",
      features: [
        "Report up to 3 lost items",
        "Search lost & found items",
        "Basic email support",
        "View item details",
      ],
      popular: false,
      color: "#42A5F5",
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "$5.99",
      duration: "3 Months",
      features: [
        "Unlimited lost item reports",
        "Unlimited found item reports",
        "Priority search access",
        "Contact information access",
        "Priority support",
        "Advanced filtering",
        "Email notifications",
      ],
      popular: true,
      color: "#FF6B6B",
    },
    {
      id: "student",
      name: "Student Plan",
      price: "$9.99",
      duration: "6 Months",
      features: [
        "All Premium features",
        "Student discount (50% off)",
        "Campus-wide notifications",
        "Integration with student portal",
        "Bulk reporting for events",
        "Dedicated student support",
        "Monthly usage reports",
      ],
      popular: false,
      color: "#66BB6A",
    },
  ];

  const handleSubscribe = async (plan) => {
    setLoading(true);
    setSelectedPlan(plan.id);

    try {
      // TODO: Implement payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      Alert.alert(
        "Subscription Successful",
        `You have successfully subscribed to the ${plan.name}. You now have access to all premium features!`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert("Subscription Failed", "There was an error processing your subscription. Please try again.");
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const PlanCard = ({ plan }) => (
    <View
      style={{
        backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: plan.popular ? 2 : 1,
        borderColor: plan.popular
          ? plan.color
          : (isLight ? "#ddd" : "#333"),
        position: "relative",
      }}
    >
      {plan.popular && (
        <View
          style={{
            position: "absolute",
            top: -10,
            right: 20,
            backgroundColor: plan.color,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            Most Popular
          </Text>
        </View>
      )}

      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "700",
            fontSize: 20,
            marginBottom: 4,
          }}
        >
          {plan.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text
            style={{
              color: plan.color,
              fontWeight: "700",
              fontSize: 28,
              marginRight: 8,
            }}
          >
            {plan.price}
          </Text>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 14,
            }}
          >
            / {plan.duration}
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        {plan.features.map((feature, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <MaterialIcons
              name="check-circle"
              size={16}
              color={plan.color}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
                flex: 1,
              }}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => handleSubscribe(plan)}
        disabled={loading && selectedPlan === plan.id}
        style={{
          backgroundColor: loading && selectedPlan === plan.id
            ? (isLight ? "#ccc" : "#555")
            : plan.color,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        {loading && selectedPlan === plan.id ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Subscribe Now
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: isLight ? "#eee" : "#333",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Subscription Plans
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Hero Section */}
        <View
          style={{
            backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            padding: 20,
            borderRadius: 16,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="star"
            size={32}
            color="#fff"
            style={{ marginBottom: 12 }}
          />
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Unlock Premium Features
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              textAlign: "center",
              opacity: 0.9,
            }}
          >
            Get unlimited access to report lost items, contact owners, and much more
          </Text>
        </View>

        {/* Plans */}
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

        {/* FAQ Section */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 18,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 16,
            marginTop: 20,
          }}
        >
          Frequently Asked Questions
        </Text>

        <View
          style={{
            backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Can I cancel my subscription anytime?
          </Text>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
            }}
          >
            Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            What payment methods do you accept?
          </Text>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
            }}
          >
            We accept all major credit cards, PayPal, and mobile money payments.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
            padding: 16,
            borderRadius: 12,
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Is my payment information secure?
          </Text>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
            }}
          >
            Yes, all payments are processed through secure, encrypted channels. We never store your payment information.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPlans;

const styles = StyleSheet.create({});