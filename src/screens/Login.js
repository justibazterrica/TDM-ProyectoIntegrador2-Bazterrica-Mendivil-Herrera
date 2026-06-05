import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Login from "../components/Login";   

function LoginScreen() {

    return (
        <View>
          <Login/>
        </View>
    );

}

export default LoginScreen;