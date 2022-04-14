import { Appbar, List, Provider } from "react-native-paper"
import theme from "../theme/themes"
import { logOut } from "../utils/session"
import { goBack } from "./goTo"

const Profile = () => {
    return <Provider theme={theme}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => goBack()} />
            <Appbar.Content title="Profile" />
        </Appbar.Header>

        <List.Section>
            <List.Subheader>Account</List.Subheader>
            <List.Item
                onPress={() => logOut()}
                title="Logout"
                left={() => <List.Icon icon="logout" />} />
            <List.Item
                title="Delete Account"
                description="Clears all your data and preferences permanently. This action cannot be undone."
                left={() => <List.Icon color="#000" icon="delete-forever-outline" />}
            />
        </List.Section>

    </Provider>
}

export default Profile