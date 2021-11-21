import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';

class Register extends Component{

    constructor(props){
        super(props)
        this.state={
            email:"",
            username:"",
            pasword: "",
        }
    }
    login(){
        this.props.screenprops.navigation.navigate("Login")
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
                placeholder="Nombre de Usuario"
                onChangeText={text => this.setState({username:text})}
            />

            <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                onChangeText={text => this.setState({pasword:text})}
                secureTextEntry={true}
            />
            {this.props.error==""?<Text></Text>: <Text style={styles.textoerror}>{this.props.error}</Text>}

            {this.state.email.length==0|| this.state.pasword.length==0||this.state.username.length==0?
                <TouchableOpacity style={styles.touchablegrey}>
                    <Text style={styles.texto}>Registrarse</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.touchable}  onPress={()=> this.props.registrarse(this.state.email,this.state.pasword,this.state.username)}>
                    <Text style={styles.texto}>Registrarse</Text>
                </TouchableOpacity>
            }

            <TouchableOpacity  onPress={()=> this.login()}>
                <Text style={styles.texto2}>¿Ya tenes Cuenta? Logueate</Text>
            </TouchableOpacity>

        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
    },
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "#28a745",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#28a745"
        

    },
    touchablegrey:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "gray",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"gray"
        

    },
    texto:{
        color:"#FFF"
    },
    input: {
        height: 20,
        borderWidth:1,
        borderStyle:"solid",
        borderColor: "#ccc",
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

    }
})

export default Register