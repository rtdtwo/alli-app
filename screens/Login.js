import { View,Button,Text,Image} from "react-native";
import {FormBuilder} from 'react-native-paper-form-builder';
import {TextInput} from 'react-native-paper';
import {useForm} from "react-hook-form";
import * as goTo from '../pages/goTo';
import styles from "../styles";
import React, {Fragment} from 'react';


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

    return ( 

            <Fragment>
        
                <View>
                    <Button title={'Go Back'}
                    onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
                    <Image source={require('../assets/croc.png')} style={styles.gata}/>
                    <Text style={styles.title}>Ali</Text>
                    <Text style={styles.title2}>Chomp Away Bad Habbits</Text>

                 </View>

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
                        flex: 1.5,
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
                        flex: 1,
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
                    name: 'gender',
                    type: 'select',
                    textInputProps: {
                        label: 'Gender',
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
                <View style={styles.buttonStyle}>
                <Button 
                title="Submit" mode={'contained'} onPress={handleSubmit(console.log)}>
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