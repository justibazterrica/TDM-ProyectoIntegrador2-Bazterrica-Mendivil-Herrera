import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function NuevoComentario( props ) {
    
    const datosComentario = props.data;
    if (datosComentario == {}) {
        return (
            <View style={styles.post}>
                <Text style={styles.noData}>No hay datos para mostrar.</Text>
            </View>
        );
    } 
    else {
        return (
            <View style={styles.post}>
                <Text style={styles.text}>Creador: {datosComentario.email}</Text>
                <Text style={styles.text}>{datosComentario.comentario}</Text>
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
  
  text: {
    fontSize: 12,
    color: '#777',
  },
  noData: {
    color: '#777',
    textAlign: 'center',
  },
});
