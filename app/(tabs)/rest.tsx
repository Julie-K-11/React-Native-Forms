import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, FlatList, Alert,Keyboard} from 'react-native';
import { api } from '@/app/lib/api';
import { PostItem , Post} from '@/components/PostItem';
import { PostForm } from '@/components/PostForm';

export default function RestApiScreen() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const [inputTitle, setInputTitle] = useState('');
    const [inputBody, setInputBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const getPosts = async () => {
        setLoading(true);
        try {
            const res = await api.get<Post[]>('/posts?_limit=5');
            setPosts(res.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async () => {
        try {
            const res = await api.post<Post>('/posts', {
                title: inputTitle,
                body: inputBody,
                userId: 1,
            });
            setPosts((prev) => [res.data, ...prev]);
            Alert.alert('Success', 'Post created!');
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdatePost = async () => {
        if (!editingPostId) return;
        try {
            const res = await api.put<Post>(`/posts/${editingPostId}`, {
                id: editingPostId,
                title: inputTitle,
                body: inputBody,
                userId: 1,
            });
            setPosts((prevPosts) => 
                prevPosts.map((post) => post.id === editingPostId ? res.data : post)
            );
            Alert.alert('Success', 'Post updated!');
            resetForm();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update post');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const handleSubmit = () => {
        if (!inputTitle.trim() || !inputBody.trim()) {
            Alert.alert('Validation', 'Fill all fields');
            return;
        }
        Keyboard.dismiss();
        setIsSubmitting(true);
        if (editingPostId) handleUpdatePost();
        else handleCreatePost();
    };

    const startEdit = (post: Post) => {
        setEditingPostId(post.id);
        setInputTitle(post.title);
        setInputBody(post.body);
    };

    const resetForm = () => {
        setEditingPostId(null);
        setInputTitle('');
        setInputBody('');
        Keyboard.dismiss();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Блог</Text>

            <PostForm 
                title={inputTitle}
                setTitle={setInputTitle}
                body={inputBody}
                setBody={setInputBody}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                isSubmitting={isSubmitting}
                isEditing={!!editingPostId}
            />

            <View style={styles.listContainer}>
                <View style={styles.listHeaderRow}>
                    <Text style={styles.subHeader}>Posts List</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="darkgreen" />
                ) : (
                    <FlatList
                        data={posts}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={({ item }) => (
                             <PostItem post={item} onEdit={startEdit} />
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        paddingTop: 50
    },
    header: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    listContainer: {
        flex: 1,
    },
    listHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});