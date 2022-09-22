import React, {useContext} from 'react';
import styles from './Styles';
import { View, TouchableOpacity, Text} from "react-native";
import ICON from "react-native-vector-icons/MaterialIcons";
import { GlobalContext } from '../../../Context';


const ListItems = ({ item }) => {
  const COLORS = { primary: "#1f145c", white: "#fff" };
  const { markTodoAsCompleted, deleteTodo,} = useContext(GlobalContext);
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: COLORS.primary,
              textDecorationLine: item?.completed ? "line-through" : "none",
            }}
          >
            {item?.task}
          </Text>
        </View>
        {!item?.completed && (
          <TouchableOpacity
            onPress={() => markTodoAsCompleted(item?.id)}
          >
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: "green", marginRight: 15 },
              ]}
            >
              <ICON name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => deleteTodo(item?.id)}
        >
          <View style={styles.actionIcon}>
            <ICON name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
};
  
export default ListItems;