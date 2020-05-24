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
import { Register } from './views/register/register';
import { Provider } from 'react-redux';
import configureStore from "./store/index";
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {

    store = configureStore();

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Provider store={this.store.store}>
                <PersistGate loading={null} persistor={this.store.persistor}>
                    <Router>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
