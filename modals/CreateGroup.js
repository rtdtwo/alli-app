import React from "react"
import { Button, Card, Modal, Snackbar, TextInput } from "react-native-paper"
import APIS from "../network/api"
import styles from "../theme/styles"
import theme from "../theme/themes"

const CreateGroup = (props) => {
    const [name, setName] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [creatingGroup, setCreatingGroup] = React.useState('')
    const [snackbarMessage, setSnackbarMessage] = React.useState(null)

    const createGroup = () => {
        if (name.trim().length >= 4 && desc.trim().length >= 4) {
            setCreatingGroup(true)
            APIS.createGroup({
                name: name.trim(),
                description: desc.trim(),
                createdBy: props.userId,
                tags: []
            }).then(response => {
                setCreatingGroup(false)
                if (response.code === 201) {
                    setSnackbarMessage('Group created!')
                    props.onCreate()
                } else {
                    setSnackbarMessage('Error: ' + response.msg)
                }
            }).catch(e => {
                console.log(e)
                setSnackbarMessage('Error: Unknown')
            })
        } else {
            setSnackbarMessage('Group name or description has to be 4 characters or longer')
        }
    }

    return <Modal dismissable={false} visible={props.visible} style={styles.modal}>
        <Card style={{ elevation: 8 }}>
            <Card.Title title="Create Group" />
            <Card.Content>
                <TextInput
                    label="Group Name"
                    mode="outlined"
                    autoFocus
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={name}
                    onChangeText={text => setName(text)} />

                <TextInput
                    label="Group Description"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={desc}
                    multiline
                    numberOfLines={5}
                    onChangeText={text => setDesc(text)} />
            </Card.Content>

            <Card.Actions style={{ marginStart: 'auto', paddingBottom: 16 }}>
                <Button
                    disabled={creatingGroup}
                    color={theme.colors.disabled}
                    onPress={() => props.onDismiss(true)}>Cancel</Button>
                <Button
                    loading={creatingGroup}
                    disabled={creatingGroup}
                    color={theme.colors.accent}
                    onPress={() => createGroup()}>Create</Button>
            </Card.Actions>

            <Snackbar
                visible={snackbarMessage !== null}
                duration={3000}
                onDismiss={() => setSnackbarMessage(null)}>
                {snackbarMessage}
            </Snackbar>
        </Card>


    </Modal>
}

export default CreateGroup