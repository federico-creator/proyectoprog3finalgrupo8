import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';



class SeccionModalComents extends Component{

    constructor(props){
        super(props)
        this.state={  
            comentarios: [],  
            numeros: this.props.data.comments.length     
        }
    }
    componentDidMount(){
        this.ordenarComentario()
    }

    ordenarComentario(){
        let comentariosOrdenados = []
        let comentariosAscendentes = this.props.data.comments.map((comentario)=>comentario.fechaDeCreacion)
        comentariosAscendentes.sort()
        comentariosAscendentes.reverse()
        comentariosAscendentes.map((comentario)=>(
            comentariosOrdenados= comentariosOrdenados.concat(this.props.data.comments.filter((comentarios) => comentarios.fechaDeCreacion.toString().includes(comentario.toString()) ))
          ))
        console.log(comentariosOrdenados)
      this.setState({
          comentarios:comentariosOrdenados
      })
    }

    paraactualizarse(){
        this.ordenarComentario()
        this.setState({
            numeros: this.props.data.comments.length
        })

    }


    render(){
        console.log(this.state.comentarios)
        if(this.state.numeros == this.props.data.comments.length){
        }
        else{
            this.paraactualizarse()
        }
        
        return(
        <View>
            
                <Modal style={styles.modal} 
                visible={this.props.ShowModal}
                animationType="none"
                transparent={false}>
                    {this.state.comentarios.length== 0? <Text>no existen comentarios, empeza a escribirlos</Text>:
                        <FlatList  data={this.state.comentarios}
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