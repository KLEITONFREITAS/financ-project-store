import React, { Component } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundColor, fontColor, label } from '../utils/shared'
import Keyboard from '../components/Keyboard'



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

  render() {
      return (
        <View style={styles.register}>

          <TouchableWithoutFeedback onPress={() => this.props.handleBackToOptions()}>
            <Icon style={styles.close} name={'window-close'} size={22} color={'#000'}/>
          </TouchableWithoutFeedback>

          {this.state.firstQuestion &&
          <View style={styles.firstQuestion}>
            <Text style={styles.labelDesc}>{label.desc}</Text> 
            <TextInput style={styles.input} 
              placeholder={'descrição'} 
              value={this.state.desc}
              autoFocus={true}
              onChangeText={desc => this.setState({ desc })}>
            </TextInput>
          </View>
          }

          {this.state.secondQuestion && 
          this.showInputValue()
          }

          {this.state.showVirtualKeyboard && <Keyboard></Keyboard>}
  
          {!this.state.showVirtualKeyboard && 
          <TouchableWithoutFeedback onPress={() => this.handleSelectSecondQuestion()}>
            <View style={styles.buttonNext}>
              { !this.state.desc ? 
                <Icon name={'microphone'} size={22} color={backgroundColor} /> :
                <Icon name={'arrow-right'} size={22} color={backgroundColor} />
              }
            </View>
          </TouchableWithoutFeedback>
          }

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
  },
  labelDesc: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  firstQuestion: {
    width: '90%'
  },
  input: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'sans-serif-light',
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
  }
})