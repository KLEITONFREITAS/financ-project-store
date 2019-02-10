import React, { Component } from 'react'
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native'

export default class Options extends Component {

  render() {
    return (
      <View style={styles.options}>
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('compra')}>
          <Animated.Text style={[styles.buttonOption, { opacity: this.props.showBuyOption, top: this.props.positionBuyOption } ]}>Compra</Animated.Text>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('pagamento')}>
          <Animated.Text style={[styles.buttonOption, { opacity: this.props.showBillOption, top: this.props.positionBillOption } ]}>Pagamento</Animated.Text>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => this.props.handleOpenRegister('receita')}>
          <Animated.Text style={[styles.buttonOption, { opacity: this.props.showRevenueOption, top: this.props.positionRevenueOption } ]}>Receita</Animated.Text>
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
  buttonOption: {
    position: 'absolute',
    left: 20,
    fontFamily: 'sans-serif-light',
    fontSize: 48,
  },
})