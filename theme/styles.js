import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  appbarProfile: {
    marginLeft: 'auto'
  },
  fabBottomRight: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  textInput: {
    marginBottom: 8
  },
  textSmall : {
    fontSize: 10
  },
  textSmall : {
    fontSize: 10
  },
  textMediumBold: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  appbarLogo: {
    height: 32,
    width: 32,
    marginLeft: 16
  },
  verticalCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom:0
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
  splashMessageTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  splashMessageText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 8,
    justifyContent: 'center',
    fontSize: 14,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 60,
    marginTop: 80,
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
  form: {
    marginTop:5,
    marginBottom:15,
    fontSize:20,
    padding:24,
  },
  buttonStyle: {
    alignSelf: 'center',
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
  },
  modal: {
    padding: 24
  }
})

export default styles