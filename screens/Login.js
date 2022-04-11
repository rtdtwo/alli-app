import { View,Button,Text,Image,TextInput,Alert} from "react-native"
import { useForm, Controller } from "react-hook-form";
import * as goTo from '../pages/goTo';
import styles from "../styles";
import React from 'react';


export function Login (){

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          firstName: '',
          lastName: ''
        }
    });

    const onSubmit = data => console.log(data);
    console.log("test");

    return ( 
        <View>
            <Button title={'Go Back'}
                    onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
            <Image source={require('../assets/croc.png')} style={styles.gata}/>

            <Text style={styles.title}>Ali</Text>
            <Text style={styles.title2}>Chomp Away Bad Habbits</Text>

            <View style={styles.formWrapper}>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.textBox}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={"email"}
                    />
                    )}
                    name="firstName"
                />
                {errors.firstName && <Text>This is required.</Text>}

                <Controller
                    control={control}
                    rules={{
                    maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.textBox}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={"password"}
                    />
                    )}
                    name="lastName"
                />
 
            </View>
            <View style={styles.buttonStyle}>
            <Button
                title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>

        </View> 


    );
}

export default Login

{/* https://react-hook-form.com/ */}