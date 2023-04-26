import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  console.log(Platform.OS);
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <RegistrationScreen />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // justifyContent: "centre",
  },
});
