
import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CallMenu from './CallMenu';
import CustomInput from './CustomInput';
// @ts-ignore
import call from 'react-native-phone-call'
import DataEntity, { ISingleDataItem } from '../../models/DataEntity';
import saga from '../../decoradors/saga';
import { EntityList } from '../../models/entity';
import ContactList from './ContactList';

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
        const res = await fetch(`http://neologic.golden-team.org/api/page/url/process`)
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
        const validUser = this.props.user && this.props.user?.token && this.props.user?.token?.length > 0
        if (validUser) {
            this.getSignalData();
        }       
    }

    componentDidUpdate(prevProps: any) {
        const validUser = this.props.user && prevProps.user !== this.props.user && this.props.user?.token && this.props.user?.token?.length > 0 && !this.props.dataItems
        if (validUser) {
            this.getSignalData();
        }
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
        const { dataItems, user, navigation } = this.props
        const validUser = user && user?.token && user?.token?.length > 0
        if (!validUser) {
            navigation.navigate('Login')
        }
        if (!validUser) {
            return (
            <View style={styles.loadContainer}>
                <View style={{...styles.loadContainer, height:100}}>
                    <Text style={{fontSize: 22, fontWeight: '600'}}>Only register user</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{}}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={{color: '#62aee5', fontSize: 20, marginTop: 30}}>Go to login</Text>
                    </TouchableOpacity>
                </View>
            </View>)
        }

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
    },
    loadContainer: {
        display:'flex',
        flexDirection: 'column',
        height: 270,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state: any) => {
    const dataItems = state.entities.get('signalData');
    const user = state.identity.user || null
    return {
        dataItems,
        user
    };
}

export default connect(mapStateToProps, { ...DataEntity.actions })(Signal)
