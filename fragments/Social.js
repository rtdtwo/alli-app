import { Banner, Button, Card, FAB, Provider, Text } from 'react-native-paper'
import CreateSocialProfile from '../modals/CreateSocialProfile'
import { getCurrentUser } from '../storage/storage'
import styles from '../theme/styles'
import theme from '../theme/themes'
import { refreshUser } from '../utils/session'
import React from 'react'

const Social = () => {
    const [user, setUser] = React.useState(undefined)
    const [socialProfile, setSocialProfile] = React.useState(null)

    React.useEffect(() => {
        getCurrentUser().then(user => {
            if (user) {
                setUser(user)
                if(user.socialProfile && user.socialProfile !== "null") {
                    setSocialProfile(user.socialProfile)
                }
            }
        })
    }, [])

    const updateUser = (data) => {
        setUser(data)
        setSocialProfile(data.socialProfile)
        refreshUser()
    }

    return <Provider theme={theme}>
        <CreateSocialProfile visible={socialProfile === null} onDismiss={(profile) => updateUser(profile)}/>

        <FAB
            style={styles.fabBottomRight}
            icon="plus"
            visible={socialProfile !== null}
            color="white" />

    </Provider>
}

export default Social