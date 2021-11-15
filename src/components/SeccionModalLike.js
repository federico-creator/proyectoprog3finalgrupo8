import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'



class SeccionModalLike extends Component{

    constructor(props){
        super(props)
        this.state={
          

        }
    }


    render(){
        
        return(
        <View>
            
            <TouchableOpacity style={styles.touchable3} onPress={()=> this.props.modal()}>
                <Text style={styles.texto}>{this.props.textoModal}</Text>
            </TouchableOpacity>

            { this.props.likeModal?
                <Modal visible={this.props.likeModal}
                animationType="none"
                transparent={false}>
                    {this.props.data.comments.length== 0? <Text>"no existen Likes, se el primero"</Text>:
                        <FlatList  data={this.props.data.likes}
                        keyExtractor= {(data)=> data}
                        renderItem={({item})=> <Text> {item} le dio like </Text>}  /> //Render item si o si tiene que tener el objeto item para funcionar
                    }
                </Modal>:
                <Text></Text>
            }
        </View>)
    }
   
}
const styles = StyleSheet.create({
    texto:{
        color:"#FFF"
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

export default SeccionModalLike