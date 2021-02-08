import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getStringDate } from '../../utils';
import { IDataItem } from './index';


interface ICustomInputProps {
    currentElement: IDataItem | undefined;
    makeCall: (number: string) => any;
}
interface ICustomInputState {
    date: string;
    comment: string | undefined;
}
const CustomInput = (props: ICustomInputProps) => {
    const { currentElement, makeCall } = props;

    const [state, setState] = useState<ICustomInputState>({
        date: currentElement ? currentElement.date : '',
        comment: currentElement && currentElement.comment ? currentElement.comment : ''
    })

    const cancelDate = () => {
        setState((prevState) => {
            return {
                ...prevState,
                date: currentElement ? currentElement.date : ''
            }
        })
    }

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                date: currentElement && currentElement.date ? currentElement.date : '',
                comment: currentElement && currentElement.comment ? currentElement.comment : ''
            }
        })
    }, [currentElement && currentElement.date, currentElement && currentElement.comment])

    const addNewDate = () => {
        setState((prevState) => {
            return {
                ...prevState,
                date: getStringDate(new Date())
            }
        })
    }

    const calling = () => currentElement && makeCall(currentElement?.phone)

    const handleDateChange = (data: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                date: data
            }
        })
    }
    const handleCommentChange = (comment: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                comment
            }
        })
    }
    const cancelComment = () => {
        setState((prevState) => {
            return {
                ...prevState,
                comment: currentElement ? currentElement.comment : ''
            }
        })
    }
    const submit = () => console.log('submit', state)

    return (
        <>

            <View style={styles.container}>
                {currentElement && <TouchableOpacity 
            onLongPress={calling}
            style={styles.textContainer}>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>{currentElement?.name}</Text>
                    <Text style={styles.text}>{currentElement?.phone}</Text>
                    <Text style={styles.text}>{currentElement?.dbType}</Text>
                </View>
                <View style={styles.nameLine}>
                <Text style={styles.text}>{currentElement?.email}</Text>
                </View>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>{currentElement?.date}</Text>
                    <Text style={styles.text}>Calling Status</Text>
                </View>
                
            </TouchableOpacity>}
            
            <View style={styles.inputContainer}>
            <TextInput
                    style={styles.textInput}
                    placeholder='enter date'
                    value={state.date}
                    onChangeText={handleDateChange}
                />
                <View style={styles.buttons}>
                <TouchableOpacity
                        style={styles.button}
                        onPress={cancelDate}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={addNewDate}>
                        <Text style={styles.buttonText}>Set date</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                    style={styles.textInput}
                    placeholder='enter comment'
                    value={state.comment}
                    onChangeText={handleCommentChange}
                    multiline={true}
                />
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={cancelComment}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={submit}>
                        <Text style={styles.buttonText}> Submit </Text>
                    </TouchableOpacity>
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
        minHeight: 210,
        borderColor: '#29a331',
        backgroundColor: '#c9f2cf',
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingTop: 10,
        borderRadius: 10
    },
    inputContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textContainer: {
        borderStyle: 'solid',
        borderColor: '#1b6b2f',
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: '#97cca5',
        padding: 1,
        width: '100%',
        borderRadius: 10,
    },
    nameLine: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
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
        paddingVertical: 5,
        width: '50%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end',
        paddingRight: 10,
        marginTop: 5,
        borderRadius: 10
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'blue',
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#0d3ea6',
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    sendButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'blue',
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#0d3ea6',
        marginLeft: 10,
    }
});


export default CustomInput;