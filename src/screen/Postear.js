import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {auth, db} from "../firebase/config"
import MyCamera from '../components/MyCamera';


class Postear extends Component{

    constructor(props){
        super(props)
        this.state={
            title: "",
            description:"",
            camera: false,
            url:"",

        }
    }

    submitPost(){
        db.collection("posts").add({
            user: auth.currentUser.email,
            userName: auth.currentUser.displayName,
            createdAt: Date.now(),
            title: this.state.title ,
            description: this.state.description ,
            likes: [],
            comments: [],
            photo: this.state.url
        })
        .then(() => {
            this.setState({
                title:"",
                description:""
            })
        })
        .catch((err)=>console.log(err))
    }

    habilitarCamara(){
        this.setState({
            camera: true
        })
    }

    onImageUpload(url) {
        this.setState({
            url: url,
            camera: false
        })
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

                <TouchableOpacity style={styles.touchable2}   onPress={()=> this.habilitarCamara()} >
                    <Text style={styles.texto2}>Agregar una foto al posteo</Text>
                </TouchableOpacity>

                {this.state.camera? <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/>:""}

                {this.state.title.length==0|| this.state.description.length==0? 
                    <TouchableOpacity style={styles.touchablegray}    >
                        <Text style={styles.texto}>Crea tu posteo</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.touchable}   onPress={()=> this.submitPost()} >
                        <Text style={styles.texto}>Crea tu posteo</Text>
                    </TouchableOpacity>
                }


            
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
    touchablegray:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "grey",
        marginBottom: 10,
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"grey"
        

    },
    touchable2:{
        textAlign:"center",
        padding: 5,
        backgroundColor: "yellow",
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
    texto2:{
        color:"black"
    },
})

export default Postear