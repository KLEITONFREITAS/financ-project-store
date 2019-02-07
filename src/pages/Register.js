import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, BackHandler } from 'react-native'

export default class Register extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'none',
      marginTop: 40,
      marginLeft: 0
    },
    headerTintColor: '#000',
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

        <Text>Register</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})