import { Card, IconButton, Paragraph, Switch, Text, Title } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import React from "react"
import styles from "../theme/styles"
import theme from "../theme/themes"
import APIS from "../network/api"
import { getCurrentUser } from "../storage/storage"

const Post = ({ data, onPress }) => {

    const style = StyleSheet.create({
        card: {
            marginTop: 16,
            marginLeft: 16,
            marginRight: 16
        }
    })

    const [postLiked, setPostLiked] = React.useState(data.likedByAsker)
    const [likes, setLikes] = React.useState(data.likes)

    const likeUnlike = () => {
        getCurrentUser().then(user => {
            APIS.likeUnlikePost(data.id, user.socialProfile.id)
            if (postLiked) {
                setLikes(likes - 1)
            } else {
                setLikes(likes + 1)
            }
            setPostLiked(!postLiked)
        })
    }

    const date = new Date(data.createdAt * 1000)

    return <Card mode='outlined' style={style.card}>
        <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{data.anonymous ? 'Anonymous' : data.createdBy.nickname}</Text>
                <Text> said</Text>
                <Text style={{ marginStart: 'auto', fontSize: 10 }}>{date.toLocaleDateString() + ', ' + date.toLocaleTimeString()}</Text>
            </View>
            <View
                style={{
                    borderBottomColor: '#efefef',
                    borderBottomWidth: 1,
                    marginTop: 16,
                    marginBottom: 16
                }}
            />
            <Paragraph style={styles.textMedium}>{data.content}</Paragraph>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, marginStart: 'auto' }}>{likes}</Text>
                <IconButton
                    onPress={() => likeUnlike()}
                    size={18}
                    style={{ padding: 0, margin: 0 }}
                    icon={postLiked ? 'heart' : 'heart-outline'}
                    color='#ff0000' />
            </View>

        </Card.Content>
    </Card>
}

export default Post