import React from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegistrationScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.form}>
        <Text style={styles.text}>Регистрация</Text>
        <TextInput style={styles.input} placeholder="Логин" />
        <TextInput style={styles.input} placeholder="Адрес электронной почты" />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnTitle}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    fontSize: 30,
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#212121",
  },
  buttonContainer: {
    marginHorizontal: 16,
    // height: 51,
    // borderRadius: 100,
  },
  button: {
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 27,
    // fontSize: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default RegistrationScreen;
