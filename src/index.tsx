import "reflect-metadata";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss';
import './index.scss';
import { Home } from './views/home/home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './views/login/login';
import Register from './views/register/register';
import { Provider } from 'react-redux';
import { store } from "./store/index";
import { PersistGate } from 'redux-persist/integration/react';
import { AuthorizedRoute } from "components/Route/authorizedRoute";
import { UnAuthorizedOnlyRoute } from "components/Route/unauthorizedOnlyRoute";


class App extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Provider store={store.store}>
                <PersistGate loading={null} persistor={store.persistor}>
                    <Router>
                        <Switch>
                            <UnAuthorizedOnlyRoute path="/login" component={Login} />
                            <UnAuthorizedOnlyRoute path="/register" component={Register} />
                            <AuthorizedRoute path="/" component={Home} />
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
