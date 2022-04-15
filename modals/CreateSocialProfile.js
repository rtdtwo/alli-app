import { Button, Card, Modal, TextInput, Text } from "react-native-paper"
import React from "react"
import styles from "../theme/styles"
import theme from "../theme/themes"
import API from '../network/api'

const CreateSocialProfile = (props) => {

    const [nickname, setNickname] = React.useState('')
    const [bio, setBio] = React.useState('')

    const createSocialProfile = () => {
        if (nickname.trim().length > 0) {
            API.createSocialProfile({userId: props.userId, nickname: nickname.trim(), bio: bio.trim()})
                .then(response => {
                    if (response.code == 201) {
                        props.onDismiss(response.data)
                    }
                })
                .catch(e => console.log(e))
        }
    }

    return <Modal dismissable={false} visible={props.visible} style={styles.modal}>
        <Card >
            <Card.Title title="Create Social Profile"/>
            <Card.Content>

                <Text>A social profile allows you to interact with users without revealing your real name and ensuring your privacy is in your hands.</Text>

                <TextInput
                    label="Nickname"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={nickname}
                    onChangeText={text => setNickname(text)} />

                <TextInput
                    label="Bio (optional)"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={bio}
                    onChangeText={text => setBio(text)} />

            </Card.Content>

            <Card.Actions>
                <Button color={theme.colors.accent} onPress={() => createSocialProfile()}>Create</Button>
            </Card.Actions>
        </Card>


    </Modal>
}

export default CreateSocialProfile