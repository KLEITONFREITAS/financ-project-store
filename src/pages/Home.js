import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, TouchableNativeFeedback, BackHandler, StatusBar } from 'react-native'
import { fontColor } from '../utils/shared'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Form from '../components/Form'

export default class Home extends Component {

  static navigationOptions = {
    header: null
  }

  initialState = {
    fontSizeLogo: new Animated.Value(36),
    logoPositionTop: new Animated.Value(280),
    hidden: new Animated.Value(1),
    show: new Animated.Value(0),
    
    
    widthButton: new Animated.Value(140),
    
    positionBuyOption: new Animated.Value(200),
    positionBillOption: new Animated.Value(220),
    positionRevenueOption: new Animated.Value(270),
    
    showBuyOption: new Animated.Value(0),
    showBillOption: new Animated.Value(0),
    showRevenueOption: new Animated.Value(0),

    enableForm: false,
  }

  state = {...this.initialState}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack()
      return true
    }) 
  }

  goBack() {
    Animated.timing(this.state.fontSizeLogo, { toValue: 36, duration: 500 }).start()
    Animated.timing(this.state.widthButton, { toValue: 150, duration: 500}).start()
    Animated.timing(this.state.logoPositionTop, { toValue: 280, duration: 500}).start()
    Animated.timing(this.state.hidden, { toValue: 1, duration: 200}).start()
    Animated.timing(this.state.show, { toValue: 0, duration: 100}).start()
    this._handleDisableOption()
  }

  _handleDisableOption() {
    Animated.parallel([
      Animated.timing(this.state.positionBuyOption, { toValue: 200, duration: 0}).start(),
      Animated.timing(this.state.positionBillOption, { toValue: 220, duration: 0}).start(),
      Animated.timing(this.state.positionRevenueOption, { toValue: 270, duration: 0}).start(),
      
      Animated.timing(this.state.showBuyOption, { toValue: 0, duration: 0}).start(),
      Animated.timing(this.state.showBillOption, { toValue: 0, duration: 0}).start(),
      Animated.timing(this.state.showRevenueOption, { toValue: 0, duration: 0}).start()
      
    ])
  }

  _handleEnableOption() {
    this._hiddenButton()
    Animated.parallel([
      Animated.timing(this.state.positionBuyOption, { toValue: 140, duration: 1000}).start(),
      Animated.timing(this.state.positionBillOption, { toValue: 200, duration: 1000, delay: 300}).start(),
      Animated.timing(this.state.positionRevenueOption, { toValue: 260, duration: 1000, delay: 800}).start(),
      
      Animated.timing(this.state.showBuyOption, { toValue: 1, duration: 1000}).start(),
      Animated.timing(this.state.showBillOption, { toValue: 1, duration: 1000, delay: 300}).start(),
      Animated.timing(this.state.showRevenueOption, { toValue: 1, duration: 1000, delay: 800}).start()
      
    ])
  }

  _handleRegister() {
    this._hiddenButton()
  }

  _hiddenButton() {
    Animated.timing(this.state.widthButton, { toValue: 350, duration: 500}).start()
    Animated.timing(this.state.logoPositionTop, { toValue: 30, duration: 500}).start()
    Animated.timing(this.state.fontSizeLogo, { toValue: 24, duration: 500 })
      .start(data => data.finished ? this.setState({enableForm: true}) : null)
    Animated.timing(this.state.hidden, { toValue: 0, duration: 200}).start(data => {
      if (data.finished) {
        Animated.timing(this.state.show, { toValue: 1, duration: 500}).start()
      }})
  }

  

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

        <Animated.Text style={[styles.logo, { fontSize: this.state.fontSizeLogo, top: this.state.logoPositionTop }]}>store.</Animated.Text>

        <TouchableNativeFeedback onPress={() => this._handleEnableOption()}>
          <Animated.View style={[styles.button, { width: this.state.widthButton, opacity: this.state.hidden,  }]}>
              <Text style={styles.labelButton}>registre</Text>
              <Icon name={'arrow-right'} size={14} color={'#fff'}></Icon>
          </Animated.View>
        </TouchableNativeFeedback>

        <Animated.View style={[styles.arrows, { opacity: this.state.hidden }]}>
          <Icon name={'chevron-left'} size={20} color={fontColor}></Icon>
            <TouchableNativeFeedback onPress={() => this._handleRegister()}>
              <Text style={styles.month}>FEVEREIRO / 19</Text>
            </TouchableNativeFeedback>
          <Icon name={'chevron-right'} size={20} color={fontColor}></Icon>
        </Animated.View>

        <Animated.View style={[styles.bottomBar, { opacity: this.state.hidden }]}></Animated.View>
        <Animated.View style={[styles.status, { opacity: this.state.hidden }]}>
            <Text style={styles.fontStatus}>existem 4 notificações de eventos pendentes</Text>
        </Animated.View>

        {this.state.enableForm && 
          <View style={[styles.options]}>
            <Animated.Text style={[styles.optionsBuy, 
              { opacity: this.state.showBuyOption, top: this.state.positionBuyOption } ]}>Compra</Animated.Text>
            <Animated.Text style={[styles.optionsBuy, 
              { opacity: this.state.showBillOption, top: this.state.positionBillOption } ]}>Pagamento</Animated.Text>
            <Animated.Text style={[styles.optionsBuy, 
              { opacity: this.state.showRevenueOption, top: this.state.positionRevenueOption } ]}>Receita</Animated.Text>
          </View>
        }
        


        {/* {this.state.enableForm && <Form opacityContent={this.state.opacityContent}></Form>} */}

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
  logo: {
    position: 'absolute',
    color: fontColor,
    fontSize: 36,
    fontFamily: 'sans-serif-light'
  },
  button: {
    position: 'absolute',
    top: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    height: 40,
    // width: 140,
    borderRadius: 20,
    borderWidth: 0.5,
    backgroundColor: '#000',
    // borderColor: '#fff',
    zIndex: 2
  },
  labelButton: {
    color: '#fff'
  },
  bottomItem: {
    alignItems: 'center',
    borderWidth: 0.5,
    height: 50
  },  
  bottomBar: {
    position: 'absolute',
    bottom: 55,
    height: 3,
    width: '30%',
    backgroundColor: '#C4C4C4',
    borderRadius: 5
  },
  status: {
    position: 'absolute',
    bottom: 20
  },
  fontStatus: {
    color: fontColor,
    fontFamily: 'sans-serif-light',
    fontSize: 14
  },
  arrows: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2
  },
  options: {
    justifyContent: 'center',
    height: '80%',
    width: '90%',
    // borderWidth: 0.5,
  },
  year: {
    fontFamily: 'sans-serif-light',
    color: fontColor,
    fontSize: 14
  },
  month: {
    fontFamily: 'sans-serif-light',
    fontSize: 14,
    color: fontColor
  },
  choiceMonth: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsBuy: {
    fontFamily: 'sans-serif-light',
    fontSize: 48,
    position: 'absolute'
  },
  
})