import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { storage} from "../firebase/config"
import {Camera} from "expo-camera"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'


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
            console.log(photo)
            this.setState({
                photo:photo.uri
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
                                    this.setState({
                                        photo:null
                                    })
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
                        style={{width:"100", flex:1}}
                        source={{uri: this.state.photo}}
                    />
                    <View>
                        <TouchableOpacity onPress= {()=>this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>(this.setState({photo: null}))}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </>:
                <>
                    <Camera 
                        style={{flex:1,width:"100"}}
                        type= {Camera.Constants.Type.front}
                        ref={(cam)=> (this.camera = cam)}
                    />
                    <TouchableOpacity onPress={()=> this.takePicture()}>
                        <FontAwesomeIcon  style={styles.iconocamara} icon={ faCamera } />
                    </TouchableOpacity>
                </>}
            </>
        )
    }
   
}
const styles = StyleSheet.create({
    iconocamara:{
        alignContent:"center",
        height:50,
        width:50
    }
})

export default MyCamera