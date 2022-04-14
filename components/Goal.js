import { Card, Text } from "react-native-paper"
import React from "react"
import { getSplitTime } from "../utils/utils"
import styles from "../theme/styles"
import { StyleSheet } from "react-native"

const Goal = ({data}) => {
    const [timeLeft, setTimeLeft] = React.useState(data.deadline * 1000 - new Date().getTime())

    React.useEffect(() => {
        updateTimeLeft()
    }, [])

    const updateTimeLeft = () => {
        setTimeout(() => {
            setTimeLeft(data.deadline * 1000 - new Date().getTime())
            updateTimeLeft()
        }, 1000)
    }

    const getCountdown = () => {
        const splitTime = getSplitTime(timeLeft)
        let result = ''
        if(splitTime.days > 0) {
            result += `${splitTime.days} days, `
            result += `${splitTime.hours} hours, `
            result += `${splitTime.minutes} minutes, `
            result += `${splitTime.seconds} seconds`
        } else if(splitTime.hours > 0) {
            result += `${splitTime.hours} hours, `
            result += `${splitTime.minutes} minutes, `
            result += `${splitTime.seconds} seconds`
        } else if(splitTime.minutes > 0) {
            result += `${splitTime.minutes} minutes, `
            result += `${splitTime.seconds} seconds`
        } else {
            result += `${splitTime.seconds} seconds`
        }

        return result
    }

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16,
            zIndex: 0
        }
    })

    return <Card mode="outlined" style={style.card}>
        <Card.Content>
            <Text style={styles.textSmall}>In {getCountdown()}</Text>
            <Text style={styles.textMediumBold}>{data.eventName}</Text>
        </Card.Content>
    </Card>
}

export default Goal