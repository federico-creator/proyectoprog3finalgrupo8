import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth} from "../firebase/config"

class SeccionModalComents extends Component{
    
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){

        return(
        < >

            <Text > Este es el Modal de comentarios </Text>
            
        </>)
    }
    
}



const styles = StyleSheet.create({
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "red",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"red"
        

    },
    texto:{
        color:"#FFF"
    },
})

export default SeccionModalComents