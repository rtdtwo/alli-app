import { Calendar } from 'react-native-calendars'
import { Banner, Button, Card, Provider, Text } from 'react-native-paper'
import theme from '../theme/themes'
import styles from '../theme/styles'
import React from 'react'
import { getCurrentUser } from '../storage/storage'
import { StyleSheet } from 'react-native'
import API from '../network/api'
import SetMood from '../modals/SetMood'
import { MOODS, MOODS_COLOR } from '../constants'
import { ScrollView, View, Image} from 'react-native'

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
            getMoods()
        }
    }, [user])

    const getMoods = () => {
        API.getMoodsOfUser(user.id, 'all').then(response => {
            if (response.code == 200) {
                setMoods(response.data)
            } else {
                console.log('Unknown error')
            }
        }).catch(e => console.log(e))
    }

    const refresh = () => {
        setShowSetMoodModal(false)
        getMoods()
    }

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16
        }
    })

    const generateCalendarDates = () => {
        let dates = {}
        moods?.forEach(mood => {
            dates[mood.date] = { color: MOODS_COLOR[mood.mood], textColor: 'white' }
        })
        return dates
    }

    return <Provider theme={theme}>
        <ScrollView>
            <View>
                <Card mode='outlined' style={style.card}>
                    <Card.Content>
                        <Text style={styles.textMedium}>Hi {user?.fName}!</Text>
                        <Text style={styles.textTitleBigBold}>How are you feeling today?</Text>
                    </Card.Content>
                    <Card.Actions style={{ marginStart: 'auto' }}>
                        <Button color={theme.colors.accent} onPress={() => setShowSetMoodModal(true)}>Set Mood</Button>
                    </Card.Actions>
                </Card>

                <Card mode='outlined' style={style.card}>
                    <Card.Content>
                        <Calendar
                            color={theme.colors.accent}
                            markingType='period'
                            markedDates={generateCalendarDates()} />
                    </Card.Content>
                </Card>

                <View style={{ padding: 24 }}>
                    <Image source={{ uri: 'https://i.postimg.cc/vTmQGMFH/mood.png' }} style={{ marginBottom: 24, width: 192, height: 192 }} />
                    <Text style={styles.textTitleBigBold}>Your mood is important</Text>
                    <Text style={{ ...styles.textTitle, marginTop: 16, lineHeight: 28 }}>
                        Your mood plays a significant role in determining how susceptible you are to incline towards substance abuse. By tracking your mood, you can manage and identify trigger points which might cuase you to deviate from your abstinence goals.
                    </Text>
                    <Text style={{ ...styles.textTitle, marginVertical: 16 }}>
                        The app tracks the following moods:
                    </Text>
                    {
                        MOODS.map(mood => {
                            return <View style={{flexDirection: 'row', marginBottom: 8}} key={mood.key}>
                                <View style={{width: 24, height: 24, backgroundColor: mood.color, borderRadius: 4}}/>
                                <Text style={styles.textMedium}>  {mood.name}</Text>
                            </View>
                        })
                    }
                </View>
            </View>
        </ScrollView>
        <SetMood visible={showSetMoodModal} onDismiss={setShowSetMoodModal} onRefresh={refresh} />
    </Provider>
}

export default Mood