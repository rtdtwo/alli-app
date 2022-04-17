import { ActivityIndicator, Banner, Button, Card, FAB, Provider, Text } from 'react-native-paper'
import CreateSocialProfile from '../modals/CreateSocialProfile'
import { getCurrentUser } from '../storage/storage'
import styles from '../theme/styles'
import theme from '../theme/themes'
import { refreshUser } from '../utils/session'
import React from 'react'
import CreateGroup from '../modals/CreateGroup'
import Group from '../components/Group'
import { View } from 'react-native'
import { navigate } from '../screens/goTo'
import APIS from '../network/api'
import { ScrollView, Image } from 'react-native'

const Social = ({ refresh }) => {
    const [user, setUser] = React.useState(undefined)
    const [socialProfile, setSocialProfile] = React.useState(null)
    const [groups, setGroups] = React.useState(undefined)
    const [isFabOpen, setFabOpen] = React.useState(false)
    const [showCreateSocialProfileModal, setShowCreateSocialProfileModal] = React.useState(false)
    const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false)

    React.useEffect(() => {
        getCurrentUser().then(user => {
            if (user) {
                setUser(user)
                if (user.socialProfile && user.socialProfile !== "null") {
                    setSocialProfile(user.socialProfile)
                    getGroups(user.socialProfile.id)
                } else {
                    setShowCreateSocialProfileModal(true)
                }
            }
        })
    }, [])


    const refreshPage = () => {
        getGroups(socialProfile?.id)
        setShowCreateGroupModal(false)
    }


    React.useEffect(() => {
        console.log('Refrsh')
        if (socialProfile && refresh) {
            refreshPage()
        }
    }, [refresh])


    const getGroups = (socialId) => {
        APIS.getGroupsOfUser(socialId).then(response => {
            if (response.code == 200) {
                setGroups(response.data)
            } else {
                console.log('Unknown error')
            }
        }).then(e => { console.log(e) })
    }

    const updateUser = (data) => {
        setSocialProfile(data.socialProfile)
        refreshUser(data.id)
        setShowCreateSocialProfileModal(false)
    }

    return <Provider theme={theme}>
        {
            groups ?
                <ScrollView>
                    <View style={{ paddingBottom: 108 }}>
                        {
                            groups.length > 0
                                ?
                                < View style={{ paddingBottom: 24 }}>
                                    <Text style={{ ...styles.textTitleBigBold, paddingHorizontal: 24, paddingTop: 24 }}>Your groups</Text>
                                    <Text style={{ ...styles.textTitle, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16 }}>Let other people know your journey so far!</Text>
                                    {
                                        groups.map(group =>
                                            <Group
                                                key={group.id}
                                                data={group}
                                                onPress={() => navigate('Group', { group: group })}
                                            />
                                        )
                                    }
                                </View>
                                : null
                        }
                        <View style={{ padding: 24, marginTop: 24 }}>
                            <Image source={{ uri: 'https://i.postimg.cc/4dQSBh0m/support.png' }} style={{ marginBottom: 24, width: 192, height: 192 }} />
                            <Text style={styles.textTitleBigBold}>You are not alone in this fight!</Text>
                            <Text style={{ ...styles.textTitle, marginTop: 16, lineHeight: 28 }}>Joining a support group helps you achieve your goals better. You are completely anonymous and can only be identified by your nickname. You can also post anonymously.</Text>
                            <Text style={{ ...styles.textMedium, marginTop: 16, lineHeight: 28 }}>Press the menu button below to create or join a group.</Text>
                        </View>
                    </View>
                </ScrollView>
                :
                socialProfile ?
                    <ActivityIndicator animating={true} color={theme.colors.accent} size='large' style={styles.verticalCenter} />
                    : null
        }

        <FAB.Group
            style={styles.fabGroupBottomRight}
            open={isFabOpen}
            onStateChange={() => setFabOpen(!isFabOpen)}
            icon="dots-vertical"
            visible={!showCreateGroupModal && !showCreateSocialProfileModal}
            color="white"
            onDismiss
            actions={[
                {
                    icon: 'account-group-outline',
                    label: 'Join a Group',
                    onPress: () => {
                        setFabOpen(false)
                        navigate('Group List')
                    }
                },
                {
                    icon: 'account-multiple-plus-outline',
                    label: 'Create Group',
                    onPress: () => {
                        setShowCreateGroupModal(true)
                        setFabOpen(false)
                    }
                }
            ]} />

        <CreateSocialProfile visible={showCreateSocialProfileModal} onCreate={updateUser} userId={user?.id} />

        <CreateGroup
            visible={showCreateGroupModal}
            onCreate={refreshPage}
            userId={user?.id}
            onDismiss={() => {
                setShowCreateGroupModal(false)
            }} />

    </Provider >
}

export default Social