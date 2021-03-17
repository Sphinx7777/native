
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import makeStore from './src/redux/store';
import Signal from './src/components/Signal/index';
import TestedOnly from './src/TestedOnly';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import Login from './src/components/Signal/Login';
import { StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
    const store = makeStore()
    const Drawer = createDrawerNavigator();
console.log('store.store', store.store.getState())
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
            <StatusBar animated={true} backgroundColor='#61dafb' />
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Home' drawerStyle={styles.drawerStyle}>
                    <Drawer.Screen name='Home' component={Signal} options={{ title: 'Main page' }} />
                    <Drawer.Screen name='Login' component={Login} options={{ title: 'Authorization' }} />
                    <Drawer.Screen name='Test' component={TestedOnly} options={{ title: 'Test' }} />
                </Drawer.Navigator>
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: '#fff',
        width: 240,
    }
});

export default App;