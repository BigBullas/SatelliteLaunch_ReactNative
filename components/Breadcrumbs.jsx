import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';

export default function Breadcrumbs({ page }) {
    console.log("breadcrump: ", page)
    return (
    <View>
        <View style={styles.breadcrumb}>
            <Link to={ '/Satellite-List' }>
                <Text style={styles.breadcrumb}>Космические аппараты</Text>
            </Link>
            
            {!!page && (
                <Text style={styles.breadcrumb}>
                    { " -> " + page.title }
                </Text>
             )}
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    breadcrumb: { fontSize: 16, marginTop: 10, display: 'flex', flexDirection: 'row' }
});