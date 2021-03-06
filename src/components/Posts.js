import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore"
import Comentario from './Comentario';
import SeccionModalcoments from './SeccionModalComents';
import SeccionModalLike from './SeccionModalLike'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'



class Posts extends Component{

    constructor(props){
        super(props)
        this.state={
            liked: false,
            comentModal: false,
            likeModal: false,
            estilo: this.props.data.item.data.estiloPhoto
            

        }
    }

    componentDidMount() {
        this.recieveLikes();
    }
    
    recieveLikes() {
        let likes = this.props.data.item.data.likes;
        
        if(likes.includes(auth.currentUser.email)
        ){
            this.setState({
                liked: true
            })
        }
        else{
            this.setState({
                liked: false
            })
        }
    }

    likePost() {
        let post = db.collection("posts").doc(this.props.data.item.id);
        if(this.state.liked == false) {
            post.update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    liked: true
                })
            })
            .catch((error) => {
        
                console.log(error);
            });
            
        }
        else{
            post.update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    liked: false
                })
            })
            .catch((error) => {
        
                console.log(error);
            });
        }   
        
    }

    comentario(coment){
        console.log(coment)
         let cometariousuario= {texto: coment,
                                usuario: auth.currentUser.email,
                                fechaDeCreacion: Date.now()}
        var agregarComentario = db.collection("posts").doc(`${this.props.data.item.id}`);

        return agregarComentario.update({
            comments : firebase.firestore.FieldValue.arrayUnion(cometariousuario)
        })
        .then(() => {
            console.log("comentario exitoso");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });  
        
    }

    modalComent(){
        if (this.state.comentModal) {
            this.setState({
                comentModal: false,
            })   
        }
        else{
            this.setState({
                comentModal: true,
            })  
        }

    }
    modalLike(){
        if (this.state.likeModal) {
            this.setState({
                likeModal: false,
            })   
        }
        else{
            this.setState({
                likeModal: true,
            })  
        }

    }

    render(){
        let {item} = this.props.data
        let {data} = item
        return(
        <View style={styles.container}>
            {data.photo == ""?<Text></Text>:<>
                        {this.state.estilo== null?<Image 
                            style={styles.imagenbasica}
                            source={{uri: data.photo}}
                            resizeMode="contain"
                        />:<>{this.state.estilo== "ByN"?<Image 
                            style={styles.imagenbyn}
                            source={{uri: data.photo}}
                            resizeMode="contain"
                        />:<>{this.state.estilo== "Sepia"?<Image 
                        style={styles.imagenSepia}
                        source={{uri: data.photo}}
                        resizeMode="contain"
                        />:<><Image 
                        style={styles.imagenInvertida}
                        source={{uri: data.photo}}
                        resizeMode="contain"
                        /></>}</>}</>}</>}
            <Text>Usuario: {data.user} tamb??en conocido como: {data.userName}</Text>
            <Text>Titulo: {data.title}</Text>
            <Text>Descripcion: {data.description}</Text>
            <Text>Likes: {data.likes.length}</Text>
            <View style={styles.iconContainer}>
                {this.state.liked== false?
                    
                    <TouchableOpacity  onPress={()=> this.likePost()} >
                        <FontAwesomeIcon  style={styles.textocorazongris} icon={ faHeart } />
                    </TouchableOpacity>
                :
                    <TouchableOpacity  onPress={()=> this.likePost()} >
                        <FontAwesomeIcon   style={styles.textocorazonrojo} icon={ faHeart } />
                    </TouchableOpacity>
                } 
                    <TouchableOpacity    onPress={()=> this.modalLike()} >
                        <FontAwesomeIcon   icon={ faInfoCircle } />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> this.modalComent()} >
                        <FontAwesomeIcon   icon={ faComment } />
                    </TouchableOpacity>
            </View>
             


            {this.state.likeModal? <SeccionModalLike data={data}/>:<Text></Text>}
            
            
            {this.state.comentModal? <View> <Comentario comentario={(coment)=>this.comentario(coment)} /> <SeccionModalcoments data={data}/> </View> :<Text></Text>}


        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"black",
        backgroundColor: "rgba(176, 136, 135, 0.6)"
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
    imagenbasica:{
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
    },
    imagenbyn:{
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
        filter: "grayscale()"
    },
    imagenSepia:{
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
        filter: "sepia()"
    },
    imagenInvertida:{
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
        filter: "saturate(3)"
    }
})

export default Posts