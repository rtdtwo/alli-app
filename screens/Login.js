import { View, Button, Text, Image } from "react-native";
import { FormBuilder } from 'react-native-paper-form-builder';
import { TextInput, Snackbar } from 'react-native-paper';
import { useForm } from "react-hook-form";
import styles from "../theme/styles";
import React, { Fragment } from 'react';
import * as goTo from './goTo';
import API from "../network/api"
import { setCurrentUser } from "../storage/storage";


export function Login() {
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            sex: ''
        },
        mode: 'onChange',
    });

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const signUp = (data) => {
        //clean data here
        data.firstName = data.firstName.trim()
        data.lastName = data.lastName.trim()
        data.email = data.email.trim()
        data.age = data.age.trim()

        console.log(data)


        if (data.firstName.length == 0) {
            //will have to add code for snackbar
            //some kind of box that will change based on a state
            setVisible(true)
        } else if (data.lastName.length == 0) {

        }
        else if (data.email.length == 0) {

        }
        else if (data.age.length == 0) {
        }
        else {

            const body = {
                fName: data.firstName,
                lName: data.lastName,
                age: parseInt(data.Age),
                email: data.email,
                sex: parseInt(data.sex),
            }

            API.signUp(body)
                .then(response => {
                    console.log(response)
                    if (response.code === 201) {
                        setCurrentUser(response.data).then(() => goTo.replace('Home'))
                    }
                }).catch(error => console.log(error))
        }
    }

    return (

        <Fragment>

            <View>
                <Text style={styles.title}>Hello!</Text>
                <Text style={styles.title2}>Let's Get Started.</Text>
            </View>

            <View style={styles.form}>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        [
                            {
                                name: 'firstName',
                                type: 'text',
                                textInputProps: {
                                    label: 'First Name',
                                    left: <TextInput.Icon name={'account'} />,
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'First name is required',
                                    },
                                },
                            },
                            {
                                name: 'lastName',
                                type: 'text',
                                textInputProps: {
                                    label: 'Last Name',
                                    left: <TextInput.Icon name={'account'} />,
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Last name is required',
                                    },
                                },
                            },
                        ],
                        {
                            name: 'email',
                            type: 'email',
                            textInputProps: {
                                label: 'Email',
                                left: <TextInput.Icon name={'email'} />,
                            },
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Email is required',
                                },
                                pattern: {
                                    value:
                                        /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                                    message: 'Email is invalid',
                                },
                            },
                        },
                        {
                            name: 'age',
                            type: 'password',
                            textInputProps: {
                                label: 'Age',
                                left: <TextInput.Icon name={'clock'} />,
                            },
                        },
                        {
                            name: 'sex',
                            type: 'select',
                            textInputProps: {
                                label: 'Sex',
                                left: <TextInput.Icon name={'account'} />,
                            },
                            rules: {
                                required: {
                                    value: true,
                                    message: 'Gender is required',
                                },
                            },
                            options: [
                                {
                                    value: 0,
                                    label: 'Female',
                                },
                                {
                                    value: 1,
                                    label: 'Male',
                                },
                                {
                                    value: 2,
                                    label: 'Other',
                                },
                            ],
                        },

                    ]}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button
                    title="Submit" mode={'contained'} onPress={handleSubmit(data => signUp(data))}>
                    Submit
                </Button>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Back',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    You are missing an input. Please try again.
                </Snackbar>

            </View>
        </Fragment>
    );
}



export default Login