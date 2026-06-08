import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function onSubmit() {

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        db.collection('users').add({
          email: userCredential.user.email,
          username: username,
        })
        .then(() => {
          props.navigation.navigate('Login');
        })
      })
      .catch(error => setError(error.message));

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.field}
        placeholder="Nombre de usuario"
        keyboardType="default"
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <TextInput
        style={styles.field}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.field}
        placeholder="Contraseña"
        keyboardType="default"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <Text style={styles.error}> {error}</Text>

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
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


  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 

  link: {
    color: '#555',
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

export default Register;