import React from "react"
import { Button, Card, Modal, Snackbar, Switch, TextInput, Text, Chip } from "react-native-paper"
import { View } from "react-native"
import styles from "../theme/styles"
import theme from "../theme/themes"
import APIS from "../network/api"
import { SUBSTANCES } from "../constants"

const CreateAbstinence = (props) => {
    const [abstinence, setAbstinence] = React.useState('')
    const [creatingAbstinence, setCreatingAbstinence] = React.useState(false)

    const [snackbarMessage, setSnackbarMessage] = React.useState(null)

    const createAbstinence = () => {
        if (abstinence.trim().length > 0) {
            APIS.createAbstinence({
                userId: props.userId,
                addiction: abstinence,
            }).then(response => {
                setCreatingAbstinence(false)
                if (response.code === 201) {
                    props.refresh(props.userId)
                } else {
                    console.log(response.msg)
                }
            }).catch(e => console.log(e))
        }
    }

    return <Modal dismissable={false} visible={props.visible} style={styles.modal}>
        <Card >
            <Card.Title title="I want to abstain from ..." />
            <Card.Content>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                    {
                        SUBSTANCES.map(substance => {
                            return <Chip
                                mode={abstinence === substance.key ? 'flat' : 'outlined'}
                                key={substance.key}
                                style={{ marginBottom: 8, marginEnd: 8 }}
                                onPress={() => setAbstinence(substance.key)}
                                icon={substance.icon}>
                                {substance.name}
                            </Chip>
                        })
                    }
                </View>
            </Card.Content>

            <Card.Actions style={{marginStart: 'auto'}}>
                <Button
                    loading={creatingAbstinence}
                    disabled={creatingAbstinence}
                    color={theme.colors.disabled}
                    onPress={() => props.onDismiss(false)}>Cancel</Button>
                <Button
                    loading={creatingAbstinence}
                    disabled={creatingAbstinence}
                    color={theme.colors.accent}
                    onPress={() => createAbstinence()}>Begin</Button>
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

export default CreateAbstinence