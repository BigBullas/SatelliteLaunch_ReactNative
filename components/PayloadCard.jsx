import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React from 'react';
import host from '../api';
import defaultImage from '../assets/default_image.jpg'

export default function PayloadCard({props, navigation}) {
    const handlePress = () => {
        navigation.navigate('Satellite', { id: props.payload_id });
    };

    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={props.img_url ? { uri: props.img_url} : defaultImage}
            />
            <View style={styles.container}>
                <Text style={styles.textGreen}>{props.title}</Text>
                <Text style={styles.textGreen}>{props.description}</Text>
                <Text style={styles.textGreen}>Вес: {props.load_capacity} тонн</Text>
            </View>
            <Button title='Подробнее' onPress={handlePress} color='#9048F0'/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 320,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#9048F0',
        borderRadius: 12,
        padding: 24,
        gap: 12,
        margin: 8,
    },
    container: { 
        display: 'flex',
        width: '100%',
        margin: 8,
        justifyContent: 'left',
        alignItems: 'left'
    },
    image: { height: 320, alignSelf: 'stretch' },
    row: { display: 'flex', flexDirection: 'column' },
    text: { color: '#f0f0f0', fontSize: 16 },
    textGreen: {fontSize: 18 , marginBottom: 5},
});