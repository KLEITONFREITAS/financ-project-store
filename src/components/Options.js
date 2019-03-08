import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default class Options extends Component {

  state = {
    bottomBtn01: 340,
    bottomBtn02: 180,
    bottomBtn03: 20,
  }
  
  render() {
    return (
      <View style={styles.options}>
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('compra')}>
          <Animated.View style={[styles.buttonOption, { opacity: this.props.showBuyOption, bottom: this.state.bottomBtn01 } ]}>
            <View style={styles.optionLogo}></View>
            <View style={styles.optionLabel}>
              <Text style={styles.optionTitle}>COMPRA</Text>
              <Text style={styles.optionDesc}>compras a vista, débito, cartão...</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('pagamento')}>
          <Animated.View style={[styles.buttonOption, { opacity: this.props.showBillOption, bottom: this.state.bottomBtn02 } ]}>
            <View style={styles.optionLogo}></View>
            <View style={styles.optionLabel}>
              <Text style={styles.optionTitle}>CONTAS</Text>
              <Text style={styles.optionDesc}>fatura do cartão, conta de luz, faculdade...</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('receita')}>
          <Animated.View style={[styles.buttonOption, { opacity: this.props.showRevenueOption, bottom: this.state.bottomBtn03 } ]}>
            <View style={styles.optionLogo}></View>
            <View style={styles.optionLabel}>
              <Text style={styles.optionTitle}>RECEITAS</Text>
              <Text style={styles.optionDesc}>salário, pensão, freelancer...</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  optionLogo: {
    flex: 3,
  },
  optionLabel: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 4,
  },
  optionTitle: {
    fontSize: 24,
    // color: 'orange',
    marginBottom: 2,
  },
  optionDesc: {
    fontFamily: 'sans-serif-light',
    fontSize: 14,
    // color: 'orange'
  },
  buttonOption: {
    position: 'absolute',
    flexDirection: 'row',
    width: width - 40,
    height: 140,
    left: 20,
    fontFamily: 'sans-serif-light',
    fontSize: 48,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
  }
})