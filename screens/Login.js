import { View, Text, StyleSheet } from "react-native";
import { TextInput, Snackbar, Provider, Button } from 'react-native-paper';
import styles from "../theme/styles";
import React, { Fragment } from 'react';
import * as goTo from './goTo';
import API from "../network/api"
import { setCurrentUser } from "../storage/storage";
import theme from "../theme/themes";
import DropDown from "react-native-paper-dropdown";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


export function Login() {

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [age, setAge] = React.useState('')
    const [sex, setSex] = React.useState('0')

    const [snackbarMessage, setSnackbarMessage] = React.useState(null)
    const [showSexDropdown, setShowSexDropdown] = React.useState(false)

    const signUp = () => {
        const data = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            age: age.trim(),
            sex: sex
        }

        if (data.firstName.length == 0) {
            setSnackbarMessage('First Name cannot be empty')
        } else if (data.lastName.trim().length == 0) {
            setSnackbarMessage('Last Name cannot be empty')
        } else if (email.trim().length == 0) {
            setSnackbarMessage('Email cannot be empty')
        } else if (age.trim().length == 0) {
            setSnackbarMessage('Age cannot be empty')
        } else {
            const body = {
                fName: data.firstName,
                lName: data.lastName,
                age: parseInt(data.age),
                email: data.email,
                sex: parseInt(data.sex),
            }

            API.signUp(body).then(response => {
                console.log(response)
                if (response.code === 201) {
                    setCurrentUser(response.data).then(() => goTo.replace('Home'))
                }
            }).catch(error => console.log(error))
        }
    }

    const style = StyleSheet.create({
        page: {
            padding: 24,
        },
        button: {
            marginTop: 16,
            padding: 8,
            backgroundColor: theme.colors.accent
        }
    })

    return <Provider theme={theme}>
        <View style={style.page}>

            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.title2}>Let's Get Started.</Text>

            <TextInput
                label="First Name"
                mode="outlined"
                activeOutlineColor={theme.colors.accent}
                style={styles.textInput}
                value={firstName}
                onChangeText={text => setFirstName(text)} />

            <TextInput
                label="Last Name"
                mode="outlined"
                activeOutlineColor={theme.colors.accent}
                style={styles.textInput}
                value={lastName}
                onChangeText={text => setLastName(text)} />

            <TextInput
                label="Email"
                mode="outlined"
                activeOutlineColor={theme.colors.accent}
                style={styles.textInput}
                value={email}
                onChangeText={text => setEmail(text)} />

            <TextInput
                label="Age"
                mode="outlined"
                activeOutlineColor={theme.colors.accent}
                style={styles.textInput}
                value={age}
                onChangeText={text => setAge(text)} />

            <DropDown
                label='Sex'
                mode='outlined'
                visible={showSexDropdown}
                showDropDown={() => setShowSexDropdown(true)}
                onDismiss={() => setShowSexDropdown(false)}
                activeColor={theme.colors.accent}
                value={sex}
                setValue={setSex}
                list={[
                    {
                        label: 'Female',
                        value: '0'
                    }, {
                        label: 'Male',
                        value: '1'
                    }, {
                        label: 'Non Binary',
                        value: '2'
                    }, {
                        label: 'Prefer not to say',
                        value: '3'
                    }
                ]} />

            <Button
                onPress={() => signUp()}
                style={style.button}
                mode="outlined"
                color={theme.colors.white}>
                Create Account
            </Button>
        </View>


        <Snackbar
            visible={snackbarMessage !== null}
            duration={3000}
            onDismiss={() => setSnackbarMessage(null)}>
            {snackbarMessage}
        </Snackbar>

    </Provider>
}



export default Login