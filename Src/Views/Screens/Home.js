import { View, Image, Text } from "react-native";
import React from "react";

import TodoApp from "./TodoApp";

const Home = ({ navigation }) => {

  return (
    <View style={{
        flex: 1,
        backgroundColor: 'white',
    }}>
      <TodoApp />
    </View>
  );
};

export default Home;
