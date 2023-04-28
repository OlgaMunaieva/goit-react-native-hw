import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./Screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [loginScreen, setLoginScreen] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window: { width } }) => {
        setDimensions(width);
      }
    );
    return () => subscription?.remove();
  });

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleEnterBtn = () => {
    setLoginScreen(true);
  };

  const handleRegisterBtn = () => {
    setLoginScreen(false);
  };
  // console.log(Platform.OS);
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {loginScreen ? (
        <LoginScreen register={handleRegisterBtn} />
      ) : (
        <RegistrationScreen dimensions={dimensions} enter={handleEnterBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
