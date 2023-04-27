import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialUser = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [user, setUser] = useState(initialUser);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(user);
  };

  const submitForm = () => {
    console.log(user);
    setUser(initialUser);
  };

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
          <View style={styles.form}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.text}>Регистрация</Text>
              <TextInput
                style={styles.input}
                placeholder="Логин"
                value={user.login}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                value={user.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={user.password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, password: value }))
                }
              />
            </KeyboardAvoidingView>

            <View
              style={{
                ...styles.buttonContainer,
                marginBottom: isShowKeyboard ? -60 : 0,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => submitForm()}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    ...Platform.select({
      ios: {
        justifyContent: "center",
      },
      android: {
        justifyContent: "flex-end",
      },
    }),
  },
  form: {
    paddingTop: 92,
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
    // marginBottom: -60,
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
