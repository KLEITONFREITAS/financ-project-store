import React, { Component } from 'react'
import { Animated, View, Text, TextInput, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { fontColor, fontColor2, backgroundColor } from '../utils/shared'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default class Form extends Component {
  
  state = {
    firstQuestion: new Animated.Value(0),
    secondQuestion: new Animated.Value(350),
  }

  _handleSelectSecondQuestion() {
    Animated.timing(this.state.firstQuestion, {toValue: -400, duration: 200}).start()
    Animated.timing(this.state.secondQuestion, {toValue: 0, duration: 200}).start()
  }


  render() {
    return (
      <Animated.View style={[styles.content, { opacity: this.props.opacityContent }]}>
        
        <Animated.View style={[styles.second, { left: this.state.firstQuestion }]}>
          <Text style={styles.labelField}>Título.</Text>
          <Text style={styles.descField}>qual a descrição deste registro?</Text>
          <View style={styles.inputField}>
            <TextInput style={styles.field} underlineColorAndroid={'transparent'} autoFocus={true}></TextInput>
          </View>
        </Animated.View>
        
        
        <Animated.View style={[styles.second, { left: this.state.secondQuestion }]}>
          <Text style={styles.labelField}>Valor.</Text>
          <Text style={styles.descField}>qual o valor deste registro?</Text>
          <View style={styles.inputField}>
            <TextInput style={styles.field} underlineColorAndroid={'transparent'} autoFocus={true}></TextInput>
          </View>
        </Animated.View>

        
        <TouchableNativeFeedback onPress={() => this._handleSelectSecondQuestion()}>
          <View style={styles.buttonNext}>
            <Icon name={'arrow-right'} size={30} color={backgroundColor}></Icon>
          </View>
        </TouchableNativeFeedback>

      </Animated.View>

      
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 40,
    paddingTop: 80,
    marginBottom: 20,
    width: '90%',
    height: '80%',
    zIndex: 1
  },
  labelField: {
    fontSize: 36,
    color: fontColor,
    fontFamily: 'sans-serif-light'
  },
  descField: {
    fontSize: 20,
    color: fontColor2,
    fontFamily: 'sans-serif-light'
  },
  inputField: {
    width: '80%',
    
  },
  field: {
    marginTop: 20,
    fontSize: 26,
    color: '#fff',
    fontFamily: 'sans-serif-light'
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
  second: {
    position: 'absolute',
    // left: 350,
    top: 80,
    
  }
})