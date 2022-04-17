import { ActivityIndicator, FAB, Provider, Text } from "react-native-paper"
import { getCurrentUser } from "../storage/storage"
import styles from "../theme/styles"
import theme from '../theme/themes'
import React from "react"
import API from '../network/api'
import { View } from "react-native"
import CreateGoal from "../modals/CreateGoal"
import Goal from "../components/Goal"
import { ScrollView, Image } from "react-native"

const Goals = () => {
    const [goals, setGoals] = React.useState(undefined)
    const [showCreateModal, setShowCreateModal] = React.useState(false)
    const [userId, setUserId] = React.useState(undefined)
    const [user, setUser] = React.useState(undefined)

    const hideCreateModal = () => {
        setShowCreateModal(false)
    }

    React.useEffect(() => {
        getCurrentUser()
            .then(user => {
                if (user) {
                    setUserId(user.id)
                    setUser(user)
                    refreshGoals(user.id)
                }
            })
            .catch(e => console.log(e))
    }, [])

    const refreshGoals = (id) => {
        setShowCreateModal(false)
        setGoals(undefined)
        API.getAllGoalsOfUser(id)
            .then(response => setGoals(response.data))
            .catch(error => console.log(`Error Occurred - ${error.code}: ${error.msg}`))
    }

    return <Provider theme={theme}>
        {
            goals ?
                <ScrollView>
                    <View style={{ paddingBottom: 108 }}>
                        {goals.length > 0
                            ? <View style={{ paddingBottom: 24 }}>
                                <Text style={{ ...styles.textTitleBigBold, paddingHorizontal: 24, paddingTop: 24 }}>Hi {user.fName}!</Text>
                                <Text style={{ ...styles.textTitle, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 }}>Remember why you're doing this. It is worth the effort!</Text>
                                {goals.map(goal => <Goal key={goal.id} data={goal} />)}
                            </View>
                            : null
                        }
                        <View style={{ padding: 24 }}>
                            <Image source={{ uri: 'https://i.postimg.cc/tT3Nzt8x/goal.png' }} style={{ marginBottom: 24, width: 192, height: 192 }} />
                            <Text style={styles.textTitleBigBold}>Understanding the science behind it</Text>
                            <Text style={{ ...styles.textTitle, marginTop: 16, lineHeight: 28 }}>Research into the psychology of substance abuse suggests that people are more likely to abstain from addictive substances when the process of abstinence is linked with a personal goal.</Text>
                            <Text style={{ ...styles.textMedium, marginTop: 16, lineHeight: 28 }}>Press the + button below to add a goal.</Text>
                        </View>
                    </View>
                </ScrollView>

                : <ActivityIndicator animating={true} color={theme.colors.accent} size='large' style={styles.verticalCenter} />
        }
        <FAB
            style={styles.fabBottomRight}
            visible={!showCreateModal}
            icon="plus"
            color="white"
            onPress={() => setShowCreateModal(true)}
        />

        <CreateGoal visible={showCreateModal} onDismiss={hideCreateModal} userId={userId} refresh={refreshGoals} />

    </Provider>
}

export default Goals