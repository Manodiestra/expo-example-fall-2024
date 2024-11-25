import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default Navigation = () => {

    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.navButtonContainer}>
                <Button mode="contained" onPress={() => router.push('/UserList')}>
                    Home
                </Button>
            </View>
            <View style={styles.navButtonContainer}>
                <Button mode="contained" onPress={() => router.push('/aboutUs')}>
                    About Us
                </Button>
            </View>
            <View style={styles.navButtonContainer}>
                <Button mode="contained" onPress={() => router.push('/WeatherDashboard')}>
                    Weather Dashboard
                </Button>
            </View>
            <View style={styles.navButtonContainer}>
                <Button mode="contained" onPress={() => router.push('/AddUserForm')}>
                    Add User Form
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    navButtonContainer: {
        flex: 1,
        margin: 8,
    },
});
