import { Button, Card, Modal, TextInput, Text, Snackbar, Title } from "react-native-paper"
import React from "react"
import styles from "../theme/styles"
import theme from "../theme/themes"
import API from '../network/api'

const CreateSocialProfile = (props) => {

    const [nickname, setNickname] = React.useState('')
    const [bio, setBio] = React.useState('')

    const [snackbarMessage, setSnackbarMessage] = React.useState(null)
    const [creatingSocialProfile, setCreatingSocialProfile] = React.useState(false)

    const createSocialProfile = () => {
        console.log('Call create social')
        if (nickname.trim().length >= 6) {
            if (nickname.match("^[a-z0-9]+$")) {
                API.createSocialProfile({ userId: props.userId, nickname: nickname.trim(), bio: bio.trim() })
                    .then(response => {
                        setCreatingSocialProfile(false)
                        if (response.code == 201) {
                            console.log('Created')
                            props.onCreate(response.data)
                            setSnackbarMessage('Profile created!')
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        setCreatingSocialProfile(false)
                        setSnackbarMessage('Error: ' + e.msg)
                    })
            } else {
                setSnackbarMessage('Nickname can only contain lowercase letters and numbers')
            }
        } else {
            setSnackbarMessage('Nickname is required and must be 6 characters or more')
        }
    }

    return <Modal dismissable={false} visible={props.visible} style={styles.modal}>
        <Card >
            <Card.Content>

                <Title style={styles.textTitleBold}>Create Social Profile</Title>

                <Text style={{...styles.textMedium, marginVertical: 8}}>A social profile allows you to interact with users without revealing your real name and ensuring your privacy is in your hands.</Text>

                <TextInput
                    label="Nickname"
                    mode="outlined"
                    placeholder="6 characters or more, lowercase letters and numbers only."
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={nickname}
                    autoFocus
                    onChangeText={text => setNickname(text)} />

                <TextInput
                    label="Bio (optional)"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={bio}
                    onChangeText={text => setBio(text)} />

            </Card.Content>

            <Card.Actions style={{marginStart: 'auto'}}>
                <Button
                    loading={creatingSocialProfile}
                    disabled={creatingSocialProfile}
                    color={theme.colors.accent}
                    onPress={() => createSocialProfile()}>Create</Button>
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

export default CreateSocialProfile