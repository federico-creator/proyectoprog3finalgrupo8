import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { storage} from "../firebase/config"
import {Camera} from "expo-camera"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'


class MyCamera extends Component{

    constructor(props){
        super(props)
        this.state={
            permission: false,
            photo: null,
        }
        this.camera
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permission: true
            })
        })
        .catch((err)=>console.log(err))

        Camera.getAvailableCameraTypesAsync()
        .then((res)=> console.log(res))
    }

    takePicture(){
        this.camera.takePictureAsync()
        .then((photo)=>{
            this.setState({
                photo:photo.uri,
            })
        })
        .catch((err)=>console.log(err))

    }

    savePhoto(){
        fetch(this.state.photo)
            .then((res)=> res.blob())
                .then((image)=>{
                    const ref = storage.ref(`photos/${Date.now()}.jpg`)
                    ref.put(image)
                        .then(()=>{
                            ref.getDownloadURL()
                                .then((url)=> {
                                    this.props.onImageUpload(url)
                                })
                        })
                })
            .catch((err)=>console.log(err))
    }

    
    render(){
        return(
            <>   
                    {this.state.photo ?
                    <>                    
                        <Image 
                            style={{ width:"100%",
                            height:300,
                            alignContent:"center",
                            marginVertical:10,}}
                            source={{uri: this.state.photo}}
                        />
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress= {()=>this.savePhoto()}>
                                <FontAwesomeIcon  style={styles.iconosi} icon={ faCheckCircle } />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>(this.setState({photo: null}))}>
                                <FontAwesomeIcon  style={styles.iconono} icon={ faBan } />
                            </TouchableOpacity>
                        </View>
                        
                    </>:
                    <> 
                        <Camera 
                            style={{flex:1,width:"100"}}
                            type= {Camera.Constants.Type.front}
                            ref={(cam)=> (this.camera = cam)}
                        />
                        
                        <TouchableOpacity style={styles.centrar} onPress={()=> this.takePicture()}>
                            <FontAwesomeIcon  style={styles.iconocamara} icon={ faCamera } />
                        </TouchableOpacity>
                    </>}
                    
                   
            </>
        )
    }
   
}
const styles = StyleSheet.create({
    centrar:{
        alignItems:"center"
    },
    iconocamara:{
        height:50,
        width:50
    },
    iconosi:{
        height:30,
        width:30,
        color:"green"
    },
    iconono:{
        height:30,
        width:30,
        color:"red"
    },
    iconContainer:{
        textAlign:"center",
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"gray",
        justifyContent:"space-around",
        flexDirection:"row",
    },
})

export default MyCamera