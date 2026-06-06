import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase/config';


function comentar( props ) {
    const [comentario, setComentario] = useState('');
    const usuarioActual = auth.currentUser;

    function nuevoComentario() {

        db.collection('posts').add({
            comentario: comentario,
            email: usuarioActual.email,           
                                                            
        })
        .then(() => {
            setComentario('');
        })
        .catch(error => {
            console.log("Error al crear el post: ", error);
        });
        }
    
    return (
       <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>
            <TextInput
                style={styles.input}
                placeholder="Comentario.."
                multiline
                onChangeText={text => setComentario(text)}
                value={comentario}
            />
            <Pressable style={styles.button} onPress={nuevoComentario}>
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

export default comentar;