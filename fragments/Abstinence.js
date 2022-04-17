import { ActivityIndicator, FAB, Provider, Text } from "react-native-paper"
import { getCurrentUser } from "../storage/storage"
import styles from "../theme/styles"
import theme from '../theme/themes'
import React from "react"
import API from '../network/api'
import { View } from "react-native"
import AbstinenceCard from "../components/Abstinence"
import CreateAbstinence from "../modals/CreateAbstinence"
import { ScrollView, Image } from "react-native"

const Abstinence = () => {
    const [abstinences, setAbstinences] = React.useState(undefined)
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
                    refresh(user.id)
                }
            })
            .catch(e => console.log(e))
    }, [])

    const refresh = (userId) => {
        setShowCreateModal(false)
        setAbstinences(undefined)
        API.getAllAbstinencesOfUser(userId)
            .then(response => setAbstinences(response.data))
            .catch(error => console.log(`Error Occurred - ${error.code}: ${error.msg}`))
    }

    return <Provider theme={theme}>
        {
            abstinences ?
                <ScrollView>
                    <View style={{ paddingBottom: 108 }}>
                        {
                            abstinences.length > 0
                                ? <View style={{ paddingBottom: 24 }}>
                                        <Text style={{ ...styles.textTitleBigBold, paddingHorizontal: 24, paddingTop: 24 }}>Way to go, {user.fName}!</Text>
                                        <Text style={{ ...styles.textTitle, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 }}>You're doing great. Keep up the good work!</Text>
                                        {abstinences.map(abstinence => <AbstinenceCard key={abstinence.id} data={abstinence} />)}
                                    </View> : null
                        }
                        <View style={{ padding: 24 }}>
                            <Image source={{ uri: 'https://i.postimg.cc/63GwyT2q/drug-addict.png' }} style={{ marginBottom: 24, width: 192, height: 192 }} />
                            <Text style={styles.textTitleBigBold}>Understanding the science behind it</Text>
                            <Text style={{ ...styles.textTitle, marginTop: 16, lineHeight: 28 }}>Research suggests that people who aim to maintain an abstinence streak are more likely to permanently recover from a substance abuse problem.</Text>
                            <Text style={{ ...styles.textMedium, marginTop: 16, lineHeight: 28 }}>Press the + button below to start an abstinence streak.</Text>
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

        <CreateAbstinence visible={showCreateModal} onDismiss={hideCreateModal} userId={userId} refresh={refresh} />

    </Provider>
}

export default Abstinence