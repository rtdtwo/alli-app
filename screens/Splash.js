import React from "react";
import { View, Image, Text } from "react-native"
import { getCurrentUser } from "../storage/storage";
import styles from "../theme/styles"
import * as goTo from './goTo';

const Splash = () => {

    React.useEffect(() => {
        let userAvailable = false

        getCurrentUser()
            .then(user => {
                if (user) {
                    userAvailable = true
                } else {
                    userAvailable = false
                }
            })
            .catch(e => {
                console.log(e)
                userAvailable = false
            })

        setTimeout(() => {
            if (userAvailable) {
                goTo.replace('Home')
            } else {
                goTo.replace('Login')
            }
        }, 2000)
    }, [])



    return <View style={styles.verticalCenter}>
        <Image source={require('../assets/croc.png')} style={styles.gata} />
        <Text style={styles.splashTitle}>Alli</Text>
        <Text style={styles.splashSubhead}>Chomp Away Bad Habits</Text>
    </View>
}

export default Splash