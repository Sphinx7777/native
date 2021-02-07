import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { IDataItem } from './index';


interface ICustomInputProps {
    currentElement: IDataItem | null;
}
interface ICustomInputState {
    description: string;
}
const CustomInput = (props: ICustomInputProps) => {
    const { currentElement } = props;

    const [state, setState] = useState<ICustomInputState>({
        description: ''
    })

    const handlePress = () => {
        console.log('handlePress', state)
    }

    const handleClearPress = () => {
        setState((prevState) => {
            return {
                ...prevState,
                name: '',
                description: ''
            }
        })
    }

    const handleDescChange = (data: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                description: data
            }
        })
    }
    const nameDisabled = state?.description?.length === 0

    return (
        <>

            <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>{currentElement?.name}</Text>
                    <Text style={styles.text}>{currentElement?.phone}</Text>
                    <Text style={styles.text}>DB_Type</Text>
                </View>
                <Text style={styles.text}>{currentElement?.email}</Text>
            </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='enter description'
                    value={state.description}
                    onChangeText={handleDescChange}
                    multiline={true}
                />
                <View style={styles.buttons}>
                    <View style={styles.sendButton}>
                        <Button
                            disabled={nameDisabled}
                            title='Send'
                            color='blue'
                            onPress={handlePress}
                        />
                    </View>
                    <View style={styles.clearButton}>
                    <Button
                        disabled={nameDisabled}
                        title='Clear'
                        color='blue'
                        onPress={handleClearPress}
                    />
                    </View>

                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 235,
        borderColor: '#29a331',
        backgroundColor: '#c9f2cf',
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingTop: 10,
        borderRadius: 10
    },
    textContainer: {
        marginBottom: 10,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    nameLine: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        paddingVertical: 5
    },
    textInput: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 10,
        width: '98%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        paddingRight: 10,
        marginTop: 10,
        borderRadius: 10
    },
    sendButton: {
       
    },
    clearButton: {
        marginLeft: 15,
    }
});


export default CustomInput;