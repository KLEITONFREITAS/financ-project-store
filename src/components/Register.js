import React, { Component } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, StyleSheet, Animated, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundColor, fontColor, label } from '../utils/shared'
import Keyboard from '../components/Keyboard'



export default class Register extends Component {

  lastDay = null

  state = {
    firstQuestion: true,
    secondQuestion: false,
    thirdQuestion: false,
    showVirtualKeyboard: false,
    desc: '',
    value: 0,
    positionDesc: new Animated.Value(0),
    due: 0,
    due0: null,
    due1: null
    
  }

  componentDidMount() {
    const today = new Date()
    this.lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  }  

  handleSelectSecondQuestion() {
    this.setState({firstQuestion: false, secondQuestion: true, showVirtualKeyboard: true })
    this.animationDescription()
  }

  animationDescription() {
    Animated.timing(this.state.positionDesc, {toValue: 1, duration: 1000}).start()
  }

  handleReturnKeyPress(value) {

    if (this.state.secondQuestion) {
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

    if (this.state.thirdQuestion) {
      if (value == 'backspace') {
        if (this.state.due1) this.setState({ due1: null })
        if (!this.state.due1) this.setState({ due0: null })
      } else {
        if (this.state.due0 && this.state.due1) {
          this.setState({ due: null, due0: null, due1: null })
        } else {
          if (!this.state.due0) {
            this.setState({ due0: value, due: this.state.due0 })
          } else {
            this.setState({ due1: this.state.due0, due0: value, due : this.state.due0 + '' + value }, () => {
              if (parseInt(this.state.due) > this.lastDay.getDate()) {
                this.setState({ due: null, due0: null, due1: null })
                ToastAndroid.show('Data invalida', ToastAndroid.SHORT)
              }
            })
          }
        }
      }
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
              // placeholder={'descrição'} 
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
              <Text>{this.state.due}</Text>
              <View style={styles.dataField}>
                <View style={styles.dateFieldValue}>
                  <Text style={styles.dateInputValue}>{this.state.due1}</Text>
                </View>
                <View style={styles.dateFieldValue}>
                  <Text style={styles.dateInputValue}>{this.state.due0}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 80,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(237, 237, 237, 0.3)'
  },
  dateInputValue: {
    fontSize: 64
  },
  input: {
    marginTop: 30,
    // textAlign: 'center',
    fontSize: 32,
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