import { Button, Card, Chip, Modal, RadioButton, Text, TextInput } from "react-native-paper"
import { View } from "react-native"
import styles from "../theme/styles"
import theme from "../theme/themes"
import { MOODS } from "../constants"
import React from "react"

const SetMood = (props) => {
    const [selectedMood, setSelectedMood] = React.useState(undefined)

    return <Modal visible={props.visible} onDismiss={props.onDismiss} style={styles.modal}>
        <Card style={{ padding: 16 }}>
            <Card.Title title="How are you feeling?" />
            <Card.Content>
                {
                    MOODS.map(mood => {
                        const style = {
                            padding: 4,
                            marginBottom: 4,
                            marginTop: 4,
                            backgroundColor: selectedMood === mood.key ? mood.color : theme.colors.transparent,
                            borderColor: mood.color,
                            borderWidth: 1
                        }

                        const textStyle = {
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            color: selectedMood === mood.key ? 'white' : mood.color
                        }

                        return <Chip
                            style={style}
                            textStyle={textStyle}
                            key={mood.key}
                            color={mood.color}
                            onPress={() => setSelectedMood(mood.key)}>
                            {mood.name}
                        </Chip>

                    })
                }
            </Card.Content>
            <Card.Actions style={{marginStart: 'auto'}}>
                <Button color={theme.colors.disabled} onPress={() => props.onDismiss()}>Cancel</Button>
                <Button color={theme.colors.accent} onPress={() => console.log('Set pressed')}>Set</Button>
            </Card.Actions>
        </Card>
    </Modal>
}

export default SetMood