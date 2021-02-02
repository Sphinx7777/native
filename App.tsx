import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import CustomInput from './src/components/CustomInput';

const App = () => {

    return (
        <View style={styles.container}>
            <CustomInput />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c6f6d5',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        marginTop:40
    },
    text: {
        fontSize: 20,
    }
});


export default App;