import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Posteo';

export default function Profile(props) {
    const [userName, setUserName] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    setUserName(doc.data().userName);
                });
            });
    }, []);

    useEffect(() => {
        db.collection('posts')
            .where('email', '==', auth.currentUser.email)
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let postsDelUsuario = [];

                docs.forEach(doc => {
                    postsDelUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosts(postsDelUsuario);
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>

            <Text style={styles.text}>Nombre de usuario: {userName}</Text>
            <Text style={styles.text}>Email: {auth.currentUser.email}</Text>

            <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </Pressable>

            <Text style={styles.subtitle}>Mis posteos</Text>

            {posts.length === 0 ? (
                            <Text style={styles.noPosts}>No hay publicaciones aún.</Text>
                        ) : (
                            <FlatList
                                data={posts}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <Post id={item.id} data={item.data} navigation={props.navigation} />}
                            />
                        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noPosts: { textAlign: 'center', 
        marginTop: 20, 
        color: '#777' },
    post: { marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,}
});