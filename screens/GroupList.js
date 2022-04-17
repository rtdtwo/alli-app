import React from "react"
import { Appbar, Button, Dialog, Paragraph, Provider } from "react-native-paper"
import Group from "../components/Group"
import APIS from "../network/api"
import { getCurrentUser } from "../storage/storage"
import theme from "../theme/themes"
import { goBack, navigate } from "./goTo"

const GroupList = () => {
    const [groups, setGroups] = React.useState([])
    const [user, setUser] = React.useState(null)
    const [selectedGroup, setSelectedGroup] = React.useState(null)
    const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)


    React.useEffect(() => {
        getCurrentUser().then(currentUser => {
            if (currentUser) {
                setUser(currentUser)
                getGroups(currentUser)
            }
        })
    }, [])

    const getGroups = (user) => {
        APIS.getAllGroups(user.socialProfile.id).then(response => {
            if (response.code === 200) {
                setGroups(response.data)
            } else {
                console.log(response.msg)
            }
        }).catch(e => console.log(e))
    }

    const joinGroup = () => {
        APIS.joinGroup(selectedGroup.id, user.socialProfile.id).then(response => {
            if (response.code === 200) {
                setShowConfirmDialog(false)
                setSelectedGroup(null)
                navigate('Home', {refreshSocial: true})
            } else {
                console.log(response.msg)
            }
        }).catch(e => console.log(e))
    }

    return <Provider theme={theme}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigate('Home', {refreshSocial: true})} />
            <Appbar.Content title="Join A Group" />
        </Appbar.Header>

        {
            groups.map(group => {
                return <Group key={group.id} data={group}
                    onPress={() => {
                        setSelectedGroup(group)
                        setShowConfirmDialog(true)
                    }
                    } />
            })
        }

        <Dialog visible={showConfirmDialog} dismissable={false}>
            <Dialog.Title>Join {selectedGroup?.name}?</Dialog.Title>
            <Dialog.Content>
                <Paragraph>You will be able to post after joining the group.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button 
                    color={theme.colors.disabled}
                onPress={() => {
                    setShowConfirmDialog(false)
                    setSelectedGroup(null)
                }}>No</Button>
                <Button
                    color={theme.colors.accent}
                     onPress={() => joinGroup()}>Yes</Button>
            </Dialog.Actions>
        </Dialog>

    </Provider>
}

export default GroupList