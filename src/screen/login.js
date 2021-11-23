import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';

class Login extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            pasword: "",
        }
    }

    registro(){
        this.props.screenprops.navigation.navigate("Register")
    }

    render(){
        return(
        <View style={styles.container}>

            
            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({email:text})}
            />

            <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                onChangeText={text => this.setState({pasword:text})}
                secureTextEntry={true}
            />
            {this.props.error==""?<Text></Text>: <Text style={styles.textoerror}>{this.props.error}</Text>}

            {this.state.email.length==0|| this.state.pasword.length==0?
                <TouchableOpacity style={styles.touchable2}>
                    <Text style={styles.texto}>Loguearse</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.touchable} onPress={()=> this.props.loguearse(this.state.email, this.state.pasword)}>
                    <Text style={styles.texto}>Loguearse</Text>
                </TouchableOpacity>
            }

            <TouchableOpacity  onPress={()=> this.registro()}>
                <Text style={styles.texto2}>¿No tenes Cuenta? Registrate</Text>
            </TouchableOpacity>



            
        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
    },
    touchable2:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "rgba(84, 78, 73, 0.9)",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(84, 78, 73, 0.9)"
        

    },
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "rgba(84, 204, 73, 0.9)",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"rgba(84, 204, 73, 0.9)"
        

    },
    texto:{
        color:"#FFF"
    },
    input: {
        height: 50,
        borderWidth:3,
        borderStyle:"solid",
        borderColor: "rgba(176, 145, 0, 0.9)",
        borderRadius:6,
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,
    },
    textoerror: {
        color: "red"
    },
    texto2:{
        color:"black",
        textAlign:"center"

    },
})

export default Login