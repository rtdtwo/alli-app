import { View } from "react-native"
import { useEffect, useState } from "react/cjs/react.production.min"
import { getCurrentUser } from '../storage/storage'

import API from '../network/api'

const HomeScreen = () => {

    const [goals, setGoals] = useState([])
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        getCurrentUser()
            .then(user => setCurrentUser(user))
            .catch(e => {
                console.log(e)
                setCurrentUser(null)
            })
    })

    useEffect(() => {
        API.getAllGoalsOfUser()
            .then(response => setGoals(response.data))
            .catch(error => console.log(`Error Occurred - ${error.code}: ${error.msg}`))
    }, [])
    return <View>
    </View>
}

export default HomeScreen