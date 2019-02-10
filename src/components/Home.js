import React, { Component } from 'react'
import { Text, View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { fontColor } from '../utils/shared'


export default class Home extends Component {
  render() {
    return (
      <View style={styles.home}>
        <TouchableWithoutFeedback onPress={() => this.props.handleEnableOption()}>
          <Animated.View style={[styles.button, { width: this.props.widthButton, opacity: this.props.hidden }]}>
            <Text style={styles.labelButton}>registre</Text>
            <Icon name={'arrow-right'} size={14} color={'#fff'}></Icon>
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.arrows, { opacity: this.props.hidden }]}>
          <Icon name={'chevron-left'} size={20} color={fontColor}></Icon>
          <TouchableWithoutFeedback onPress={() => this.props.handleListAllByMonth()}>
            <Text style={styles.month}>FEVEREIRO / 19</Text>
          </TouchableWithoutFeedback>
          <Icon name={'chevron-right'} size={20} color={fontColor}></Icon>
        </Animated.View>

        <Animated.View style={[styles.bottomBar, { opacity: this.props.hidden }]}></Animated.View>
        <Animated.View style={[styles.status, { opacity: this.props.hidden }]}>
          <Text style={styles.fontStatus}>existem 4 notificações de eventos pendentes</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  
  button: {
    position: 'absolute',
    top: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    zIndex: 2
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
  month: {
    fontFamily: 'sans-serif-light',
    fontSize: 14,
    color: fontColor,
    padding: 10
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
  },
  fontStatus: {
    color: fontColor,
    fontFamily: 'sans-serif-light',
    fontSize: 14
  },
  labelButton: {
    color: '#fff'
  },
})