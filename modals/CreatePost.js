import React from "react"
import { Button, Card, Modal, Snackbar, Switch, TextInput, Text } from "react-native-paper"
import { View } from "react-native"
import styles from "../theme/styles"
import theme from "../theme/themes"
import APIS from "../network/api"

const CreatePost = (props) => {
    const [content, setContent] = React.useState('')
    const [anonymous, setAnonymous] = React.useState(false)
    const [creatingPost, setCreatingPost] = React.useState(false)

    const [snackbarMessage, setSnackbarMessage] = React.useState(null)

    const createPost = () => {
        if(content.trim().length > 0) {
            APIS.createPost({
                socialId: props.socialId,
                content: content,
                anonymous: anonymous,
                groupId: props.groupId
            }).then(response => {
                setCreatingPost(false)
                if(response.code === 201) {
                    props.onPostCreated()
                } else {
                    console.log(response.msg)
                }
            }).catch(e => console.log(e))
        }
    }

    return <Modal dismissable={false} visible={props.visible} style={styles.modal}>
        <Card >
            <Card.Title title="Create Post" />
            <Card.Content>

                <TextInput
                    label="Type your content here..."
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={content}
                    multiline
                    numberOfLines={8}
                    onChangeText={text => setContent(text)} />

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch value={anonymous} onValueChange={setAnonymous} />
                    <Text>Anonymous</Text>
                </View>

            </Card.Content>

            <Card.Actions>
                <Button
                    loading={creatingPost}
                    disabled={creatingPost}
                    color={theme.colors.disabled}
                    onPress={() => props.onDismiss(false)}>Cancel</Button>
                <Button
                    loading={creatingPost}
                    disabled={creatingPost}
                    color={theme.colors.accent}
                    onPress={() => createPost()}>Create</Button>
            </Card.Actions>
        </Card>

        <Snackbar
            visible={snackbarMessage !== null}
            duration={3000}
            onDismiss={() => setSnackbarMessage(null)}>
            {snackbarMessage}
        </Snackbar>


    </Modal>
}

export default CreatePost