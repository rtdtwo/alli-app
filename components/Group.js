import { Card, Paragraph, Text, Title } from "react-native-paper"
import { StyleSheet } from "react-native"
import styles from "../theme/styles"

const Group = ({data, onPress}) => {

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16
        }
    })

    return <Card mode='outlined' style={style.card} onPress={onPress}>
        <Card.Content>
            <Text style={styles.textTitleBold}>{data.name}</Text>
            <Text style={{...styles.textMedium, marginTop: 8}}>{data.description}</Text>
            <Text style={{...styles.textSmall, marginTop: 8}}>{data.members} members</Text>
        </Card.Content>
    </Card>
}

export default Group