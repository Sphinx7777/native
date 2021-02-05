import { Text, View, StyleSheet } from 'react-native'
import React from 'react';

// import Telephony from 'react-native-telephony'

// import CallDetectorManager from 'react-native-call-detection'

// import SendSMS from 'react-native-sms'


// import CallLogs from 'react-native-call-log'

// import call from 'react-native-phone-call'

class TestedOnly extends React.Component {
    //componentWillMount() {
    // Telephony.addEventListener(Telephony.LISTEN_CALL_STATE | Telephony.LISTEN_DATA_ACTIVITY,
    //     (event: any) => {
    //         if (event.type === 'LISTEN_CALL_STATE') {
    //             console.log(event.data)
    //         } else {
    //             console.log(event.data)
    //         }
    //     })

    // Telephony.isNetworkRoaming((roaming: any) => {
    //     if (roaming) {
    //         // ...
    //     }
    // })

    // Telephony.getNetworkClass((network: any) => {
    //     switch (network) {
    //         case "2G":
    //             // ...
    //             break;
    //         case "3G":
    //             // ...
    //             break;
    //         case "4G":
    //             // ...
    //             break;
    //         default:
    //             // ...
    //             break;
    //     }
    // })


    // const requestCameraPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: "Cool Photo App Camera Permission",
    //                 message:
    //                     "Cool Photo App needs access to your camera " +
    //                     "so you can take awesome pictures.",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("You can use the camera");
    //         } else {
    //             console.log("Camera permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    // const sendSms = async () => {
    //     return SendSMS.send({
    //         body: 'The default body of the SMS!',
    //         recipients: ['0663952488', '0668848072'],
    //         // @ts-ignore
    //         successTypes: ['sent', 'queued'],
    //         allowAndroidSendWithoutReadPermission: true
    //     }, (completed, cancelled, error) => console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error));
    // }


    // const log = async () => {

    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    //             {
    //                 title: 'Call Log Example',
    //                 message: 'Access your call logs',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }
    //         )
    //         const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE)
    //         console.log('check===', check, 'granted===', granted)
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    //             // const log = CallLogs.load().then((c: any) => c);
    //             // const json  = await log.json()
    //             console.log('json')
    //         } else {
    //             console.log('Call Log permission denied');
    //         }

    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    // const handlePress = async () => {
    //     const rrr = await sendSms();
    //     await makeCall('0663952488')
    //     log()
    //     sendSms()
    //     console.log('handlePress', rrr)
    //     requestCameraPermission()
    // }

    // const log = async () => {

    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    //             {
    //                 title: 'Call Log Example',
    //                 message: 'Access your call logs',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }
    //         )
    //         console.log('granted', granted)
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    //             const log = CallLogs.load().then((c: any) => c);
    //             const json  = await log.json()
    //             console.log('json', json)
    //         } else {
    //             console.log('Call Log permission denied');
    //         }

    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }
    // useEffect(() => {
    //     log()

    // }, [])

    // Telephony.getCellInfo((cellInfos: any) => {
    //     cellInfos.map((info: any) => {
    //         switch (info.connectionType) {
    //             case "CDMA":
    //                 console.log(info.cellIdentity)
    //                 console.log(info.cellSignalStrength)
    //                 break;
    //             case "WCDMA":
    //                 console.log(info.cellIdentity)
    //                 console.log(info.cellSignalStrength)
    //                 break;
    //             case "GSM":
    //                 console.log(info.cellIdentity)
    //                 console.log(info.cellSignalStrength)
    //                 break;
    //             case "LTE":
    //                 console.log(info.cellIdentity)
    //                 console.log(info.cellSignalStrength)
    //                 break;
    //             default:
    //                 // ...
    //                 break;
    //         }
    //     })
    // })
    //}

    // componentWillUnmount() {
    //     Telephony.removeEventListener()
    // }

    render() {

        return (
            <View style={styles.container}>
                <Text> Test!!!!!!!!!!</Text>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {

        marginTop: 20,
    },
    text: {

    }
});

export default TestedOnly