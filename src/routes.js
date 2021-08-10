import React from "react";
import { HashRouter, Route, Switch} from "react-router-dom";
import Home from "./screens/Home/Home";
import Settings from './screens/Settings';
import PoFinder from "./screens/PoFinder";
import Reports from "./screens/Reports";
import {Login} from './screens/Login';
import Layout from "./components/Layout";


import { IDMScreen } from './reducers';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/Store';
import ProtectedRoute from "./config/ProtectedRoute";
import { useSelector } from 'react-redux';

const components = {
    Home,
    PoFinder,
    Reports,
    Settings
}

function Routes() {
    const authScreen = useSelector(IDMScreen);
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Layout>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        {
                            Object.keys(authScreen).length > 0 ? authScreen.map(i => {
                            return <ProtectedRoute path={`/${i.ActionUrl}`} component={components[i.ScreenName]} key={i.ScreenName}/>
                            }) : <div>
                                    <Route exact path={'/'} component={Login} />
                                </div>
                        }
                    </Switch>
                </HashRouter>
            </Layout>
        </PersistGate>
    )
}

export default Routes;
