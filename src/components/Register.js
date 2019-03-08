import React, { Component } from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, StyleSheet, Animated, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundColor, fontColor, label } from '../utils/shared'
import Keyboard from '../components/Keyboard'
import moment from 'moment'


export default class Register extends Component {

  lastDay = null

  state = {
    firstQuestion: true,
    secondQuestion: false,
    thirdQuestion: false,
    resume: false,
    showVirtualKeyboard: false,

    desc: '',
    type: '',
    value: 0,
    due: '',
    
    dueDay: 0,
    due0: null,
    due1: null
    
  }

  componentDidMount() {
    this.setState({ type: this.props.type })
    const today = new Date()
    this.lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  }  

  handleSelectSecondQuestion() {
    this.setState({firstQuestion: false, secondQuestion: true, showVirtualKeyboard: true })
    
  }

  handleReturnKeyPress(value) {

    if (this.state.secondQuestion) {
      if (value == 'ok') {
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
      if (value == 'ok') {
        this.setState({ thirdQuestion: false, resume: true, showVirtualKeyboard: false })

        let data = new Date()
        data.setDate(this.state.dueDay)
        this.setState({ due: data })
      }

      if (value == 'backspace') {
        if (this.state.due1) this.setState({ due1: null })
        if (!this.state.due1) this.setState({ due0: null })
      } else {
        if (this.state.due0 && this.state.due1) {
          this.setState({ dueDay: null, due0: null, due1: null })
        } else {
          if (!this.state.due0) {
            this.setState({ due0: value, dueDay: this.state.due0 })
          } else {
            this.setState({ due1: this.state.due0, due0: value, dueDay : this.state.due0 + '' + value }, () => {
              if (parseInt(this.state.dueDay) > this.lastDay.getDate()) {
                this.setState({ dueDay: null, due0: null, due1: null })
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
            <Text style={styles.labelDesc}>{this.state.type}</Text> 
            <TextInput style={styles.input} 
              placeholder={'Descrição'}
              placeholderTextColor={'rgba(237, 237, 237, 0.8)'}
              value={this.state.desc}
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

          {/* Terceira questão */}
          
          {this.state.thirdQuestion && 
            <View style={styles.valueArea}>
              <Text style={styles.labelValue}>VENCIMENTO</Text>
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

          {this.state.resume && 
            <View style={styles.resume}>
              <Text style={styles.title}>Resumo</Text>
              <Text style={styles.ResumeDesc}>{this.state.desc}</Text>
              <Text style={styles.ResumeValue}>${this.state.value}</Text>
              <Text style={styles.ResumeDue}>{moment(this.state.due).format("MMMM D, YYYY")}</Text>
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
    // color: 'rgb(237, 237, 237)',
    fontSize: 64,
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
  },


// tela de resume

  resume: {
    position: 'absolute',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    margin: 20,
  },
  ResumeDesc: {
    fontWeight: 'bold',
    fontSize: 64,
    marginBottom: 10
  },
  ResumeValue: {
    fontWeight: 'bold',
    fontSize: 64,
    marginBottom: 10
  },
  ResumeDue: {
    fontWeight: 'bold',
    fontSize: 64,
    marginBottom: 10
  }

})