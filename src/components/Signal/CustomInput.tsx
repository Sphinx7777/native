import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getStringDate } from '../../utils';
import { IDataItem } from './index';


interface ICustomInputProps {
    currentElement: IDataItem | undefined;
    makeCall: (number: string) => any;
    dispatch: (data: any) => void;
}
interface ICustomInputState {
    date: string;
    details: string | undefined;
}
const CustomInput = (props: ICustomInputProps) => {
    const { currentElement, makeCall, dispatch } = props;

    const [state, setState] = useState<ICustomInputState>({
        date: currentElement ? currentElement.date : '',
        details: currentElement && currentElement.details ? currentElement.details : ''
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
                details: currentElement && currentElement.details ? currentElement.details : ''
            }
        })
    }, [currentElement && currentElement.date, currentElement && currentElement.details])

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
    const handleDetailsChange = (details: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                details
            }
        })
    }
    const cancelDetails = () => {
        setState((prevState) => {
            return {
                ...prevState,
                details: currentElement ? currentElement.details : ''
            }
        })
    }
    const submit = () => {

        dispatch({ type: 'CHANGE_DATA', payload: { ...currentElement, date: state.date, details: state.details } })
        console.log('submit', { ...currentElement, date: state.date, details: state.details })
    }

    const cancelDetailsDis = currentElement && currentElement.details === state.details
    const cancelDateDis = currentElement && currentElement.date === state.date

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
                        style={styles.dateInput}
                        placeholder='enter date'
                        value={state.date}
                        onChangeText={handleDateChange}
                    />
                    <View style={styles.dateButtons}>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={addNewDate}>
                            <Text style={styles.buttonText}>Set date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={!cancelDateDis
                                ? {...styles.button, paddingHorizontal: 20, marginLeft:10}
                                : { ...styles.button, backgroundColor: 'gray', borderColor: 'gray',paddingHorizontal: 20, marginLeft:10 }}
                            disabled={cancelDateDis}
                            onPress={cancelDate}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='enter details'
                        value={state.details}
                        onChangeText={handleDetailsChange}
                        multiline={true}
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={!cancelDetailsDis
                                ? styles.button
                                : { ...styles.button, backgroundColor: 'gray', borderColor: 'gray' }}
                            disabled={cancelDetailsDis}
                            onPress={cancelDetails}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={(!cancelDetailsDis || !cancelDateDis)
                                ? styles.button
                                : { ...styles.sendButton, backgroundColor: 'gray', borderColor: 'gray' }}
                            disabled={(cancelDateDis && cancelDetailsDis)}
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
        minHeight: 205,
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
        paddingRight: 5,
        width: '70%',
    },
    dateInput: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 5,
        paddingRight: 5,
        width: '40%',
    },
    dateButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'flex-end',
        paddingRight: 0,
        marginTop: 5,
        borderRadius: 10
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        justifyContent: 'space-around',
        marginTop: 5,
        borderRadius: 10
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1f6b4e',
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1f6b4e',
        marginBottom: 5,
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
        borderColor: '#1f6b4e',
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1f6b4e',
        marginBottom: 5,
    }
});


export default CustomInput;