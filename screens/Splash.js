import { View, Image, Text} from "react-native"
import styles from "../styles"
import * as goTo from '../pages/goTo';

const Splash = () => {

    setTimeout(() => {
        goTo.replace('Home')
    }, 2000)

    return <View style={styles.verticalCenter}>
        <Image source={require('../assets/croc.png')} style={styles.gata} />
        <Text style={styles.splashTitle}>Alli</Text>
        <Text style={styles.splashSubhead}>Chomp Away Bad Habits</Text>
    </View>
}

export default Splash