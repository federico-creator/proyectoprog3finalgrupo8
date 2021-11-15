import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';

class Comentario extends Component{

    constructor(props){
        super(props)
        this.state={
            comentario:"",
        }
    }

    coment(){
        this.props.comentario(this.state.comentario)
        .then(()=>this.setState({
            comentario: ""
        }))
        
    }

    render(){
        return(
        <View style={styles.container}>
            <View>

                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Escriba un comentario"
                    onChangeText={text => this.setState({comentario:text})}
                    value={this.state.comentario}

                />


                <TouchableOpacity style={styles.touchable} onPress={()=> this.coment(this.state.comentario)}>
                    <Text style={styles.texto}>Escribir comentario</Text>
                </TouchableOpacity>



            </View>
        </View>)
    }
   
}
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingHorizontal: 10,
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
    }
})

export default Comentario