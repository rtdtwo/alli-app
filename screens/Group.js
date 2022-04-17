import { Appbar, Button, FAB, Provider, Text } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import theme from "../theme/themes"
import { goBack } from "./goTo"
import React from "react"
import { ScrollView } from "react-native"
import styles from "../theme/styles"
import CreatePost from "../modals/CreatePost"
import Post from "../components/Post"
import APIS from "../network/api"
import {getCurrentUser} from '../storage/storage'

const Group = ({ route, navigation }) => {
    const group = route.params.group

    const [user, setUser] = React.useState(undefined)

    const [allPosts, setAllPosts] = React.useState([])
    const [userPosts, setUserPosts] = React.useState([])

    const [currentPostType, setCurrentPostType] = React.useState('all')
    const [showCreateModal, setShowCreateModal] = React.useState(false)


    const getPosts = () => {
        getCurrentUser().then(user => {
            setUser(user)

            APIS.getPostsOfGroup(group.id, user.socialProfile.id).then(response => {
                if(response.code == 200) {
                    setAllPosts(response.data)
                } else {
                    console.log(response.msg)
                }
            }).catch(e => console.log(e))

            APIS.getPostsOfGroupByUser(group.id, user.socialProfile.id).then(response => {
                if(response.code == 200) {
                    setUserPosts(response.data)
                } else {
                    console.log(response.msg)
                }
            }).catch(e => console.log(e))
        })
    }

    React.useState(() => {
        getPosts()
    }, [])

    const localStyles = StyleSheet.create({
        groupDescription: {
            paddingHorizontal: 16,
            paddingBottom: 8,
            elevation: 0,
            backgroundColor: 'white'
        },
        postMenu: {
            padding: 16,
            justifyContent: "space-evenly",
            flexDirection: 'row',
        },
        buttonActive: {
            fontWeight: 'bold',
            padding: 8,
            paddingHorizontal: 16,
            borderColor: theme.colors.accent,
            borderWidth: 1,
            borderRadius: 8,
            color: theme.colors.accent
        },
        buttonInactive: {
            fontWeight: 'bold',
            padding: 8,
            paddingHorizontal: 16,
            color: '#454545'
        },
        appbar: {
            elevation: 0
        },
        leaveGroupButton: { 
            marginStart: 'auto', 
            marginTop: 16 
        }
    })

    const showPosts = () => {
        let posts = undefined
        if (currentPostType === 'all') {
            posts = allPosts
        } else {
            posts = userPosts
        }

        return posts.map(post => {
            return <Post key={post.id} data={post} />
        })
    }

    const onPostCreated = () => {
        getPosts()
        setShowCreateModal(false)
    }

    return <Provider theme={theme}>
        <Appbar.Header style={localStyles.appbar}>
            <Appbar.BackAction onPress={() => goBack()} />
            <Appbar.Content title={group.name} />
        </Appbar.Header>

        <View style={localStyles.groupDescription}>
            <Text>{group.description}</Text>
            <Button style={localStyles.leaveGroupButton} color={theme.colors.accent}>Leave Group</Button>
        </View>

        <View style={localStyles.postMenu}>
            <Text
                onPress={() => setCurrentPostType('all')}
                style={currentPostType === 'all' ? localStyles.buttonActive : localStyles.buttonInactive}>ALL POSTS</Text>
            <Text
                onPress={() => setCurrentPostType('your')}
                style={currentPostType === 'your' ? localStyles.buttonActive : localStyles.buttonInactive}>YOUR POSTS</Text>
        </View>

        <ScrollView>
            <View style={{marginBottom: 108}}>
                {showPosts()}
            </View>
        </ScrollView>

        <CreatePost onPostCreated={onPostCreated} visible={showCreateModal} onDismiss={setShowCreateModal} socialId={user?.socialProfile?.id} groupId={group.id} />

        <FAB
            style={styles.fabBottomRight}
            visible={!showCreateModal}
            icon="plus"
            color="white"
            onPress={() => setShowCreateModal(true)} />

    </Provider>
}

export default Group