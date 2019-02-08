import React, { Component } from 'react'
import { View, TextInput, StyleSheet, StatusBar, Text, TouchableNativeFeedback } from 'react-native'
import { fontColor, backgroundColor } from '../utils/shared'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Register extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'none',
      marginTop: 40,
      marginLeft: 0
    },
    headerTintColor: '#000',
  }

  exemplos = [{ desc: 'Celpe' }, { desc: 'Nubank' }, { desc: 'Master' }]


  state = {
    desc: ''
  }

  render() {

    const { navigation } = this.props;
    const type = navigation.getParam('type')

    return (
      <View style={styles.container}>

        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

        <TextInput style={styles.input} placeholder={`Como você deseja chamar esta ${type}?`} value={this.state.desc} onChangeText={text => this.setState({desc: text})}></TextInput>

        <TouchableNativeFeedback onPress={() => this._handleSelectSecondQuestion()}>
          <View style={styles.buttonNext}>
            {/* <Icon name={'arrow-right'} size={30} color={backgroundColor}></Icon> */}
            { !this.state.desc ? 
            <Icon name={'microphone'} size={22} color={backgroundColor} /> :
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name={'arrow-right'} size={22} color={backgroundColor} />
            </TouchableNativeFeedback>
             }
            
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    position: 'absolute',
    left: 60,
    fontSize: 18,
    fontFamily: 'sans-serif-light',
    borderBottomWidth: 1,
    borderBottomColor: 'green',

  },
  buttonNext: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: fontColor
  },
})