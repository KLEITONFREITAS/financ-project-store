import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Home extends Component {

    static navigationOptions = {
        header: null
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>store.</Text>

                <View style={styles.button}>
                    <Text style={styles.labelButton}>registre</Text>
                    <Icon name={'arrow-right'} size={14} color={'#fff'}></Icon>
                </View>

                    
                    <View style={styles.arrows}>
                        <Icon name={'chevron-up'} size={20} color={'#fff'}></Icon>
                        <Text style={styles.month}>Fevereiro/19</Text>
                        <Icon name={'chevron-down'} size={20} color={'#fff'}></Icon>
                    </View>
            

                    <View style={styles.bottomBar}></View>
                    <View style={styles.status}>
                        <Text style={styles.fontStatus}>existem 4 notificações de eventos pendentes</Text>
                    </View>
                

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
        color: '#fff',
        fontSize: 36,
        fontFamily: 'sans-serif-light'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        height: 40,
        width: 140,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#fff'
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
        color: '#fff',
        fontFamily: 'sans-serif-light',
        fontSize: 14
    },
    month: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        margin: 10,
        color: '#fff'
    },
    arrows: {
        position: 'absolute',
        bottom: 90,
        justifyContent: 'center',
        alignItems: 'center'


    }
})