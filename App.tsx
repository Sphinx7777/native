
import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import makeStore from './src/redux/store';
import Signal from './src/components/Signal/index';
import TestedOnly from './src/TestedOnly';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import Login from './src/components/Signal/Login';
import { StyleSheet, useWindowDimensions } from 'react-native';


const App = () => {
    const store = makeStore()
    const Drawer = createDrawerNavigator();
    const user = store?.getState()?.identity?.user
    const dimensions = useWindowDimensions();

    return (
        <Provider store={store}>
            <StatusBar animated={true} backgroundColor='#61dafb' />
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Home' drawerStyle={styles.drawerStyle}>
                    <Drawer.Screen name='Home' component={Signal} options={{ title: 'Main page' }} />
                    <Drawer.Screen name='Login' component={Login} options={{ title: 'Login' }} />
                    <Drawer.Screen name='Test' component={TestedOnly} options={{ title: 'Test' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
    }
});

export default App;
// initialRouteName={`${user ? 'Home' : 'Login'}`}