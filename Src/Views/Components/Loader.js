import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import COLORS from "../../Conts/Color";

const Loader = ({ visible = false }) => {
    const {height, width} = useWindowDimensions();
    return (
        visible && (
          <View style={[styles.container, {height, width}]}>
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={COLORS.blue} />
              <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
            </View>
          </View>
        )
    );
    
};

const styles = StyleSheet.create({
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderTopStartRadius: 45,
        borderBottomEndRadius: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
      },
})

export default Loader;
