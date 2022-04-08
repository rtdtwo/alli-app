import { View,Button,Text, Image} from "react-native"
import * as goTo from '../pages/goTo';
import croc from '../assets/croc.png';
import '../login.css';

const Login = () => {
    return ( 

        <View>

        <Button title={'Go Back'}
                onPress={() => goTo.navigate('Home', { userName: 'Lucy' })} /> 
        <img src={croc}
            width={50}
            height={50}
            className = "img"
         />
         <h1 className={styles.title}>Welcome to Ali</h1>
         <p>Chomp out bad habbits</p>

        </View> 



    );
}

export default Login