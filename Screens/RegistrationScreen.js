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

const RegistrationScreen = ({ dimensions }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [user, setUser] = useState(initialUser);

  console.log("prop", dimensions);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitForm = () => {
    console.log(user);
    setUser(initialUser);
  };

  const leftPhoto = dimensions / 2 - 60;
  console.log(leftPhoto);

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
          <View style={styles.form}>
            <View style={{ ...styles.photoBox, left: leftPhoto }}></View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.textTitleForm}>Регистрация</Text>
              <TextInput
                style={styles.input}
                autoComplete={"username" ?? "name"}
                placeholder="Логин"
                placeholderTextColor="#bdbdbd"
                value={user.login}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, login: value }))
                }
                // onEndEditing={() => hideKeyboard()}
              />
              <TextInput
                style={styles.input}
                autoComplete="email"
                placeholder="Адрес электронной почты"
                placeholderTextColor="#bdbdbd"
                value={user.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, email: value }))
                }
                // onEndEditing={() => hideKeyboard()}
              />
              <TextInput
                style={styles.input}
                autoComplete="password"
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                secureTextEntry={true}
                value={user.password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, password: value }))
                }
                // onEndEditing={() => hideKeyboard()}
              />
            </KeyboardAvoidingView>
            <View style={{ marginBottom: isShowKeyboard ? -180 : 0 }}>
              <TouchableOpacity
                style={styles.buttonReg}
                activeOpacity={0.7}
                onPress={() => submitForm()}
              >
                <Text style={styles.btnTitleReg}>Зарегистрироваться </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonEnt}
                activeOpacity={0.7}
                onPress={() => submitForm()}
              >
                <Text style={styles.btnTitleEnt}>Уже есть аккаунт? Войти</Text>
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
    position: "relative",
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photoBox: {
    position: "absolute",
    top: -60,
    // left: "{dimensions}",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  textTitleForm: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 33,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
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
  },
  buttonReg: {
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    height: 51,
    marginTop: 27,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitleReg: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonEnt: {
    marginHorizontal: 16,
    // backgroundColor: "#FF6C00",
    height: 51,
    // marginBottom: 78,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitleEnt: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#1B4371",
    fontSize: 16,
  },
});

export default RegistrationScreen;
