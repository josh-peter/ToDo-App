import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon: {
      padding: 10,
      backgroundColor: "#eee",
      borderRadius: 30,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#fff",
    },
    inputContainer: {
      height: 60,
      paddingHorizontal: 20,
      elevation: 40,
      backgroundColor: "white",
      flex: 1,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 30,
      flexDirection: "row",
      fontSize: 30,
    },
    iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: "#1f145c",
      elevation: 40,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    listItem: {
      padding: 20,
      backgroundColor: "#fff",
      flexDirection: "row",
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10,
    },
    actionIcon: {
      height: 35,
      width: 35,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      marginLeft: 5,
      borderRadius: 30,
    },
  });

    export default styles;