import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 30,
  },
  title2: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    maxWidth: 160,  
    marginTop: 20,
    marginBottom: 30,
  },
  gata: {
    alignSelf: 'center',
    justifyContent: 'center',
    width:70,
    height:70,
    marginTop: 35,
  },
  textBox: {
    marginTop:5,
    marginBottom:15,
    fontSize:20,
    borderWidth: 1,
    padding:10,
    width: '42%',
  },
  buttonStyle: {
    marginTop: 10,
    width: '60%',
    padding:10,
    alignSelf: 'center',
  },
  formWrapper:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  custTextsize:{
    marginTop:5,
    marginBottom:15,
    fontSize:20,
    borderWidth: 1,
    padding:10,
    width: '64%',
  },
  age:{
    marginTop:5,
    marginBottom:15,
    fontSize:20,
    borderWidth: 1,
    padding:10,
    width: '20%',
  }
})

export default styles