import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, FlatList } from 'react-native';
import {auth, db} from "../firebase/config"
import PostsPerfil from '../components/PostPerfil';

class Perfil extends Component{

    constructor(props){
        super(props)
        this.state={
            post : []
        }
    }
    componentDidMount(){
        this.showPost()
        
    }

    showPost(){
        db.collection("posts").where("user","==",`${auth.currentUser.email}`).onSnapshot((docs)=>{
            let posts = []
            docs.forEach((doc)=>{
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                post: posts
            })
        })
    }

    render(){
        return(
        <View style={styles.container}>
            <Text > Bienvenido: {auth.currentUser.email} conocido como: {auth.currentUser.displayName} </Text>
            <Text > Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
            <Text > Fecha de último loguin: {auth.currentUser.metadata.lastSignInTime} </Text>
            <Text > Ha subido un total de {this.state.post.length} posteos </Text>
            <FlatList  
                data={this.state.post}
                keyExtractor={(data)=> data.id}
                renderItem={(item)=>( <PostsPerfil data={item}/> )}  >
            </FlatList>

            <TouchableOpacity style={styles.touchable} onPress={()=> this.props.desloguearse()}>
                    <Text style={styles.texto}>Desloguearse</Text>
            </TouchableOpacity>


            
        </View>)
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
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
    },
})

export default Perfil