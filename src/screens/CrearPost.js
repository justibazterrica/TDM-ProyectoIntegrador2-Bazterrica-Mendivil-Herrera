import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/config';

function CrearPost( props ) {
    const [descripcion, setDescripcion] = useState('');
    const usuarioActual = auth.currentUser;

    function newPost() {
        if (descripcion === ""){
            return (
                <View style={styles.container}>
                    <Text style = {styles.error}>La descripción no puede estar vacía.</Text>
                </View>
            )}
        db.collection('posts').add({
            descripcion: descripcion,          
            email: usuarioActual.email,           
            createdAt: Date.now(), 
            likeado: false,                
            likes: [],
            Coments: []                                                  
        })
        .then(() => {
           
            setDescripcion('');
            props.navigation.navigate('Home', { screen: 'Home' });
        })
        .catch(error => {
            console.log("Error al crear el post: ", error);
        });
        }
    
    return (
       <View style={styles.container}>
            <Text style={styles.title}>Nuevo Post</Text>
            <TextInput
                style={styles.input}
                placeholder="¿Qué estás pensando?"
                multiline
                onChangeText={text => setDescripcion(text)}
                value={descripcion}
            />
            <Pressable style={styles.button} onPress={newPost}>
                <Text style={styles.buttonText}>Publicar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, 
        padding: 20,},
    title: { fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center' },
    input: { height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10 },  
    button: { backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center' },
    buttonText: { color: '#fff',
        fontSize: 16,
        fontWeight: 'bold' },
    error: { color: 'red',
        textAlign: 'center',
        marginBottom: 15 }
}); 

export default CrearPost;
