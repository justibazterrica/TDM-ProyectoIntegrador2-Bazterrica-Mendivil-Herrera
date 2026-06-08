import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Posteo'; 

function HomePage( props ) {
    const [listaPosts, setListaPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let postsAux = [];
                docs.forEach(doc => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data() 
                    });
                });
                setListaPosts(postsAux);
            }, error => {
                console.log("Error al obtener posts: ", error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            {listaPosts.length === 0 ? (
                <Text style={styles.noPosts}>No hay publicaciones aún.</Text>
            ) : (
                <FlatList
                    data={listaPosts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Post data={item.data} navigation={props.navigation} />}
                />
            )}
        </View>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    container: { flex: 1, 
        padding: 10, 
        backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, 
        fontWeight: 'bold', 
        marginVertical: 15, 
        textAlign: 'center' },
    noPosts: { textAlign: 'center', 
        marginTop: 20, 
        color: '#777' },
    post: { marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,}
});