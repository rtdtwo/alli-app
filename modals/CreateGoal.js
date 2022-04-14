import { Button, Card, IconButton, Modal, TextInput } from "react-native-paper"
import React from "react"
import styles from "../theme/styles"
import theme from "../theme/themes"
import DateTimePicker from '@react-native-community/datetimepicker'
import API from '../network/api'

const CreateGoal = (props) => {

    const [goalName, setGoalName] = React.useState('')
    const [goalDate, setGoalDate] = React.useState(new Date())
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    const changeGoalDate = (event, date) => {
        setGoalDate(date)
        setShowDatePicker(false)
    };

    const createGoal = () => {
        if (goalName.trim().length > 0) {
            const name = goalName.trim()
            const date = parseInt(goalDate.getTime() / 1000, 10)
            API.createGoal({ eventName: name, deadline: date, userId: props.userId })
            .then(response => {
                if(response.code == 201) {
                    props.refresh(props.userId)
                }
            })
            .catch(e => console.log(e))
        }
    }


    return <Modal visible={props.visible} onDismiss={props.onDismiss} style={styles.modal}>
        <Card >
            <Card.Title title="Create a goal" left={() => <IconButton icon="bullseye-arrow" />} />
            <Card.Content>
                <TextInput
                    label="Goal name"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    style={styles.textInput}
                    value={goalName}
                    onChangeText={text => setGoalName(text)} />

                <TextInput
                    label="Goal Date"
                    mode="outlined"
                    activeOutlineColor={theme.colors.accent}
                    onPressIn={() => setShowDatePicker(true)}
                    style={styles.textInput}
                    value={goalDate.toLocaleDateString("en-US")} />
            </Card.Content>
            <Card.Actions>
                <Button color={theme.colors.disabled} onPress={() => props.onDismiss()}>Cancel</Button>
                <Button color={theme.colors.accent} onPress={() => createGoal()}>Create</Button>
            </Card.Actions>
        </Card>

        {showDatePicker
            ? <DateTimePicker
                minimumDate={new Date()}
                onChange={changeGoalDate}
                value={goalDate} />
            : null}


    </Modal>
}

export default CreateGoal