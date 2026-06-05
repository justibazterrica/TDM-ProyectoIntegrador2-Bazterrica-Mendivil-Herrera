import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import { TurboModuleRegistry } from 'react-native';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit() {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.navigate('TabNavigator');
      })
      .catch(error => setError(error));
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

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

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Ingresar</Text>
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


  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Login;