
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import CallMenu from './CallMenu';
import CustomInput from './CustomInput';
// @ts-ignore
import call from 'react-native-phone-call'
import DataEntity, { ISingleDataItem } from '../../models/DataEntity';
import saga from '../../decoradors/saga';
import { EntityList } from '../../models/entity';
import ContactList from './ContactList';

const data: any = [
    {
        id: '1',
        phone: '11111111',
        email: 'spamoglot1111@gmail.com',
        name: 'Sergei111',
        date: '20-01-01',
        dbType: 'asana',
        details: 'details 111111111'
    },
    {
        id: '2',
        phone: '22222222',
        email: 'spamoglot222@gmail.com',
        name: 'Sergei222',
        date: '20-02-02',
        dbType: 'DBX',
        details: 'details 2222222222'
    },
    {
        id: '3',
        phone: '33333333',
        email: 'spamoglot333@gmail.com',
        name: 'Sergei333',
        date: '20-03-03',
        dbType: 'C',
        details: 'details 3333333333333'
    }
    ,
    {
        id: '4',
        phone: '44444444',
        email: 'spamoglot444@gmail.com',
        name: 'Sergei444',
        date: '20-04-04',
        dbType: 'asana',
        details: 'details 4444444444444'
    },
    {
        id: '5',
        phone: '55555555',
        email: 'spamoglot555@gmail.com',
        name: 'Sergei555',
        date: '20-05-05',
        dbType: 'DBX',
        details: 'details 5555555555'
    },
    {
        id: '6',
        phone: '66666666',
        email: 'spamoglot666@gmail.com',
        name: 'Sergei666',
        date: '20-06-06',
        dbType: 'C',
        details: 'details 666666666666666'
    }
]
interface ISignalProps {
    dataItems?: EntityList<ISingleDataItem>;
    user?: any;
    getData?: () => void;
    navigation?: any;
}
@saga(DataEntity, ['getData'])
class Signal extends React.Component<ISignalProps> {

    state = {
        response: null,
        currentItemIndex: 0,
        currentElement: this.props.dataItems && this.props.dataItems?.valueSeq()?.get(0)
    }

    getSignalData = async () => {
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/services`)
        const response: any = await res.json()
        if (response) {
            this.props.getData()
        }
        this.setState((prevState) => {
            return {
                ...prevState,
                response,
            }
        })
    }

    makeCall = async (number?: string) => {
        const args = {
            number,
            prompt: false
        }
        return call(args)
            .then((r: any) => {
                return r;
            })
            .catch((err: any) => {
                return err
            })
    }

    setCurrentItemIndex = (currentItemIndex: number) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                currentItemIndex
            }
        })
    }

    setCurrentElement = (currentElement: ISingleDataItem) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                currentElement,
            }
        })
    }

    componentDidMount() {
        this.getSignalData();
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.dataItems !== this.props.dataItems) {
            const currentElement = this.props.dataItems && this.props.dataItems?.valueSeq()?.get(0)
            this.setState((prevState) => {
                return {
                    ...prevState,
                    currentElement
                }
            })
        }
    }

    render() {
        const { currentItemIndex, currentElement } = this.state
        const { dataItems } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <ContactList
                        currentItemIndex={currentItemIndex}
                        callData={dataItems}
                        setCurrentItemIndex={this.setCurrentItemIndex}
                        makeCall={this.makeCall}
                        setCurrentElement={this.setCurrentElement}
                    />
                    <ScrollView style={styles.container}>
                        <CustomInput currentElement={currentElement} makeCall={this.makeCall} />
                        <CallMenu
                            setCurrentItemIndex={this.setCurrentItemIndex}
                            currentItemIndex={currentItemIndex}
                            callData={dataItems}
                            setCurrentElement={this.setCurrentElement}
                            makeCall={this.makeCall}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: '#d7dbd7',
        paddingHorizontal: 5,
        paddingTop: 30
    },
    container: {
        flex: 2
    }
});

const mapStateToProps = (state: any) => {
    const dataItems = state.entities.get('signalData');
    return {
        dataItems,
        user: null
    };
}

export default connect(mapStateToProps, { ...DataEntity.actions })(Signal)
