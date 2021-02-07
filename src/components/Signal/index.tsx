
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import ContactList from './ContactList';
import CallMenu from './CallMenu';
import CustomInput from './CustomInput';

const data = [
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
]

export interface IDataItem {
    phone: string;
    email: string;
    name: string;
}
interface IAppProps {
    dataItems?: IDataItem[];
    user?: any;
}
interface IAppState {
    response: any;
    currentItemIndex: number;
}

const Signal = (props: IAppProps) => {
    const { dataItems } = props;
    const dispatch = useDispatch()
    const [state, setState] = useState<IAppState>({
        response: null,
        currentItemIndex: 0
    })

    const getData = async () => {
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/services`,
        )
        const response: any = await res.json()
        dispatch({type: 'SET_DATA', payload: {dataItems: data}})
        setState((prevState) => {
            return {
                ...prevState,
                response,
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

    const currentElement = useMemo(() => dataItems && dataItems[state.currentItemIndex], [dataItems, state.currentItemIndex]) || null
    const { currentItemIndex } = state
    return (

        <View style={styles.container}>
            <StatusBar style="auto" backgroundColor='silver' />
            <ContactList
                currentItemIndex={currentItemIndex}
                callData={dataItems}
                setCurrentItemIndex={setCurrentItemIndex} />
            <CustomInput currentElement={currentElement} />
            <CallMenu
                setCurrentItemIndex={setCurrentItemIndex}
                currentItemIndex={currentItemIndex}
                callData={dataItems} />
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

const mapStateToProps = (state: any, props: any) => {
    console.log('mapStateToProps', state, 'props', props)
const { dataSignal: { dataItems }, identity: { user }} = state;
    return {
        dataItems: dataItems || [],
        user
    };
} 

export default connect(mapStateToProps, {})(Signal)
