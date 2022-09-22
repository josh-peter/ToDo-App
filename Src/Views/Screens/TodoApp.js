import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  BackgroundImage
} from "react-native";
import React, { useContext } from "react";
import ICON from "react-native-vector-icons/MaterialIcons";
import styles from "../Components/Styles";
import ListItems from "../Components/ListItem";
import { GlobalContext } from "../../../Context";

const TodoApp = () => {
    const COLORS = { primary: "#1f145c", white: "#fff" };

    const { todos,setTasks, addTodo, clearTodo } = useContext(GlobalContext);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.primary,
          }}
        >
          TODO APP
        </Text>
              <TouchableOpacity style={styles.icon}
                onPress={() => clearTodo()}
              >
          <ICON name="delete" size={25} color="red" />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItems item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Todo"
            fontSize={17}
            onChangeText={(text) => setTasks(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <ICON name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TodoApp;
