import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialUser = {
  email: "",
  password: "",
};

const LoginScreen = ({ register }) => {
  const inputs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShowKeyboard(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShowKeyboard(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleNextInput = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex > inputs.current.length) {
      return;
    } else {
      if (inputs.current[nextIndex]) {
        inputs.current[nextIndex].focus();
        setActiveIndex(nextIndex);
        setIsShowKeyboard(true);
      } else {
        setActiveIndex(0);
        setIsShowKeyboard(true);
      }
    }
  };

  const handleTextInputRef = (input, index) => {
    inputs.current[index] = input;
  };

  const submitForm = () => {
    console.log(user);
    setUser(initialUser);
  };

  const hideKeyboardCompletedForm = () => {
    if ((user.email !== "") & (user.password !== "")) {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.form}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.textTitleForm}>Войти</Text>
          <TextInput
            style={[styles.input, isFocusedEmail ? styles.inputFocused : null]}
            autoComplete="email"
            placeholder="Адрес электронной почты"
            placeholderTextColor="#bdbdbd"
            value={user.email}
            onChangeText={(value) =>
              setUser((prevState) => ({ ...prevState, email: value }))
            }
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
            onEndEditing={() => hideKeyboardCompletedForm()}
            ref={(input) => handleTextInputRef(input, 0)}
            onSubmitEditing={handleNextInput}
            returnKeyType="next"
          />
          <View style={styles.passwordBox}>
            <TextInput
              style={[styles.input, isFocusedPass ? styles.inputFocused : null]}
              autoComplete="password"
              placeholder="Пароль"
              placeholderTextColor="#bdbdbd"
              secureTextEntry={showPass ? false : true}
              value={user.password}
              onChangeText={(value) =>
                setUser((prevState) => ({ ...prevState, password: value }))
              }
              onFocus={() => setIsFocusedPass(true)}
              onBlur={() => setIsFocusedPass(false)}
              onEndEditing={() => hideKeyboardCompletedForm()}
              ref={(input) => handleTextInputRef(input, inputs.current.length)}
              onSubmitEditing={handleNextInput}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.passwordBtn}
              onPressIn={() => setShowPass(true)}
              onPressOut={() => setShowPass(false)}
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
            <Text style={styles.btnTitleReg}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonEnt}
            activeOpacity={0.7}
            onPress={() => register()}
          >
            <Text style={styles.btnTitleEnt}>
              Нет аккаунта? Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    position: "relative",
    paddingTop: 32,
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

export default LoginScreen;
