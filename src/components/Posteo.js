import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        return (
            <View style={styles.post}>
                <Text style={styles.likes}>Likes</Text>
                <Text style={styles.text}>{datosPost.usuario}</Text>
                <Text style={styles.text}>{datosPost.descripcion}</Text>
                <Text style={styles.comentario}>Comentarios</Text>

            </View>
        );
    }
}
