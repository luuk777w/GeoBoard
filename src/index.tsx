import "reflect-metadata";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss';
import './index.scss';
import { Home } from './screens/home/home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Login } from './screens/login/login';
import { Register } from './screens/register/register';
import { Provider } from 'react-redux';
import configureStore from "./store/index";

class App extends Component<{}, AppState> {

    store = configureStore();

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

interface AppState {
    sidebarIsOpen: boolean;
}
