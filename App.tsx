
import React from 'react';
import configureStore from './src/redux/store';
import { Provider } from 'react-redux';
import Signal from './src/components/Signal/index';

const App = () => {
    const store = configureStore()  
    return (
        <Provider store={store}>
            <Signal />
        </Provider>
        
    );
}

export default App;
