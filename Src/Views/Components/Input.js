import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import COLORS from "../../Conts/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: "center",
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: "#000", fontSize: 25, marginRight: 10 }}
        />
        <TextInput
          {...props}
          style={{ color: "#000", flex: 1, fontSize: 18 }}
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {password && (
          <Icon
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            onPress={() => setHidePassword(!hidePassword)}
            style={{ color: "#000", fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 14 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: "#000",
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.grey,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
  },
});

export default Input;
