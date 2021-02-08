import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { IDataItem } from './index';


interface ICustomInputProps {
    currentElement: IDataItem | undefined;
}
interface ICustomInputState {
    date: string | undefined;
}
const CustomInput = (props: ICustomInputProps) => {
    const { currentElement } = props;

    const [state, setState] = useState<ICustomInputState>({
        date: ''
    })

    const handlePress = () => {
        console.log('handlePress', state)
    }

    useEffect(() => {
        setState({date: currentElement && currentElement.date})
    }, [currentElement && currentElement.date])

    const handleClearPress = () => {
        setState((prevState) => {
            return {
                ...prevState,
                date: ''
            }
        })
    }

    const handleDescChange = (data: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                date: data
            }
        })
    }
    const nameDisabled = state?.date?.length === 0
    return (
        <>

            <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>{currentElement?.name}</Text>
                    <Text style={styles.text}>{currentElement?.phone}</Text>
                    <Text style={styles.text}>DB_Type</Text>
                </View>
                <View style={styles.nameLine}>
                <Text style={styles.text}>{currentElement?.email}</Text>
                <Text style={styles.text}>{currentElement?.date}</Text>
                </View>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>DB + {currentElement?.date}</Text>
                    <Text style={styles.text}>Calling Status</Text>
                </View>
                
            </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='enter date'
                    value={state.date}
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
        borderStyle: 'solid',
        borderColor: '#1b6b2f',
        borderWidth: 2,
        marginBottom: 10,
        backgroundColor: '#97cca5',
        padding: 5,
        width: '100%',
        borderRadius: 10,
        // marginBottom: 10,
        // width: '90%',
        // marginLeft: 'auto',
        // marginRight: 'auto',
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