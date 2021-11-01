import React, {Component} from "react";
import{
    TextInput, View, TouchableOpacity,
} from "react-native";

class login extends Component{
    
    constructor(){
        super()
        this.state = {
            mail: "",
            password: "",
        }
    }
    render(){
        return(
            <View style={StyleSheet.container}>
                <TextInput
                    placeholder="e-mail" 
                    onChangeText={text=> this.setState({mail: text})} 
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput style={styles.field}
                    keyboardType="default"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password:text})}
                />
                <TouchableOpacity 
                    style={styles.touchsble}
                    onPress={() => this.onSubmit()}>
                    <Text style={styles.touchableText}>Login</Text>
                </TouchableOpacity>
            </View>

            
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     textAlign: "center",
    //     padding: 10,
    // },
    input: {
        height: 40,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginVertical:10,
    },
});