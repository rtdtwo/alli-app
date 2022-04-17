import { Button, Card, IconButton, Modal, TextInput, Snackbar, Title } from "react-native-paper"
import React from "react"
import styles from "../theme/styles"
import theme from "../theme/themes"
import DateTimePicker from '@react-native-community/datetimepicker'
import API from '../network/api'

const CreateGoal = (props) => {

    const [goalName, setGoalName] = React.useState('')
    const [goalDate, setGoalDate] = React.useState(new Date())
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState(null)
    const [goalBeingCreated, setGoalBeingCreated] = React.useState(false)

    const changeGoalDate = (event, date) => {
        setGoalDate(date)
        setShowDatePicker(false)
    };

    const createGoal = () => {
        if (goalName.trim().length >= 3) {
            const name = goalName.trim()
            const date = parseInt(goalDate.getTime() / 1000, 10)
            setGoalBeingCreated(true)
            API.createGoal({ eventName: name, deadline: date, userId: props.userId })
                .then(response => {
                    setGoalBeingCreated(false)
                    if (response.code == 201) {
                        props.refresh(props.userId)
                    }
                })
                .catch(e => {
                    console.log(e)
                    setGoalBeingCreated(false)
                    setSnackbarMessage('Error: ' + e)
                })
        } else {
            setSnackbarMessage('Goal name should be at-least 3 characters long')
        }
    }


    return <Modal visible={props.visible} onDismiss={props.onDismiss} style={styles.modal}>
        <Card >
            <Card.Content>
                <Title style={{ marginBottom: 16 }}>
                    I have to abstain from all addictive substances for my ...
                </Title>
                <TextInput
                    label="Personal Goal"
                    placeholder="e.g. brother's wedding"
                    mode="outlined"
                    autoFocus
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={goalName}
                    onChangeText={text => setGoalName(text)} />

                <Title style={{ marginBottom: 16, marginTop: 8 }}>
                    which is on ...
                </Title>
                <TextInput
                    label="Date of the event"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    onPressIn={() => setShowDatePicker(true)}
                    style={styles.textInput}
                    value={goalDate.toLocaleDateString("en-US")} />
            </Card.Content>
            <Card.Actions style={{ marginStart: 'auto', marginBottom: 8 }}>
                <Button disabled={goalBeingCreated} color={theme.colors.disabled} onPress={() => props.onDismiss()}>Cancel</Button>
                <Button loading={goalBeingCreated} disabled={goalBeingCreated} color={theme.colors.accent} onPress={() => createGoal()}>Create</Button>
            </Card.Actions>
        </Card>

        {showDatePicker
            ? <DateTimePicker
                minimumDate={new Date()}
                onChange={changeGoalDate}
                value={goalDate} />
            : null}


        <Snackbar
            visible={snackbarMessage !== null}
            duration={3000}
            onDismiss={() => setSnackbarMessage(null)}>
            {snackbarMessage}
        </Snackbar>

    </Modal>
}

export default CreateGoal