import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Posts from '../components/Posts';
import {db} from "../firebase/config"
class BusquedaPerfil extends Component{

    constructor(){
        super()
        this.state={
            perfil:"",
            post: [],
            buscado: false,
        }
    }

    showPost(){
        
            (db.collection("posts").where("user", "==", this.state.perfil).onSnapshot((docs)=>{
                let posts = []
                docs.forEach((doc)=>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    post: posts,
                    perfil:"",
                    buscado: true
                })
            }))  
        
    }

    
    

    render(){
        return(
            <View style={styles.container}>

            <Text> Esta es pagina para buscar perfil</Text>

            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({perfil:text})}
                value={this.state.perfil}
            />
        

            {this.state.perfil.length==0?
                <TouchableOpacity style={styles.touchable2}>
                    <Text style={styles.texto}>Buscar Post</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.touchable} onPress={()=> this.showPost()}>
                    <Text style={styles.texto}>Buscar Post</Text>
                </TouchableOpacity>
            }
            <FlatList  
                    data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Posts data={item}/> )}  >
            </FlatList>
            {this.state.buscado==true && this.state.post.length==0? <Text>No existen publicaciones</Text>:<Text></Text>}
            </View>

            
        )
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
    container: {
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"black",
        backgroundColor: "rgba(176, 136, 135, 0.6)"
    },
})

export default BusquedaPerfil