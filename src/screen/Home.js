import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {db} from "../firebase/config"
import Posts from '../components/Posts';

class Home extends Component{

    constructor(){
        super()
        this.state={
            post : [],
            
        }
    }

    componentDidMount(){
        this.showPost()
        
    }

    showPost(){
        db.collection("posts").orderBy("createdAt","desc").onSnapshot((docs)=>{
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

    Posteo(){
        this.props.screenprops.navigation.navigate("Postear")
    }
    Busqueda(){
        this.props.screenprops.navigation.navigate("Busqueda")
    }

    render(){
        return(
        
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity  onPress={()=> this.Posteo()} style={styles.centrar}>
                        <FontAwesomeIcon icon={ faPlus } />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> this.Busqueda()} style={styles.centrar}>
                        <FontAwesomeIcon icon={ faSearch } />
                    </TouchableOpacity>
                </View>
                <FlatList  
                    data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Posts data={item}/> )}  >
                </FlatList>
            </View>

        )
    }
   
}
const styles = StyleSheet.create({

    centrar:{
        alignItems:"center"
    },
    container: {
        marginTop:20,
        paddingHorizontal: 10,
        backgroundColor:"rgba(0, 0, 0, 0.6)",
        height:"100%",
    },
    iconContainer:{
        textAlign:"center",
        justifyContent:"space-around",
        flexDirection:"row"
    },
})

export default Home