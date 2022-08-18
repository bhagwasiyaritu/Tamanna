import { SafeAreaView, Text, Platform, PermissionsAndroid, StyleSheet, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { getCurrentWeather } from '../apis';
import moment from "moment";

const Home = () => {

    const [currentWeather, setCurrentWeather] = useState([])
    const [data, setData] = useState({})
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [lat, setLat] = useState('38.7259284')
    const [lon, setLon] = useState('-9.137382')
    const [img, setImg] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        appInitiate()
    }, [])

    const appInitiate = () => {
        if (Platform.OS === "ios") {
            Geolocation.requestAuthorization()
        } else {
            askAndroidPermission()
        }
    }

    const askAndroidPermission = async () => {
        try {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                weather()
            } else {
                console.log('Please Provide Location Permission')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const weather = () => {
        setRefreshing(true)
        Geolocation.getCurrentPosition(
            async (position) => {
                console.log(position);
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
                const res = await getCurrentWeather(lat, lon)
                console.log(res.data)
                setCurrentWeather(res.data.weather[0])
                setImg(res.data.weather[0].icon)
                setData(res.data)
                const unixTime = 1660472968;
                const date = new Date(unixTime * 1000);
                setDate(moment(date).format('LL'))
                const day = moment(date).format('dddd')
                setDay(day)
                setRefreshing(false)
            },
            (error) => {
                console.log(error.code, error.message);
                setRefreshing(false)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, showLocationDialog: true }
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={appInitiate}
                    />
                }
            >
                {refreshing ? <Text style={[styles.heading, { marginTop: 100 }]}>Please wait... we are fatching current weather details</Text> :
                    <>
                        <Text style={styles.heading}>{data?.name}</Text>
                        <Text style={styles.date}>{day}, {date}</Text>
                        <Image source={{ uri: "http://openweathermap.org/img/wn/" + img + "@2x.png" }} style={styles.image} />
                        <Text style={[styles.heading, { fontSize: 40 }]}> {`${Math.floor(data?.main?.temp - 270)}°C`}</Text>
                        <Text style={styles.subHeading}>{currentWeather.main}</Text>
                        <Text style={[styles.subHeading, { marginVertical: 10 }]}>Min Temp : {`${Math.floor(data?.main?.temp_min - 270)}°C`} / Max Temp : {`${Math.floor(data?.main?.temp_max - 270)}°C`}</Text>
                        <View style={styles.wrapper}>
                            <View style={[styles.subWrapper, { borderBottomWidth: 2, borderBottomColor: '#CCC' }]} >
                                <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: '#CCC', padding: 10 }}>
                                    <Text style={styles.subHeading}>Feels Like</Text>
                                    <Text style={[styles.subHeading, { marginVertical: 10 }]}>{`${Math.floor(data?.main?.feels_like - 270)}°C`}</Text>
                                </View>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={styles.subHeading}>Humidity</Text>
                                    <Text style={[styles.subHeading, { marginVertical: 10 }]}>{data?.main?.humidity} %</Text>
                                </View>
                            </View>
                            <View style={styles.subWrapper}>
                                <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: '#CCC', padding: 10 }}>
                                    <Text style={styles.subHeading}>Pressure</Text>
                                    <Text style={[styles.subHeading, { marginVertical: 10 }]}>{data?.main?.pressure} hPa</Text>
                                </View>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={styles.subHeading}>Wind</Text>
                                    <Text style={[styles.subHeading, { marginVertical: 10 }]}>{data?.wind?.speed} m/s</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => appInitiate()}>
                            <Text style={styles.btnTxt}>Refresh</Text>
                        </TouchableOpacity>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 20
    },
    date: {
        textAlign: 'center',
        marginVertical: 10
    },
    subHeading: {
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 16
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: '#CCC',
        borderRadius: 8,
        marginTop: 50
    },
    subWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'cover'
    },
    btn: {
        backgroundColor: '#0047AB',
        marginVertical: 20,
        padding: 5,
        borderRadius: 8,
        borderColor: '#0047AB',
        elevation: 0
    },
    btnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: '900',
    }
})

export default Home