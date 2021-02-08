
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import ContactList from './ContactList';
import CallMenu from './CallMenu';
import CustomInput from './CustomInput';
// @ts-ignore
import call from 'react-native-phone-call'

const data: IDataItem[] = [
    {
        id: '1',
        phone: '11111111',
        email: 'spamoglot1111@gmail.com',
        name: 'Sergei111',
        date: '20-01-01',
        dbType: 'asana',
        comment: 'comment 111111111'
    },
    {
        id: '2',
        phone: '22222222',
        email: 'spamoglot222@gmail.com',
        name: 'Sergei222',
        date: '20-02-02',
        dbType: 'teamDock',
        comment: 'comment 2222222222'
    },
    {
        id: '3',
        phone: '33333333',
        email: 'spamoglot333@gmail.com',
        name: 'Sergei333',
        date: '20-03-03',
        dbType: 'teamDock',
        comment: 'comment 3333333333333'
    }
    ,
    {
        id: '4',
        phone: '44444444',
        email: 'spamoglot444@gmail.com',
        name: 'Sergei444',
        date: '20-04-04',
        dbType: 'allBrokersDock',
        comment: 'comment 4444444444444'
    },
    {
        id: '5',
        phone: '55555555',
        email: 'spamoglot555@gmail.com',
        name: 'Sergei555',
        date: '20-05-05',
        dbType: 'teamDock',
        comment: 'comment 5555555555'
    },
    {
        id: '6',
        phone: '66666666',
        email: 'spamoglot666@gmail.com',
        name: 'Sergei666',
        date: '20-06-06',
        dbType: 'allBrokersDock',
        comment: 'comment 666666666666666'
    }
]

export interface IDataItem {
    id: string;
    phone: string;
    email: string;
    name: string;
    date: string;
    dbType: string;
    comment: string;
}
interface IAppProps {
    dataItems?: IDataItem[];
    user?: any;
}
interface IAppState {
    response: any;
    currentItemIndex: number;
    currentElement: IDataItem | undefined;
}

const Signal = (props: IAppProps) => {
    const { dataItems } = props;
    const dispatch = useDispatch()
    const [state, setState] = useState<IAppState>({
        response: null,
        currentItemIndex: 0,
        currentElement: dataItems && dataItems[0]
    })

    const getData = async () => {
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/services`,
        )
        const response: any = await res.json()
        dispatch({ type: 'SET_DATA', payload: { dataItems: data } })
        setState((prevState) => {
            return {
                ...prevState,
                response,
            }
        })
    }

    const makeCall = async (number?: string) => {
        const args = {
            number,
            prompt: false
        }
        return call(args)
            .then((r: any) => {
                console.log('makeCall_start', r)
                return r;
            })
            .catch((err: any) => {
                console.error('makeCall_ERROR', err)
                return err
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


    const setCurrentElement = (currentElement: IDataItem) => {
        setState((prevState) => {
            return {
                ...prevState,
                currentElement,
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                currentElement: dataItems && dataItems[0]
            }
        })
    }, [dataItems])

    const { currentItemIndex, currentElement } = state
    return (



        <ScrollView style={styles.container}>
            <View style={styles.viewContainer}>
                <StatusBar style="auto" backgroundColor='silver' />
                <ContactList
                    currentItemIndex={currentItemIndex}
                    callData={dataItems}
                    setCurrentItemIndex={setCurrentItemIndex}
                    makeCall={makeCall}
                    currentElement={currentElement}
                    setCurrentElement={setCurrentElement}
                />

                <CustomInput currentElement={currentElement} makeCall={makeCall} dispatch={dispatch}/>
                <CallMenu
                    setCurrentItemIndex={setCurrentItemIndex}
                    currentItemIndex={currentItemIndex}
                    callData={dataItems}
                    setCurrentElement={setCurrentElement}
                    makeCall={makeCall}
                />
            </View>

        </ScrollView>



    );
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: '#d7dbd7',
        paddingHorizontal: 5,
        paddingTop: 30,

    },
    container: {
        
    }
});

const mapStateToProps = (state: any) => {
    const { dataSignal: { dataItems }, identity: { user } } = state;
    return {
        dataItems,
        user
    };
}

export default connect(mapStateToProps, {})(Signal)
