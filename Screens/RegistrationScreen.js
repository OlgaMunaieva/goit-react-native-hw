import React, { useState } from "react";
import { Image, Keyboard, TouchableWithoutFeedback } from "react-native";
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
import { MaterialIcons, Fontisto } from "@expo/vector-icons";

const initialUser = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ dimensions, enter }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [isShowPhoto, setIsShowPhoto] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleFocusLogin = () => {
    setIsShowKeyboard(true);
    setIsFocusedLogin(true);
  };
  const handleBlurLogin = () => {
    // setIsShowKeyboard(false);
    setIsFocusedLogin(false);
  };

  const handleFocusEmail = () => {
    setIsShowKeyboard(true);
    setIsFocusedEmail(true);
  };
  const handleBlurEmail = () => {
    // setIsShowKeyboard(false);
    setIsFocusedEmail(false);
  };

  const handleFocusPass = () => {
    setIsShowKeyboard(true);
    setIsFocusedPass(true);
  };
  const handleBlurPass = () => {
    // setIsShowKeyboard(false);
    setIsFocusedPass(false);
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitForm = () => {
    console.log(user);
    setUser(initialUser);
  };

  // const hideKeyboardCompletedForm = () => {
  //   console.log(user.login & user.email & user.password);
  //   console.log(user.email);
  //   if ((user.login !== "") & (user.email !== "") & (user.password !== "")) {
  //     setIsShowKeyboard(false);
  //     Keyboard.dismiss();
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <ImageBackground
        source={require("../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
          <View style={styles.form}>
            {isShowPhoto ? (
              <View style={{ ...styles.photoBox, left: dimensions / 2 - 60 }}>
                <Image
                  style={styles.photo}
                  source={require("../assets/images/photo-test.jpg")}
                />
                <TouchableOpacity
                  style={styles.photoIcon}
                  onPress={() => setIsShowPhoto(false)}
                >
                  <Fontisto name="close" size={25} color="#e8e8e8" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ ...styles.photoBox, left: dimensions / 2 - 60 }}>
                <TouchableOpacity
                  style={styles.photoIcon}
                  onPress={() => setIsShowPhoto(true)}
                >
                  <MaterialIcons
                    name="add-circle-outline"
                    size={25}
                    color="#ff6c00"
                  />
                </TouchableOpacity>
              </View>
            )}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={styles.textTitleForm}>Регистрация</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocusedLogin ? styles.inputFocused : null,
                ]}
                autoComplete={"username" ?? "name"}
                placeholder="Логин"
                placeholderTextColor="#bdbdbd"
                value={user.login}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, login: value }))
                }
                onFocus={handleFocusLogin}
                onBlur={handleBlurLogin}
                // onEndEditing={() => hideKeyboardCompletedForm()}
              />
              <TextInput
                style={[
                  styles.input,
                  isFocusedEmail ? styles.inputFocused : null,
                ]}
                autoComplete="email"
                placeholder="Адрес электронной почты"
                placeholderTextColor="#bdbdbd"
                value={user.email}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
                // onEndEditing={() => hideKeyboardCompletedForm()}
              />
              <View style={styles.passwordBox}>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedPass ? styles.inputFocused : null,
                  ]}
                  autoComplete="password"
                  placeholder="Пароль"
                  placeholderTextColor="#bdbdbd"
                  secureTextEntry={showPass ? false : true}
                  value={user.password}
                  onChangeText={(value) =>
                    setUser((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={handleFocusPass}
                  onBlur={handleBlurPass}
                  // onEndEditing={() => hideKeyboardCompletedForm()}
                />
                <TouchableOpacity
                  style={styles.passwordBtn}
                  onPress={() => setShowPass(true)}
                >
                  <Text style={styles.btnTitleEnt}>Показать</Text>
                </TouchableOpacity>
              </View>
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
                onPress={() => enter()}
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
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  photo: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  photoIcon: {
    position: "absolute",
    top: 81,
    left: 107,
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
  inputFocused: {
    borderColor: "#FF6C00",
  },
  passwordBox: {
    position: "relative",
  },
  passwordBtn: {
    position: "absolute",
    top: 16,
    right: 32,
  },
  buttonContainer: {
    marginHorizontal: 16,
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
    height: 51,
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
