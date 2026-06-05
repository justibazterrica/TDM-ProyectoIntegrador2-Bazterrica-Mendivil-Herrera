import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            const postsData = [];
            snapshot.forEach(doc => {
                postsData.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setPosts(postsData);
        }, error => {
                console.log("Error al obtener posts: ", error);
            })
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            {posts.length === 0 ? (
                <Text style={styles.noPosts}>No hay publicaciones aún.</Text>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Post data={item.data} style={styles.post} />}
                />
            )}
        </View>
    );
}

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