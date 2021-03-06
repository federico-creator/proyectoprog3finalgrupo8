import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
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
            estilo: null

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
            photo: this.state.url,
            estiloPhoto: this.state.estilo
        })
        .then(() => {
            this.setState({
                title:"",
                description:"",
                url:""
            })
            this.props.screenprops.navigation.navigate("Home")
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
        < View style={styles.container}>
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

                {this.state.url==""? <TouchableOpacity style={styles.touchable2}   onPress={()=> this.habilitarCamara()} >
                    <Text style={styles.texto2}>Agregar una foto al posteo</Text>
                </TouchableOpacity>:<>
                        {this.state.estilo== null?<Image 
                            style={styles.imagenbasica}
                            source={{uri: this.state.url}}
                            resizeMode="contain"
                        />:<>{this.state.estilo== "ByN"?<Image 
                            style={styles.imagenbyn}
                            source={{uri: this.state.url}}
                            resizeMode="contain"
                        />:<>{this.state.estilo== "Sepia"?<Image 
                        style={styles.imagenSepia}
                        source={{uri: this.state.url}}
                        resizeMode="contain"
                        />:<><Image 
                        style={styles.imagenInvertida}
                        source={{uri: this.state.url}}
                        resizeMode="contain"
                        /></>}</>}</>}

                        <Text> Agregale estilo a la imagen</Text>
                        <View>
                            <TouchableOpacity  onPress={()=>(this.setState({estilo: "ByN"}))}  >
                                <Text>Blanco y negro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={()=>(this.setState({estilo: "Sepia"}))}>
                                <Text>Sepia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity   onPress={()=>(this.setState({estilo: "Saturado"}))} >
                                <Text>Saturar</Text>
                            </TouchableOpacity>
                                                             
                        </View>
                        </>}
               

                {this.state.camera? <MyCamera onImageUpload={(url)=> this.onImageUpload(url)}/>:<Text></Text>}

                {this.state.title.length==0|| this.state.description.length==0? 
                    <TouchableOpacity style={styles.touchablegray}    >
                        <Text style={styles.texto}>Crea tu posteo</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.touchable}   onPress={()=> this.submitPost()} >
                        <Text style={styles.texto}>Crea tu posteo</Text>
                    </TouchableOpacity>
                }


            
        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
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

export default Postear