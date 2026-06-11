import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export default function Posteo( props ) {


    
    if (props.data == {}) {
        return (
            <View style={styles.post}>
                <Text style={styles.noData}>No hay datos para mostrar.</Text>
            </View>
        );
    } 
    else {
        const datosPost = props.data;

        function likePost() {
          if (datosPost.likes.includes(auth.currentUser.email)) {
            let likesFiltrados = datosPost.likes.filter(email => email !== auth.currentUser.email);
            
            db.collection('posts')
              .doc(props.id)
              .update({
                likes: likesFiltrados,
                likeado: false
              })
              .then(() => {
                console.log('Post deslikeado correctamente');
              })
              .catch(error => console.log(error));

          } else {
            datosPost.likes.push(auth.currentUser.email);

            db.collection('posts')
              .doc(props.id)
              .update({
                  likes: datosPost.likes,
                  likeado: true

            })
              .then(() => {
                console.log('Post likeado correctamente');
              })
            .catch(error => console.log(error));
         }
      }

        return (
            <View style={styles.post}>
                <Pressable onPress={likePost}>
                  {datosPost.likeado === true ?(
                    <Text style={styles.comentario}>No me gusta</Text>
                  ): (
                    <Text style={styles.comentario}>Me gusta</Text>
                  )}
                </Pressable>
                <Text style={styles.likes}>Likes: {datosPost.likes.length}</Text>
                <Text style={styles.text}>Creador: {datosPost.email}</Text>
                <Text style={styles.text}>{datosPost.descripcion}</Text>
                <Pressable style={styles.button} onPress={() => props.navigation.navigate("Comentarios", { screen: "Comentarios",  id: props.id })}>
                    <Text style={styles.buttonText}>Comentar</Text>
                </Pressable>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
    marginTop: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  usuario: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  likes: {
    fontSize: 12,
    color: '#888',
  },
  descripcion: {
    fontSize: 13,
    lineHeight: 18,
    color: '#555',
    marginBottom: 10,
  },
  comentario: {
    fontSize: 12,
    color: '#777'
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#282ecc',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  noData: {
    color: '#777',
    textAlign: 'center',
  },
});
