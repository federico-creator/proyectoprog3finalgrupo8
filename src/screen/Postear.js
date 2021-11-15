import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth, db} from "../firebase/config"


class Postear extends Component{

    constructor(props){
        super(props)
        this.state={
            title: "",
            description:""
            
        }
    }

    submitPost(){
        db.collection("posts").add({
            user: auth.currentUser.email,
            createdAt: Date.now(),
            title: this.state.title ,
            description: this.state.description ,
            likes: [],
            comments: []
        })
        .then(() => {
            console.log("se posteo exitosamente")
            this.setState({
                title:"",
                description:""
            })
        })
        .catch((err)=>console.log(err))
    }
    render(){
        return(
        < >
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Título"
                    onChangeText={text => this.setState({title:text})}
                    value={this.state.title}
                />
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Description"
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    multiline={true}
                />


                <TouchableOpacity style={styles.touchable}   onPress={()=> this.submitPost()} >
                    <Text style={styles.texto}>Crea tu posteo</Text>
                </TouchableOpacity>


            
        </>)
    }
   
}
const styles = StyleSheet.create({
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
    touchable:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "green",
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

export default Postear