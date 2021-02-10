
import React from 'react';
import makeStore from './src/redux/store';
import { Provider } from 'react-redux';
import Signal from './src/components/Signal/index';
import TestedOnly from './src/TestedOnly';

const App = () => {
    const store = makeStore()
    return (
        <Provider store={store}>
            <Signal />
            {/* <TestedOnly /> */}
        </Provider>
        
    );
}

export default App;
