
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { IDataItem } from './index';

interface ICallMenuProps {
    setCurrentItemIndex: (currentItemIndex: number) => void;
    currentItemIndex: number;
    callData: IDataItem[] | undefined;
    makeCall: (number: string) => any;
    setCurrentElement: (currentElement: IDataItem) => void;
}

interface ICallMenuState {
}
const CallMenu = (props: ICallMenuProps) => {
    const { setCurrentItemIndex, currentItemIndex, callData, makeCall, setCurrentElement} = props;

    const [state, setState] = useState<ICallMenuState>({

    })

    const handleNextPress = () => {
        if (callData && currentItemIndex < callData?.length - 1) {
            makeCall(callData[currentItemIndex].phone)
            setCurrentItemIndex(currentItemIndex + 1)
            setCurrentElement(callData[currentItemIndex])
        } else {
            if (callData) {
                const index = callData?.length - 1
                makeCall(callData[index].phone)
                setCurrentElement(callData[index])
            }
            setCurrentItemIndex(0)
        }
    }

    const handlePausePress = () => {
        console.log('handlePausePress')
    }

    // const handleClearPress = () => {
    //     setState((prevState) => {
    //         return {
    //             ...prevState,
    //             name: '',
    //             description: ''
    //         }
    //     })
    // }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.textBlock}>
                    <Text>Info block</Text>
                    <Text>Info block</Text>
                    <Text>Info block</Text>
                    <Text>Info block</Text>
                </View>
                <View style={styles.buttonsBlock}>
                    <TouchableOpacity
                        style={{ ...styles.button, }}
                        onPress={handlePausePress}
                    >
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextPress}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
}



const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'blue',
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#0d3ea6',
        marginVertical: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
        minHeight: 140,
        borderColor: '#a5a8a5',
        backgroundColor: '#f7faf7',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10
    },
    textBlock: {
        display: 'flex',
        width: '60%',
        padding: 5,
    },
    buttonsBlock: {
        display: 'flex',
        width: '40%',
        padding: 5,

    },
    pauseButton: {
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    startButton: {
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    }
});


export default CallMenu;