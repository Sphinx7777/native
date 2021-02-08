
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { IDataItem } from './index';


interface IContactListProps {
    callData: IDataItem[] | undefined;
    setCurrentItemIndex: (currentItem: number) => void;
    currentItemIndex: number;
    makeCall: (number: string) => any;
    setCurrentElement: (currentElement: IDataItem) => void;
    currentElement: IDataItem | undefined;
}

interface IContactListState {

}
const ContactList = (props: IContactListProps) => {
    const { callData, setCurrentItemIndex, currentItemIndex, makeCall, setCurrentElement, currentElement} = props;

    const [state, setState] = useState<IContactListState>({

    })

    const handleLongPress = (item: IDataItem) => {
        const { name, email, phone } = item
        makeCall(phone)
    }

    const handlePress = (data: any) => {
        const { separators, item, index } = data
        setCurrentElement(item)
        setCurrentItemIndex(index)
    }

    const renderItem = (data: any) => {
        const { item, index } = data
        const onLongPress: (event: GestureResponderEvent) => void = () => handleLongPress(item)
        const onPress: (event: GestureResponderEvent) => void = () => handlePress(data)
        return (
            <TouchableOpacity
            style={currentItemIndex !== index ? styles.textContainer : styles.textContainerActive}
            onLongPress={onLongPress}
            onPress={onPress}>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>{item?.name}</Text>
                    <Text style={styles.text}>{item?.phone}</Text>
                    <Text style={styles.text}>DB_Type</Text>
                </View>
                <Text style={styles.text}>{item?.email}</Text>
                <View style={styles.nameLine}>
                    <Text style={styles.text}>DB + {item?.date}</Text>
                    <Text style={styles.text}>Calling Status</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item: IDataItem) => item?.phone


    return (
        <>
            <View style={styles.container}>
                {
                    callData && callData.length > 0 && <FlatList
                    keyExtractor={keyExtractor}
                    data={callData}
                    renderItem={renderItem}
                    />
                }

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 270,
        padding: 5
    },
    textContainer: {
        borderStyle: 'solid',
        borderColor: '#6993f5',
        borderWidth: 2,
        marginBottom: 3,
        backgroundColor: '#bfeef5',
        padding: 5,
        width: '100%',
        borderRadius: 10
    },
    textContainerActive: {
        borderStyle: 'solid',
        borderColor: '#1b6b2f',
        borderWidth: 2,
        marginBottom: 3,
        backgroundColor: '#97cca5',
        padding: 5,
        width: '100%',
        borderRadius: 10
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
        paddingVertical: 2
    }
});


export default ContactList;