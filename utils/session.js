import { replace } from "../screens/goTo"
import { clearAllGoals, clearCurrentUser } from "../storage/storage"

export const logOut = () => {
    clearCurrentUser()
    clearAllGoals()
    replace('Splash')
}