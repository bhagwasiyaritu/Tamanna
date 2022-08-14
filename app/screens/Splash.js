import { SafeAreaView, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../utils/Routes'

const Splash = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: Routes.Home }]
            })
        }, 1000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/splash_logo.png')} style={styles.img} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 200,
        height: 200
    }
})

export default Splash