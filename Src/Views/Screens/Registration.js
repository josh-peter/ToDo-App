import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import COLORS from "../../Conts/Color";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Loader from "../Components/Loader";
import Images from "../Components/Images";

const Registration = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("users", jsonValue);
    } catch (e) {
      Alert.alert("Error saving user");
    }
  };

  const register = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        storeData(inputs);
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 2000);
  };


  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={styles.register}>
      <Images/>
      <Loader visible={isLoading} />
      <ScrollView style={{ paddingTop: 50, paddingHorizontal: 20,}}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: "#000", fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            label={"Email"}
            iconName="email-outline"
            placeholder="Enter your email address"
            keyboardType="email-address"
            onChangeText={(text) => handleOnchange(text, "email")}
            error={errors.email}
            onFocus={() => handleError("", "email")}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "fullname")}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
            onFocus={() => handleError("", "fullname")}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "phone")}
            keyboardType="numeric"
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
            onFocus={() => handleError("", "phone")}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            label={"Password"}
            iconName="lock-outline"
            placeholder="Enter your password"
            password
            error={errors.password}
            onFocus={() => handleError("", "password")}
          />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
