import "@/assets/common/core/fontawesome";
import useGlobal from "@/assets/common/core/useGlobal";
import StackNavigation from "@/components/navigation/StackNavigation";
import { StatusBarManager } from "@/components/StatusBarManager";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScreenWraper from "./components/StackScreens/ScreenWraper";

export default function App() {
  const { theme } = useGlobal();

  return (
    <SafeAreaProvider>
      <StatusBarManager theme={theme} />
      <ScreenWraper>
        <PaperProvider>
          <StackNavigation />
        </PaperProvider>
      </ScreenWraper>
    </SafeAreaProvider>
  );
}
