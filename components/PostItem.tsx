import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

type PostItemProps = {
    post: Post;
    onEdit: (post: Post) => void;
};

export const PostItem = ({ post, onEdit }: PostItemProps) => {
    return (
        <View style={styles.postItem}>
            <View style={styles.textContainer}>
                <Text style={styles.postTitle}>{post.id}. {post.title}</Text>
                <Text style={styles.postBody}>{post.body}</Text>
            </View>

            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => onEdit(post)}
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    postItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textContainer: {
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    postBody: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    editButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    }
});