import React from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

type PostFormProps = {
    title: string;
    setTitle: (text: string) => void;
    body: string;
    setBody: (text: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    isSubmitting: boolean;
    isEditing: boolean;
};

export const PostForm = ({ 
    title, setTitle, body, setBody, 
    onSubmit, onCancel, isSubmitting, isEditing 
}: PostFormProps) => {
    
    return (
        <View style={styles.formContainer}>
            <Text style={styles.subHeader}>
                {isEditing ? 'Edit Post' : 'Create New Post'}
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Body content"
                value={body}
                onChangeText={setBody}
                multiline
            />

            <View style={styles.buttonRow}>
                {isSubmitting ? (
                    <ActivityIndicator color="blue" />
                ) : (
                    <Button 
                        title={isEditing ? "Update Post" : "Create Post"} 
                        onPress={onSubmit} 
                        color={isEditing ? "#da8312ff" : "#2196F3"}
                    />
                )}
                
                {isEditing && (
                    <View style={{marginLeft: 10}}>
                        <Button title="Cancel" color="#242323ff" onPress={onCancel} />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    buttonRow: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
});