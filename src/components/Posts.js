import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput, Modal } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore"
/* import Comentario from './comentario';
import SeccionModalcoments from './seccionModalcoments';
import SeccionModalLike from './SeccionModalLike'; */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


class Posts extends Component{

    constructor(props){
        super(props)
        this.state={
            likes: 0,
            liked: false,
            comentModal: true,
            likeModal: true,
            

        }
    }

    componentDidMount() {
        this.recieveLikes();
    }
    
    recieveLikes() {
        let likes = this.props.data.likes;
        if(likes) {
            this.setState({
                likes: likes.length
            })
        }
        if(likes.includes(auth.currentUser.email)
        ){
            this.setState({
                liked: true
            })
        }
    }

    likePost() {
        let post = db.collection("posts").doc(this.props.data.id);

// Set the "capital" field of the city 'DC'
        post.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
            console.log("likeado");
        })
        .catch((error) => {
    // The document probably doesn't exist.
            console.log(error);
        });


    }

    unlikePost() {
        let post = db.collection("posts").doc(this.props.data.id);

// Set the "capital" field of the city 'DC'
        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes - 1,
                liked: false
            })
            console.log("deslikeado");
        })
        .catch((error) => {
    // The document probably doesn't exist.
            console.log(error);
        });
        
    }

    render(){
        console.log(this.props.data)
        let {item} = this.props.data
        let {data} = item
        return(
        <View style={styles.container}>
            {data.photo == ""?"":<Image style={styles.imagen} source={{uri:`${data.photo}`}} resizeMode="contain"/>}
            <Text>Usuario: {data.user}</Text>
            <Text>Titulo: {data.title}</Text>
            <Text>Descripcion: {data.description}</Text>
            <Text>Likes: {data.likes.length}</Text>
            <View style={styles.iconContainer}>
                {this.state.liked== false?
                    // <TouchableOpacity onPress={() => this.likePost()}>
                    //         <text>Likear</text>
                    // </TouchableOpacity>
                
                    // <TouchableOpacity onPress={() => this.unlikePost()}>
                    // <text>Deslikear</text>
                    // </TouchableOpacity>
                    
                    <TouchableOpacity  /* onPress={()=> this.Likear(item,data)} */>
                        <FontAwesomeIcon  style={styles.textocorazongris} icon={ faHeart } />
                    </TouchableOpacity>
                :
                    <TouchableOpacity /* onPress={()=> this.Likear(item,data)} */>
                        <FontAwesomeIcon   style={styles.textocorazonrojo} icon={ faHeart } />
                    </TouchableOpacity>
                } 
                    <TouchableOpacity   /* onPress={()=> this.modalLike()} */>
                        <FontAwesomeIcon   icon={ faInfoCircle } />
                    </TouchableOpacity>
                    <TouchableOpacity  /* onPress={()=> this.modalComent()} */>
                        <FontAwesomeIcon   icon={ faComment } />
                    </TouchableOpacity>
            </View>
             


            {this.state.likeModal?/* <SeccionModalLike modal={()=> this.modalLike()}  data={data}/>*/"hola":"chau"}
            

            {this.state.comentModal?/*<Comentario comentario={(coment)=>this.comentario(coment)} /> <SeccionModalcoments modal={()=> this.modalComent()}   data={data}/> */"hola":"chau"}


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
    textocorazongris:{
        color:"gray"
    },
    textocorazonrojo:{
        color:"red"
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
    iconContainer:{
        textAlign:"center",
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"gray",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    imagen:{
        width:250,
        height:250,
    },
})

export default Posts