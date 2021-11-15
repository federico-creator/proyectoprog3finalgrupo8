import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {db} from "../firebase/config"
import Posts from '../components/Posts';

class Home extends Component{

    constructor(){
        super()
        this.state={
            post : []
            
        }
    }

    componentDidMount(){
        this.showPost()
        
    }

    showPost(){
        db.collection("posts").onSnapshot((docs)=>{
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
        
            <View>
                <Text> Esta es la home</Text>
                <FontAwesomeIcon icon={ faCoffee } />
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
})

export default Home