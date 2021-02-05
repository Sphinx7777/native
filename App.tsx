import CustomInput from './src/components/CustomInput';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ContactList from './src/components/ContactList';
import CallMenu from './src/components/CallMenu';
import wrapper, { SagaStore } from './src/redux/store';
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

const App = (props: any) => {
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
    console.log('APP', props)

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

//export default wrapper.withRedux(App)
export default App;

// import 'styles/main.scss';
// import Router from 'next/router';
// import { AppProps, AppContext } from 'next/app';
// import wrapper, { SagaStore } from 'src/redux/store';
// import { appWithTranslation } from 'src/i18n';
// import {END} from 'redux-saga';
// import React, { createContext, useEffect } from 'react'; 
// import { useAnalytics } from 'src/hooks/useAnalytics';
// import { getIdentity, setSSRData } from 'src/redux/actions';

// import getConfig from 'next/config';
// import { isEmpty } from 'src/utils';
// const { publicRuntimeConfig : { GA_ID } } = getConfig();
// console.log('You can clear sagas!!!');
// function MyApp({ Component, pageProps } : AppProps) {


//     return( <Component {...pageProps} />
//     );
// }

// MyApp.getInitialProps = async ({Component, ctx}: AppContext ) => {
//     console.log('MyApp.getInitialProps!!!');
    
//     //(ctx.store as SagaStore).stopSaga();
//     // Init user identity. There is a basic information user name, email and role
//     if(ctx.req && ctx.req['identityACL'] !== undefined && ctx.req['identityACL'].user) {
//         ctx.store.dispatch(getIdentity(ctx.req['identityACL']));
//     }

//     //In SSR mode we store some data for page in REDUX container
//     //the fetch request can't be sent from the server to itself so the data takes from the container instead.
//     //for more details look at Entity.actionRequest()
//     if (ctx.req && ctx.req['ssrData']  !== undefined  && !isEmpty(ctx.req['ssrData'])) {
//         ctx.store.dispatch(setSSRData({ data: ctx.req['ssrData'] }));
//     }
    
//     console.log('_app.runSagas()!');
//     (ctx.store as SagaStore).runSaga();

//     // 1. Wait for all page actions to dispatch
//     const pageProps = {
//         ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//         namespacesRequired: ['common']
//     };
    
//     // 2. Stop the saga if on server
//     if (ctx.req) {
//         ctx.store.dispatch(END);
//         await (ctx.store as SagaStore).sagaTask.toPromise();
//     }
    
//     // 3. Return props
//     return {
//         pageProps
//     };
// };

// export default wrapper.withRedux(appWithTranslation(MyApp));