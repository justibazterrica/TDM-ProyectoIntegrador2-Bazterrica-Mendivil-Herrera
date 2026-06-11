import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';


function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

useEffect(() => {
  auth.onAuthStateChanged(user => {
    if (user) {
      props.navigation.navigate('TabNavigator');
    }
  });
}, []);

  function onSubmit() { 

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Login exitoso");
        props.navigation.navigate('TabNavigator');
      })


      .catch(error =>{ 
        const errorPArseado = JSON.parse(error.message)
        setError(errorPArseado.error.message)
      })

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.field}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => {
          setEmail(text)
          setError("")
        }}
        value={email}
      />

      <TextInput
        style={styles.field}
        placeholder="Contraseña"
        keyboardType="default"
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text)
          setError("")
        }}
        value={password}
      />

      <Text style={styles.error}> {error}</Text>

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonTexto}>Ingresar</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },

  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  

  button: {
    backgroundColor: "#282ecc",
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },


  buttonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  error:{
    color: "red",
    textAlign: "center",
    margin: 10, 
    backgroundColor: "rgb(255, 221, 221)",

  }
});

export default Login;