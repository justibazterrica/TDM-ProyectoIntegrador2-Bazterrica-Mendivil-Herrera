import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import NuevoComentario from '../components/NuevoComentario';
import Comentar from '../components/Comentar';

function Comentarios(props) {
    const [listaComentarios, setListaComentarios] = useState([]);
    console.log('props comments', props);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let comentariosAux = [];
                docs.forEach(doc => {
                    if(doc.id === props.route.params.id){
                        comentariosAux.push({
                            id: doc.id,
                            datacoment: doc.data() 
                        });
                    }
                });
                console.log('comentariosAux', comentariosAux);
                setListaComentarios(comentariosAux[0].datacoment.Coments);
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
                    renderItem={({ item }) => <NuevoComentario data={item} />}
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