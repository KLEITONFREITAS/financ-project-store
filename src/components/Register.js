import React, { Component } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, StyleSheet  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundColor, fontColor } from '../utils/shared'

export default class Register extends Component {

  state = {
    firstQuestion: true,
    secondQuestion: false,
    showVirtualKeyboard: false,
    desc: '',
    value: 0
  }

  handleSelectSecondQuestion() {
    this.setState({firstQuestion: false, secondQuestion: true, showVirtualKeyboard: true })
  }

  setValue(value) {
    this.setState({value : this.convertInputToCurrency(value = this.keyboardValueTouch(

      
    ))})
  }

  convertInputToCurrency = value => {
    value = Array.from(value)
    value = value.filter(char => char !== ',')
    
    if (value.length == 2) {
      value.splice(0, 0, "0,") 
    } else {
      if (value.length >= 3) {
        if (value[0] == '0') value.splice(0, 1)
        value.splice(value.length - 2, 0, ",")  
      }
    }
    return value.join('')
  }

  showInputValue() {
    return (
      <View style={styles.valueArea}>
        <Text style={styles.labelValue}>Qual o valor?</Text>
        <Text style={styles.inputValue}>{this.state.value}</Text>
      </View>
    )
  }

  keyboardValueTouch(value) {
    return value
  }

  showVirtualKeyboard() {
    return (
      <View style={styles.keyboard}>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
          <Text>1</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }


  render() {
      return (
        <View style={styles.register}>

          <TouchableWithoutFeedback onPress={() => this.props.handleBackToOptions()}>
            <Icon style={styles.close} name={'window-close'} size={22} color={'#000'}/>
          </TouchableWithoutFeedback>

          {this.state.firstQuestion && 
            <TextInput style={styles.input} 
              placeholder={`Como você deseja chamar esta ${this.props.type}?`} 
              value={this.state.desc} 
              onChangeText={desc => this.setState({ desc })}>
            </TextInput>
          }

          {this.state.secondQuestion && 
          this.showInputValue()
          }

          {this.state.showVirtualKeyboard && 
          this.showVirtualKeyboard()}
  
          <TouchableWithoutFeedback onPress={() => this.handleSelectSecondQuestion()}>
            <View style={styles.buttonNext}>
              { !this.state.desc ? 
                <Icon name={'microphone'} size={22} color={backgroundColor} /> :
                <Icon name={'arrow-right'} size={22} color={backgroundColor} />
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // zIndex: 3
  },
  input: {
    // position: 'absolute',
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
  close: {
    position: 'absolute',
    top: 35,
    left: 20
  },
  valueArea: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    top: 0,
  },
  labelValue: {
    position: 'absolute',
    top: 180,
    left: 20,
    fontFamily: 'sans-serif-light',
    fontSize: 32,
  },
  inputValue: {
    position: 'absolute',
    top: 250,
    left: 20,
    fontFamily: 'sans-serif-light',
    fontSize: 64,
  },
  keyboard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'orange'
  }
})