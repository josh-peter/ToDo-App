import { StyleSheet, Text, View, Image, BackgroundImage } from 'react-native'
import React from 'react'

const Images = () => {
  return (
    <View style={styles.container}>
      <Image source={require('././../../../assets/todo.jpg')} style={{
        width: '100%',
        height: 330,
        resizeMode: 'cover',
        }} />
    </View>
  )
}

export default Images

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: 'center',
  },
})