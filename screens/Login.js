import { View,Button,Text,Image} from "react-native";
import {FormBuilder} from 'react-native-paper-form-builder';
import {TextInput} from 'react-native-paper';
import {useForm} from "react-hook-form";
import * as goTo from '../pages/goTo';
import styles from "../styles";
import React, {Fragment} from 'react';
import API from "../network/api"
import { ToastAndroid } from "react-native-web";


export function Login (){

    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender: '',
        },
        mode: 'onChange',
    });

    console.log("test");

    const signUp = (data) => {
        //clean data here
        data.firstName = data.firstName.trim()
        data.lastName = data.lastName.trim()
        data.email = data.email.trim()
        


        if(data.firstName.length == 0) {
            //will have to add code for snackbar
            //some kind of box that will change based on a state
        } else if(data.lastName.length == 0){

        } 
        else if(data.email.length == 0){

        } 
        else {
            
            const body = {
                fName: data.firstName,
                lName: data.lastName,
                age: parseInt(data.Age),
                email: data.email,
                sex: parseInt(data.sex),
            }
        //API.signUp(body).then(response=> console.log(response)).catch(error=> console.log(error))
        //code is 201 on success -> then go to home screen
        //checking the value of a name e.g is it empty
        //use .trim() -> removes white spaces, except those b/w chars from string in JS
        }
    }

    {/* Add in some if/else checks for the data  */}




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
                    name: 'Age',
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
                </View>
            </Fragment> 
    );
}



export default Login

{/* https://react-hook-form.com/ *}
{/*https://github.com/fateh999/react-native-paper-form-builder/blob/d0487b3bc5ff9f36370b2f985587633b6222acee/example/AdvancedExample.tsx
*/}