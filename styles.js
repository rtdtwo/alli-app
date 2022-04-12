import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  verticalCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  splashTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 60,
  },
  splashSubhead: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 60,
    marginTop: 20,
  },
  title2: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    maxWidth: 160,  
    marginTop: 8,
    marginBottom: 30,
  },
  gata: {
    alignSelf: 'center',
    justifyContent: 'center',
    width:70,
    height:70,
    marginTop: 25,
  },
  textBox: {
    marginTop:5,
    marginBottom:15,
    fontSize:20,
    borderWidth: 1,
    padding:10,
  },
  buttonStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom:5,
    left:20,
    width: '90%',
  },
  formWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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