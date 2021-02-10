import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ISingleDataItem } from 'src/models/DataEntity';
import { getStringDate } from '../../utils';


interface ICustomInputProps {
    currentElement: ISingleDataItem | undefined;
    makeCall: (number: string) => Promise<any>;
}
interface ICustomInputState {
    date: string;
    details: string | undefined;
}
const CustomInput = (props: ICustomInputProps) => {
    const { currentElement, makeCall } = props;
    const dispatch = useDispatch()
    const currentElDate = currentElement ? currentElement?.get('date') : ''
    const currentElDetails = currentElement && currentElement?.get('details') ? currentElement?.get('details') : ''

    const [state, setState] = useState<ICustomInputState>({
        date: currentElDate,
        details: currentElDetails
    })

    const cancelDate = () => {
        setState((prevState) => {
            return {
                ...prevState,
                date: currentElDate
            }
        })
    }

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                date: currentElDate,
                details: currentElDetails
            }
        })
    }, [currentElDate, currentElDetails])

    const addNewDate = () => {
        setState((prevState) => {
            return {
                ...prevState,
                date: getStringDate(new Date())
            }
        })
    }

    const calling = () => currentElement && makeCall(currentElement?.get('phone'))

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
                details: currentElDetails
            }
        })
    }
    const submit = () => {

        dispatch({ type: 'CHANGE_DATA', payload: { ...currentElement, date: state.date, details: state.details } })
    }

    const cancelDetailsDis = currentElDetails === state.details
    const cancelDateDis = currentElDate === state.date

    return (
        <>

            <View style={styles.container}>
                {currentElement && <TouchableOpacity
                    onLongPress={calling}
                    style={styles.textContainer}>
                    <View style={styles.nameLine}>
                        <Text style={styles.text}>{currentElement?.get('name')}</Text>
                        <Text style={styles.text}>{currentElement?.get('phone')}</Text>
                        <Text style={styles.text}>{currentElement?.get('dbType')}</Text>
                    </View>
                    <View style={styles.nameLine}>
                        <Text style={styles.text}>{currentElement?.get('email')}</Text>
                    </View>
                    <View style={styles.nameLine}>
                        <Text style={styles.text}>{currentElement?.get('date')}</Text>
                        <Text style={styles.text}>Calling Status</Text>
                    </View>

                </TouchableOpacity>}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={{...styles.textInput, ...styles.dateInput}}
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
                                ? {...styles.button, paddingHorizontal: 29, marginLeft:10}
                                : { ...styles.button, backgroundColor: 'gray', borderColor: 'gray',paddingHorizontal: 29, marginLeft:10 }}
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

                    </View>

                </View>
                <TouchableOpacity
                            style={(!cancelDetailsDis || !cancelDateDis)
                                ? {...styles.button, ...styles.sendButton}
                                : {...styles.button, ...styles.sendButton, backgroundColor: 'gray', borderColor: 'gray' }}
                            disabled={(cancelDateDis && cancelDetailsDis)}
                            onPress={submit}>
                            <Text style={styles.buttonText}> Submit </Text>
                        </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 245,
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
        marginRight: 5,
        width: '70%',
    },
    dateInput: {
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
        marginBottom: 0,
        marginTop: 15,
        marginLeft: 277
    }
});


export default CustomInput;