import { View } from "react-native"
import { Avatar, Button, Card, IconButton, List, Text, Title } from "react-native-paper"
import { StyleSheet, ImageBackground } from "react-native"
import React from "react"
import { getSplitTime } from "../utils/utils"
import styles from "../theme/styles"
import theme from "../theme/themes"
import { GET_SUBSTANCE } from "../constants"
import APIS from "../network/api"

const Abstinence = ({ data }) => {

    const [timeSince, setTimeSince] = React.useState(new Date().getTime() - (data.startTime * 1000))

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16,
            borderRadius: 8
        },
        darkOverlay: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100%',
            height: '100%',
            borderRadius: 8
        }, imageBackground: {
            width: '100%',
            height: 156
        }
    })


    React.useEffect(() => {
        updateTimeSince()
    }, [])

    const resetTimer = () => {
        APIS.resetAbstinenceTimer(data.id).then(response => {
            if(response.code === 200) {
                data.startTime = new Date().getTime() / 1000;
            } else {
                console.log('Error: ' + response.msg)
            }
        }).catch(e => console.log(e))
    }

    const updateTimeSince = () => {
        setTimeout(() => {
            setTimeSince(new Date().getTime() - (data.startTime * 1000))
            updateTimeSince()
        }, 1000)
    }

    const substanceData = GET_SUBSTANCE(data.addiction)

    const getCountdown = () => {
        const splitTime = getSplitTime(timeSince)
        if (splitTime.days > 0) {
            return `${splitTime.days} days, ${splitTime.hours} hours, ${splitTime.minutes} minutes, ${splitTime.seconds} seconds`
        } else if (splitTime.hours > 0) {
            return `${splitTime.hours} hours, ${splitTime.minutes} minutes, ${splitTime.seconds} seconds`
        } else if (splitTime.minutes > 0) {
            return `${splitTime.minutes} minutes, ${splitTime.seconds} seconds`
        } else {
            return `${splitTime.seconds} seconds`
        }
    }

    return <Card mode="outlined" style={style.card}>
        <ImageBackground source={{ uri: substanceData.image }} style={style.imageBackground} borderRadius={8}>
            <Card.Content style={{ paddingVertical: 24, paddingHorizontal: 24, ...style.darkOverlay }}>
                <Text style={{ ...styles.textTitle, color: '#ffffff' }}>
                    I have abstained from{' '}
                    <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>
                        {data.addiction}
                    </Text>
                    {' '}since{' '}
                    <Text style={{ color: theme.colors.accent }}>
                        {getCountdown()}
                    </Text>
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 'auto', marginStart: 'auto', alignItems: 'center' }}>
                    <Text style={{ color: '#bcbcbc' }}>Didn't go as planned?   </Text>
                    <Text onPress={() => resetTimer()} style={{ color: '#fff', fontWeight: 'bold' }}>START OVER</Text>
                </View>
            </Card.Content>
        </ImageBackground>

    </Card>
}

export default Abstinence