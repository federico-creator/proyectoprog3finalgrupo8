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
            perfilbuscado: false,
            usuarios:[]
        }
    }

    busqueda(){
        (db.collection("usuarios").onSnapshot((docs)=>{
            let user = []
            docs.forEach((doc)=>{
                user.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            let usuariosfiltrados = user.filter((usuario) => usuario.data.user.toLowerCase().includes(this.state.perfil.toLowerCase()))
                this.setState({
                    usuarios: usuariosfiltrados,
                    perfil:"",
                    perfilbuscado: true,
                }) 
        })) 


    }

    showPost(perfil){
        
            (db.collection("posts").where("user", "==", perfil).onSnapshot((docs)=>{
                let posts = []
                docs.forEach((doc)=>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    post: posts,
                    perfilbuscado: false,
                    buscado: true,
                    usuarios:[]
                })
            }))  
        
    }

    
    

    render(){
        return(
            <View style={styles.container}>

            <Text> Esta es pagina para buscar perfil</Text>

            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Buscar perfil"
                onChangeText={text => this.setState({perfil:text})}
                value={this.state.perfil}
            />
        

            {this.state.perfil.length==0?
                <TouchableOpacity style={styles.touchable2}>
                    <Text style={styles.texto}>Buscar Perfil</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.touchable} onPress={()=> this.busqueda()}>
                    <Text style={styles.texto}>Buscar Perfil</Text>
                </TouchableOpacity>
            }
            <FlatList  
                    data={this.state.usuarios}
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <TouchableOpacity onPress={()=> this.showPost(item.item.data.user)}>
                                            <Text style={styles.texto}>{item.item.data.user}</Text>
                                        </TouchableOpacity>  )}  >
            </FlatList>
            <FlatList  
                    data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Posts data={item}/> )}  >
            </FlatList>
            {this.state.perfilbuscado==true && this.state.usuarios.length==0? <Text>No se encuentran usuarios</Text>:<Text></Text>}
            {this.state.buscado==true && this.state.post.length==0? <Text>No existen publicaciones de este usuario</Text>:<Text></Text>}
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