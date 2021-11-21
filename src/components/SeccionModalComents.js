import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';



class SeccionModalComents extends Component{

    constructor(props){
        super(props)
        this.state={          
        }
    }


    render(){
        
        return(
        <View>
            
                <Modal style={styles.modal} 
                visible={this.props.ShowModal}
                animationType="none"
                transparent={false}>
                    {this.props.data.comments.length== 0? <Text>"no existen comentarios, empeza a escribirlos"</Text>:
                        <FlatList  data={this.props.data.comments}
                        keyExtractor= {(data)=> data.fechaDeCreacion.toString()}
                        renderItem={({item})=> <Text> {item.usuario} escribio: {item.texto} </Text>}  /> 
                    }
                </Modal>
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
    modal:{
        width:"100%",
        borderColor:"black"
    }
})

export default SeccionModalComents