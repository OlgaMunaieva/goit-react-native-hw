import React, { useEffect, useRef, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormStyles as styles } from "./FormsStyles";

const initialUser = {
  email: "",
  password: "",
};

const LoginScreen = ({ register, dimensions }) => {
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
      <View
        style={[
          styles.form,
          styles.enterForm,
          dimensions.height < 600 ? styles.albumForm : null,
        ]}
      >
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

export default LoginScreen;
