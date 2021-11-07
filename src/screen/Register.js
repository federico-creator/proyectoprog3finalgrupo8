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

    render(){
        return(
        <View style={styles.container}>
        
            <Text styles={styles.centrado}> Hello world</Text>

            <View>

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
                {this.props.error==""?"": <Text style={styles.textoerror}>{this.props.error}</Text>}

                <TouchableOpacity style={styles.touchable}  onPress={()=> this.props.registrarse(this.state.email,this.state.pasword)}>
                    <Text style={styles.texto}>Registrarse</Text>
                </TouchableOpacity>



            </View>
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
    }
})

export default Register