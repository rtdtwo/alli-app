import { View,Button,Text, Image} from "react-native"
import * as goTo from '../pages/goTo';
import croc from '../assets/croc.png';
import styles from './login.css'

const Login = () => {
    return ( 

        <View>

        <Button title={'Go Back'}
                onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
        <img src={croc}
            width={50}
            height={50}
         />

        </View> 



    );
}

export default Login