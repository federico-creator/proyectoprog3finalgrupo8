import React, {Component} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer"
import { StyleSheet } from 'react-native';
const Drawer = createDrawerNavigator();  

import Home from '../screen/Home';
import Register from '../screen/Register';
import Login from '../screen/Login';
import Perfil from '../screen/Perfil';
import BusquedaPerfil from '../screen/BusquedaPerfil';
import {auth,db} from "../firebase/config"
import Postear from '../screen/Postear';


class Navegador extends Component{

    constructor(){
        super()
        this.state={
            logueado:false,
            errores:""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=> {
            if (user) {
                this.setState({
                    logueado: true,
                })
            }
            else{
                this.setState({
                    logueado: false,
                })
            }

        })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
        .then(()=>{return (this.setState({
            logueado: true,
        })
        )})
        .catch((error)=> this.setState({errores: error.message}))
    }

    register(email, pass, username){
        db.collection("usuarios").add({
            user: email,
            userName: username,
            createdAt: Date.now(),
        })
        .then(() => {
        console.log("cargando usuario");
        auth.createUserWithEmailAndPassword(email,pass)
        .then(()=> {return (this.setState({
            logueado: true,
        })
        )})
        .then(()=>{ return(
            this.actualizarusuario(username)
        )})})
        .catch((error)=> this.setState({errores: error.message})) 

    }
    actualizarusuario(username){
        const user = auth.currentUser;

        user.updateProfile({
            displayName: username
        }).then(() => {
            console.log("se actualizo el nombre de usuario")
        }).catch((error) => {
            console.log(error)
        });  
    }
    desloguearse(){
        auth.signOut()

    }
   

    render(){
        return(
                <>
                     {
                        this.state.logueado == false ?
                        <Drawer.Navigator>
                            <Drawer.Screen name="Login" component={(screenprops)=> <Login error={this.state.errores} loguearse={(email,contrase??a)=>this.login(email,contrase??a)} screenprops={screenprops}/>}/>
                            <Drawer.Screen name="Register" component={(screenprops)=> <Register error={this.state.errores} registrarse={(email,contrase??a, username)=>this.register(email,contrase??a, username)} screenprops={screenprops}/>}/>
                        </Drawer.Navigator>:
                        <Drawer.Navigator>
                            <Drawer.Screen name="Home" component={(screenprops)=> <Home screenprops={screenprops}/>} />
                            <Drawer.Screen name="Postear"  component={(screenprops)=> <Postear screenprops={screenprops} />}/>
                            <Drawer.Screen name="Busqueda" component={()=> <BusquedaPerfil/>} />
                            <Drawer.Screen name="Perfil" component={()=> <Perfil desloguearse={()=>this.desloguearse()} />} />
                        </Drawer.Navigator>                                          
                    }                                                        
                </>

           
        )
    }
    
   
}
const styles = StyleSheet.create({

    iconos:{
        height:10,
        width:10,
        color:"red"
    }
})


export default Navegador