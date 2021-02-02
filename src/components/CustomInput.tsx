import fetch from 'cross-fetch';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
// @ts-ignore
import call from 'react-native-phone-call'
// @ts-ignore
import CallDetectorManager from 'react-native-call-detection'

import SendSMS from 'react-native-sms'

// @ts-ignore
import CallLogs from 'react-native-call-log'

// @ts-ignore
import Telephony from 'react-native-telephony'


interface IDataItem {
    phone: string;
    email: string;
    name: string;
}

interface ICustomInputState {
    response: any;
    name: string;
    description: string;
    data: IDataItem[];
}
const CustomInput = () => {
    const [state, setState] = useState<ICustomInputState>({
        response: {},
        name: '',
        description: '',
        data: [{
            phone: '332223332',
            email: 'spamoglot13@gmail.com',
            name: 'Sergei'
        },
        {
            phone: '77777777',
            email: 'spamoglot13777@gmail.com',
            name: 'Sergei777'
        },
        {
            phone: '555555555',
            email: 'spamoglot13555@gmail.com',
            name: 'Sergei555'
        }
        ]
    })

    const sendSms = async () => {
        return SendSMS.send({
            body: 'The default body of the SMS!',
            recipients: ['0663952488', '0668848072'],
            // @ts-ignore
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error));
    }

    const makeCall = async (number?: string) => {
        const args = {
            number,
            prompt: false
        }
        return call(args)
            .then((r: any) => console.log('makeCall', r))
            .catch((err: any) => {
                console.error(err)
            })
    }

    const getData = async () => {
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/services`, {
            headers: {
                authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU4ZWIxYzc4ODBmZTZlNDIyZTkwYWYiLCJpYXQiOjE2MTIxODk2MTB9.5k1Bilb4adAwh1q5ueys6lZLybZEY1J_x3k8xK3XQI0'
            }
        })
        const response: any = await res.json()
        setState((prevState) => {
            return {
                ...prevState,
                response
            }
        })
    }
    const log = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                {
                    title: 'Call Log Example',
                    message: 'Access your call logs',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            )
            console.log('granted', granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                CallLogs.load().then((c: any) => console.log('RES', c));
            } else {
                console.log('Call Log permission denied');
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();

            
    }, [])

    const handlePress = async () => {
        //const rrr = await sendSms();
        await makeCall('0663952488')
        //log()
        //sendSms()
        //console.log('handlePress', rrr)
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
    const handleNameChange = (data: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                name: data
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
    const nameDisabled = state?.name?.length === 0 || state?.description?.length === 0
    const content: any = state?.response?.data?.filter((r: any) => r.title === "Services")[0]

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='enter name'
                value={state.name}
                onChangeText={handleNameChange}
                multiline={true}
            />
            <TextInput
                style={styles.textInput}
                placeholder='enter description'
                value={state.description}
                onChangeText={handleDescChange}
                multiline={true}
            />
            <View style={styles.buttons}>
                <View
                    style={styles.sendButton}>
                    <Button
                        disabled={nameDisabled}
                        title='Send'
                        color='blue'
                        onPress={handlePress}
                    />
                </View>
                <Button
                    disabled={nameDisabled}
                    title='Clear'
                    color='blue'
                    onPress={handleClearPress}
                />
            </View>
            <View>
                <Text> {content?.content}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 5,
    },
    textInput: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        marginBottom: 20,
        width: '98%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingRight: 8
    },
    sendButton: {
        marginHorizontal: 4
    }
});


export default CustomInput;