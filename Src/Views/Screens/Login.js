import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import COLORS from "../../Conts/Color";
import Loader from "../Components/Loader";
import Input from "../Components/Input";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState([]);



  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      logins();
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("users");
      if (value !== null) {
        // We have data!!
        return setUserInfo(JSON.parse(value));
        // return value;
      }
    } catch (e) {
      Alert.alert("Error Getting Users");
    }
  };

    getData();

    useEffect(() => {
        if (userInfo.length > 0) {
            navigation.navigate("Home", { userInfo });
        }
    } , [userInfo]);


  const logins = async () => {
    setIsLoading(true);
    if (
      inputs.email === userInfo.email &&
      inputs.password === userInfo.password
    ) {
      setIsLoading(false);
      navigation.navigate("Home");
    } else {
      setIsLoading(false);
      Alert.alert("Invalid Email or Password");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={isLoading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />
          <Input
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            password
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Registration")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
