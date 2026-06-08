import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import NuevoComentario from '../components/NuevoComentario';
import Comentar from '../components/Comentar';

function Comentarios(props) {
    const [listaComentarios, setListaComentarios] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let comentariosAux = [];
                docs.forEach(doc => {
                    comentariosAux.push({
                        id: doc.id,
                        datacoment: doc.data() 
                    });
                });
                setListaComentarios(comentariosAux);
            }, error => {
                console.log("Error al obtener comentarios: ", error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Comentar  id={props.route.params.id} />
            <Text style={styles.title}>Comentarios</Text>
            {listaComentarios.length === 0 ? (
                <Text style={styles.nocoments}>No hay comentarios aún.</Text>
            ) : (
                <FlatList
                    data={listaComentarios}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <NuevoComentario data={item.datacoment} />}
                />
            )}
        </View>
    );
}

export default Comentarios;

const styles = StyleSheet.create({
    container: { flex: 1, 
        padding: 10, 
        backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, 
        fontWeight: 'bold', 
        marginVertical: 15, 
        textAlign: 'center' },
    nocoments: { textAlign: 'center', 
        marginTop: 20, 
        color: '#777' },
    post: { marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,}
});