import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import Home from "./Screens/Home";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  ImageBackground,
  ImageBackgroundBase,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });
  const [loginScreen, setLoginScreen] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window: { width, height } }) => {
        setDimensions({ width: width, height: height });
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
    <NavigationContainer onLayout={onLayoutRootView}>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        {/* Аналог Route */}
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start screen" }}
        />
        {/* <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator> */}
        {/* {loginScreen ? ( */}
        {/* <LoginScreen /> */}
        {/* ) : ( */}
        {/* <RegistrationScreen /> */}
        {/* {/* )} */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
