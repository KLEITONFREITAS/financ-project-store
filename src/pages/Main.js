import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, BackHandler, StatusBar, ToastAndroid } from 'react-native'
import { fontColor, position } from '../utils/shared'
import Options from '../components/Options'
import Register from '../components/Register'
import Home from '../components/Home'

export default class Main extends Component {

  static navigationOptions = {
    header: null
  }

  initialState = {
    fontSizeLogo: new Animated.Value(36),
    logoPositionTop: new Animated.Value(280),
    hidden: new Animated.Value(1),
    show: new Animated.Value(0),
    
    widthButton: new Animated.Value(140),
    
    positionBuyOption: new Animated.Value(position.buyInitial),
    positionBillOption: new Animated.Value(position.billInitial),
    positionRevenueOption: new Animated.Value(position.revenueInitial),
    
    showBuyOption: new Animated.Value(0),
    showBillOption: new Animated.Value(0),
    showRevenueOption: new Animated.Value(0),
      
    enableHome: true,
    enableList: false,
    enableRegister: false,
    enableOptions: false,
    type: null,
    desc: ''
  }

  state = {...this.initialState}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
       this.goBack()
       return true
    }) 
  }
  
  goBack() {
    Animated.parallel([
      Animated.timing(this.state.fontSizeLogo, { toValue: 36, duration: 500 }).start(),
      Animated.timing(this.state.widthButton, { toValue: 150, duration: 500 }).start(),
      Animated.timing(this.state.logoPositionTop, { toValue: 280, duration: 500}).start(),
      Animated.timing(this.state.hidden, { toValue: 1, duration: 500}).start(),
      Animated.timing(this.state.show, { toValue: 0, duration: 100}).start(),
    ])
    this.animationCloseOptions()
    this.setState({ enableList: false })
    this.setState({ enableRegister: false })
    this.setState({ enableOptions: false })
    this.setState({ enableHome: true })
  }

  _hiddenButton() {
    return new Promise(resolve => {
      Animated.parallel([
        Animated.timing(this.state.widthButton, { toValue: 350, duration: 500}).start(),
        Animated.timing(this.state.logoPositionTop, { toValue: 30, duration: 500}).start(),
        Animated.timing(this.state.fontSizeLogo, { toValue: 24, duration: 500 }).start(),
        Animated.timing(this.state.hidden, { toValue: 0, duration: 200}).start(data => data.finished && resolve(true))
      ])
    })
  }

  animationCloseOptions() {
    Animated.parallel([
      Animated.timing(this.state.positionBuyOption, { toValue: position.buyInitial, duration: 0}).start(),
      Animated.timing(this.state.positionBillOption, { toValue: position.billInitial, duration: 0}).start(),
      Animated.timing(this.state.positionRevenueOption, { toValue: position.revenueInitial, duration: 0}).start(),
      Animated.timing(this.state.showBuyOption, { toValue: 0, duration: 0}).start(),
      Animated.timing(this.state.showBillOption, { toValue: 0, duration: 0}).start(),
      Animated.timing(this.state.showRevenueOption, { toValue: 0, duration: 0}).start()
    ])
  }

  animationOpenOptions() {
    Animated.parallel([
      Animated.timing(this.state.positionBuyOption, { toValue: position.buyLast, duration: 1000}).start(),
      Animated.timing(this.state.positionBillOption, { toValue: position.billLast, duration: 1000, delay: 300}).start(),
      Animated.timing(this.state.positionRevenueOption, { toValue: position.revenueLast, duration: 1000, delay: 800}).start(),
      Animated.timing(this.state.showBuyOption, { toValue: 1, duration: 1000}).start(),
      Animated.timing(this.state.showBillOption, { toValue: 1, duration: 1000, delay: 300}).start(),
      Animated.timing(this.state.showRevenueOption, { toValue: 1, duration: 1000, delay: 800}).start()
    ])
  }

  handleEnableOption() {
    this.animationOpenOptions()
    this._hiddenButton().then(res => res && this.setState({ enableHome: false, enableOptions: true }))
  }

  handleListAllByMonth() {
    this._hiddenButton()
    this.setState({ enableHome: false })
    this.setState({ enableList: true })
  }

  handleOpenRegister(type) {
    this.animationCloseOptions()
    this.setState({ type })
    this.setState({ enableRegister: true })
    this.setState({ enableOptions: false })
    this.setState({ enableHome: false })
  }

  handleBackToOptions() {
    this.setState({ enableRegister: false })
    this.setState({ enableOptions: true })
    this.animationOpenOptions()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content" />

        <Animated.Text style={[styles.logo, { fontSize: this.state.fontSizeLogo, top: this.state.logoPositionTop }]}>store.</Animated.Text>

        {this.state.enableHome && <Home 
          widthButton={this.state.widthButton}
          hidden={this.state.hidden}
          handleEnableOption={this.handleEnableOption.bind(this)}
          handleListAllByMonth={this.handleListAllByMonth.bind(this)}
        />}

        {this.state.enableOptions && 
          <Options 
            handleOpenRegister={this.handleOpenRegister.bind(this)}
            showBuyOption={this.state.showBuyOption} 
            showBillOption={this.state.showBillOption} 
            showRevenueOption={this.state.showRevenueOption} 
            positionBuyOption={this.state.positionBuyOption} 
            positionBillOption={this.state.positionBillOption}
            positionRevenueOption={this.state.positionRevenueOption} />
        }

        { this.state.enableList && 
          <View style={styles.financArea}>
            <View style={[styles.descFinanc, styles.descFinancType1]}>
              <Text style={styles.financLabel}>Nubank</Text>
              <Text style={styles.financLabel}>R$ 1058,33</Text>
            </View>
            <View style={[styles.descFinanc, styles.descFinancType2]}>
              <View>
                <Text style={[styles.financLabel, styles.financLabelType2]}>Nubank</Text>
                <Text style={[styles.financLabel, styles.financLabelType2]}>Alimentação</Text>
              </View>
              <Text style={[styles.financLabel, styles.financLabelType2]}>R$ 1058,33</Text>
            </View>
          </View>
        }

        { this.state.enableRegister &&
          <Register 
            type={this.state.type}
            desc={this.state.desc} 
            handleBackToOptions={this.handleBackToOptions.bind(this)} />
        }

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
  

// styles da lista de registros
  financArea: {
    flex: 1,
    marginLeft: 40,
  },
  descFinanc: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  descFinancType1: {
    marginRight: 65,
    backgroundColor: '#355434'
  },
  descFinancType2: {
    marginRight: 20,
    backgroundColor: '#B3A525'
  },
  financLabel: {
    fontFamily: 'sans-serif-light',
    color: fontColor,
    fontSize: 16,
  }
})