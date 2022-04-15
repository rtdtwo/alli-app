import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Banner, Button, Card, Provider, Text } from 'react-native-paper'
import theme from '../theme/themes'
import styles from '../theme/styles'
import React from 'react'
import { getCurrentUser } from '../storage/storage'
import { StyleSheet } from 'react-native'
import API from '../network/api'
import SetMood from '../modals/SetMood'

const Mood = () => {
    const [user, setUser] = React.useState(undefined)
    const [moods, setMoods] = React.useState([])

    const [showSetMoodModal, setShowSetMoodModal] = React.useState(false)

    React.useEffect(() => {
        getCurrentUser().then(user => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    React.useEffect(() => {
        if (user) {
            API.getMoodsOfUser().then(response => {
                if (response.code == 200) {
                    setMoods(response.data)
                } else {
                    console.log('Unknown error')
                }
            }).catch(e => console.log(e))
        }
    }, [user])

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16
        }
    })

    return <Provider theme={theme}>
        <Card mode='outlined' style={style.card}>
            <Card.Content>
                <Text style={styles.textMedium}>Hi {user?.fName}!</Text>
                <Text style={styles.textTitleBigBold}>How are you feeling today?</Text>
            </Card.Content>
            <Card.Actions style={{marginStart: 'auto'}}>
                <Button color={theme.colors.accent} onPress={() => setShowSetMoodModal(true)}>Set Mood</Button>
            </Card.Actions>
        </Card>

        <Card mode='outlined' style={style.card}>
            <Card.Content>
                <Calendar
                    color={theme.colors.accent}
                    markingType='period'
                    markedDates={{

                    }} />
            </Card.Content>
        </Card>
        <SetMood visible={showSetMoodModal} onDismiss={setShowSetMoodModal} />
    </Provider>
}

export default Mood