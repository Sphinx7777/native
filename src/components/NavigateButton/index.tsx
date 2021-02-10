import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';



type ProfileScreenNavigationProp = StackNavigationProp<any, any>

interface INavBtnProps extends ProfileScreenNavigationProp {
    navigation: ProfileScreenNavigationProp;
    path: string;
    title: string;
    color?: string;
}

export const NavigateButton = (props: INavBtnProps) => {
    const { navigation, path, title, color } = props;
    return (
        <TouchableOpacity
        style={{...styles.button, borderColor: color || '#1f6b4e', backgroundColor: color || '#1f6b4e',}}
        onPress={() =>
            navigation.navigate(path)
        }>
        <Text style={styles.buttonText}>{title || ''}</Text>
    </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        width: 85,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
});