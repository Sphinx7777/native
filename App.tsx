import CustomInput from './src/components/CustomInput';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ContactList from './src/components/ContactList';
import CallMenu from './src/components/CallMenu';
export interface IDataItem {
    phone: string;
    email: string;
    name: string;
}
interface IAppState {
    response: any;
    callData: IDataItem[];
    currentItemIndex: number;
}

const App = () => {
    const [state, setState] = useState<IAppState>({
        response: {},
        callData: [
            {
                phone: '11111111',
                email: 'spamoglot1111@gmail.com',
                name: 'Sergei111'
            },
            {
                phone: '22222222',
                email: 'spamoglot222@gmail.com',
                name: 'Sergei222'
            },
            {
                phone: '33333333',
                email: 'spamoglot333@gmail.com',
                name: 'Sergei333'
            }
            ,
            {
                phone: '44444444',
                email: 'spamoglot444@gmail.com',
                name: 'Sergei444'
            },
            {
                phone: '55555555',
                email: 'spamoglot555@gmail.com',
                name: 'Sergei555'
            },
            {
                phone: '66666666',
                email: 'spamoglot666@gmail.com',
                name: 'Sergei666'
            }
        ],
        currentItemIndex: 0
    })

    const getData = async () => {
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/services`,
        )
        const response: any = await res.json()
        setState((prevState) => {
            return {
                ...prevState,
                response
            }
        })
    }

    const setCurrentItemIndex = (currentItemIndex: number) => {
        setState((prevState) => {
            return {
                ...prevState,
                currentItemIndex
            }
        })
    }

    useEffect(() => {
        getData();

    }, [])

    const currentElement = useMemo(() => state.callData[state.currentItemIndex], [state.callData, state.currentItemIndex])
    const { currentItemIndex, callData } = state
    return (
        <View style={styles.container}>
            <StatusBar style="auto" backgroundColor='silver' />
            <ContactList
                currentItemIndex={currentItemIndex}
                callData={callData}
                setCurrentItemIndex={setCurrentItemIndex} />
            <CustomInput currentElement={currentElement} />
            <CallMenu
                setCurrentItemIndex={setCurrentItemIndex}
                currentItemIndex={currentItemIndex}
                callData={callData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d7dbd7',
        paddingHorizontal: 5,
        paddingTop: 30,
    },
    text: {

    }
});


export default App;