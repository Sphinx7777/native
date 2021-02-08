
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { IDataItem } from './index';

interface ICallMenuProps {
    setCurrentItemIndex: (currentItemIndex: number) => void;
    currentItemIndex: number;
    callData: IDataItem[] | undefined;
    makeCall: (number: string) => Promise<any>;
    setCurrentElement: (currentElement: IDataItem) => void;
}

interface ICallMenuState {
    callStart: boolean;
}
const CallMenu = (props: ICallMenuProps) => {
    const { setCurrentItemIndex, currentItemIndex, callData, makeCall, setCurrentElement} = props;

    const [state, setState] = useState<ICallMenuState>({
        callStart: false
    })

    const handleNextPress = async () => {
        if (callData && currentItemIndex < callData?.length - 1) {
            const res = await makeCall(callData[currentItemIndex + 1].phone)
            if (res) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        callStart: res
                    }
                })
                setCurrentItemIndex(currentItemIndex + 1)
                setCurrentElement(callData[currentItemIndex + 1])
            }
        } else {
            if (callData) {
                const index = callData?.length - 1
                const res = await makeCall(callData[0].phone)
                if (res) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            callStart: res
                        }
                    })
                    setCurrentItemIndex(0)
                    setCurrentElement(callData[0])
                }
            }
        }
    }

    const handlePausePress = () => console.log('handlePausePress')

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
                        style={{...styles.button, marginTop: 1, marginBottom: 5}}
                        onPress={handlePausePress}
                    >
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={{...styles.button, marginBottom: 1,marginTop: 5, paddingVertical: 7}}
                        onPress={handleNextPress}
                    >
                        <Text style={styles.buttonText}>Next call</Text>
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
        borderColor: '#1f6b4e',
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1f6b4e'     
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
        height: 100,
        borderColor: '#a5a8a5',
        backgroundColor: '#f7faf7',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10
    },
    textBlock: {
        display: 'flex',
        width: '65%',
    },
    buttonsBlock: {
        display: 'flex',
        width: '35%',

    },
});


export default CallMenu;