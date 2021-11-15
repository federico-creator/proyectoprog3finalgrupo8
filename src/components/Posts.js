import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput, Modal } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore"
import Comentario from './comentario';
import SeccionModal from './seccionModal';
import SeccionModalLike from './SeccionModalLike';


class Posts extends Component{

    constructor(props){
        super(props)
        this.state={
            liked: false,
            ShowModal: false,
            textoModal: "Ver comentarios",
            likeModal: false,
            likeTextoModal: "Ver likes"
            

        }
    }
    

    render(){
        console.log(this.props.data)
        let {item} = this.props.data
        let {data} = item
        return(
        <View style={styles.container}>
            <Text>Usuario: {data.user}</Text>
            <Text>Titulo: {data.title}</Text>
            <Text>Descripcion: {data.description}</Text>
            <Text>Likes: {data.likes.length}</Text>
             {this.state.liked== false?<TouchableOpacity style={styles.touchable} /* onPress={()=> this.Likear(item,data)} */>
                    <Text style={styles.texto}>Me gusta</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={styles.touchable2} /* onPress={()=> this.Likear(item,data)} */>
                <Text style={styles.texto}>Quitar Like</Text>
            </TouchableOpacity>
            } 

            {/* <SeccionModalLike modal={()=> this.modalLike()} ShowModal={this.state.likeModal} textoModal={this.state.likeTextoModal} data={data}/>

            <Comentario comentario={(coment)=>this.comentario(coment)} /> 

            <SeccionModal modal={()=> this.modal()} ShowModal={this.state.ShowModal} textoModal={this.state.textoModal} data={data}/> */}
        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"black"
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
    touchable2:{
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
    touchable3:{
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
})

export default Posts