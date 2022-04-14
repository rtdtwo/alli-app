import { ActivityIndicator, Button, Card, FAB, IconButton, Modal, Provider, Text, TextInput } from "react-native-paper"
import { getCurrentUser } from "../storage/storage"
import styles from "../theme/styles"
import theme from '../theme/themes'
import React from "react"
import API from '../network/api'
import { View } from "react-native"
import CreateGoal from "../modals/CreateGoal"
import Goal from "../components/Goal"

const Goals = () => {
    const [goals, setGoals] = React.useState(undefined)
    const [showCreateModal, setShowCreateModal] = React.useState(false)
    const [userId, setUserId] = React.useState(undefined)

    const hideCreateModal = () => {
        setShowCreateModal(false)
    }

    React.useEffect(() => {
        getCurrentUser()
            .then(user => {
                if (user) {
                    setUserId(user.id)
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
                goals.length > 0
                    ? goals.map(goal => <Goal key={goal.id} data={goal} />)
                    : <View style={styles.verticalCenter}>
                        <Text style={styles.splashMessageTitle}>No goals here</Text>
                        <Text style={styles.splashMessageText}>Create a goal now and take control of your addictions!</Text>
                    </View>
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