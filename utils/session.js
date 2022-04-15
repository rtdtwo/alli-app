import APIS from "../network/api"
import { replace } from "../screens/goTo"
import { clearAllGoals, clearCurrentUser, setCurrentUser } from "../storage/storage"

export const logOut = () => {
    clearCurrentUser()
    clearAllGoals()
    replace('Splash')
}

export const refreshUser = () => {
    APIS.getUserById(user.id).then(response => {
        if (response.code == 200) {
            setCurrentUser(response.data)
        }
    }).catch(e => console.log(e))
}