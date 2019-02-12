import React, { Component } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundColor, fontColor, label } from '../utils/shared'
import Keyboard from '../components/Keyboard'



export default class Register extends Component {

  state = {
    firstQuestion: true,
    secondQuestion: false,
    thirdQuestion: false,
    showVirtualKeyboard: false,
    desc: '',
    value: 0,
    positionDesc: new Animated.Value(0)
  }

  handleSelectSecondQuestion() {
    this.setState({firstQuestion: false, secondQuestion: true, showVirtualKeyboard: true })
    this.animationDescription()
  }

  animationDescription() {
    Animated.timing(this.state.positionDesc, {toValue: 1, duration: 1000}).start()
  }

  handleReturnKeyPress(value) {
    if (value == 'ok' && this.state.value.length != 0) {
      this.setState({ secondQuestion: false, thirdQuestion: true })
    } else {

      if (value == 'backspace') {
        value = Array.from(this.state.value)
        this.setState({value: value.pop()})
      } else {
        value = this.state.value + value
      } 
    
    this.setState({value : this.convertInputToCurrency(value.toString())})
    }
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

          {/* Segunda questão */}

          {this.state.secondQuestion && 
            <View style={styles.valueArea}>
              <Text style={styles.labelValue}>VALOR</Text>
              <Text style={styles.inputValue}><Text style={styles.currency}>$</Text>{this.state.value}</Text>
            </View>
          }

          {this.state.thirdQuestion && 
            <View style={styles.valueArea}>
              <Text style={styles.labelValue}>VENCIMENTO</Text>
              <View style={styles.dataField}>
                <View style={styles.dateFieldValue}>
                  <Text style={styles.dateInputValue}></Text>
                </View>
                <View style={styles.dateFieldValue}>
                  <Text style={styles.dateInputValue}></Text>
                </View>
              </View>
            </View>
          }

          {this.state.showVirtualKeyboard && <Keyboard handleReturnKeyPress={this.handleReturnKeyPress.bind(this)}></Keyboard>}
  
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
  desc: {
    marginTop: 5,
    marginBottom: 25,
    fontSize: 18,
  },
  firstQuestion: {
    width: '90%'
  },
  dataField: {
    flexDirection: 'row'
  },
  dateFieldValue: {
    height: 120,
    width: 80,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  dateInputValue: {
    fontSize: 64
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
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width: '100%',
  },
  labelValue: {
    fontFamily: 'sans-serif-light',
    fontSize: 16,
  },
  inputValue: {
    fontFamily: 'sans-serif-light',
    fontSize: 64,
    marginBottom: 10
  },
  currency: {
    fontSize: 32
  }
})