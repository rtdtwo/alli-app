import { View,Button,Text, Image} from "react-native"
import * as goTo from '../pages/goTo';
import croc from '../assets/croc.png'
import styles from "../styles";

const Login = () => {
    return ( 

        <View>

        <Button title={'Go Back'}
                onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
        <Image resizeMode="cover" style={[styles.me,{width:60,height:60}]} source={{uri: 'https://static.pexels.com/photos/213117/pexels-photo-213117.jpeg'}}/>
        <Text style={styles.title}>Ali</Text>
        <Text style={styles.title2}>Chomp Away Bad Habbits</Text>

        </View> 



    );
}

export default Login