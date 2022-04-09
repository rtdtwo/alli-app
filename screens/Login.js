import { View,Button,Text,Image,TextInput} from "react-native"
import * as goTo from '../pages/goTo';
import styles from "../styles";
import React from 'react';


const Login = () => {
    const [text, onChangeText] = React.useState("Some Email");
    const [text2, onChangeText2] = React.useState("A password");

    return ( 

        <View>

            <Button title={'Go Back'}
                    onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
            <Image source={require('../assets/croc.png')} 
            style={styles.gata}         
            />


            <Text style={styles.title}>Ali</Text>
            <Text style={styles.title2}>Chomp Away Bad Habbits</Text>

            <TextInput style={styles.textBox} onChangeText={onChangeText}value={text}/>
            <TextInput style={styles.textBox} onChangeText={onChangeText2}value={text2}/>
             
             


        </View> 



    );
}

export default Login