import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Text, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get('window')


export default class Keyboard extends Component {

  keyboardValueTouch() {
  
  }

  render() {
    return (
      <View style={styles.keyboard}>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
          <View style={styles.key}>
            <Text style={styles.fontKey}>1</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>2</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>3</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>4</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>5</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>6</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>7</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>8</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>9</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>0</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Icon name={'backspace'} size={32} color={'#000'} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.keyboardValueTouch(1)}>
        <View style={styles.key}>
            <Text style={styles.fontKey}>Ok</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  keyboard: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    height: '50%',
  },
  key: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '25%',
    width: (width-40)/3,
  },
  fontKey: {
    fontSize: 32
  }
})