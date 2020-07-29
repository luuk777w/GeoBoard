import "reflect-metadata";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/main.scss';
import './index.scss';
import Home from './views/home/home'
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
import { NotFound } from "views/errors/notFound/notFound";
import EmailConfirmation from "views/register/emailConfirmation/emailConfirmation";
import Activate from "views/register/activate/activate";
import ForgotPassword from "views/forgot-password/forgot-password";
import ResetPassword from "views/reset-password/reset-password";


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
                            <AuthorizedRoute exact path="/" component={Home} />
                            <UnAuthorizedOnlyRoute path="/login" component={Login} />
                            <UnAuthorizedOnlyRoute exact path="/register" component={Register} />

                            <UnAuthorizedOnlyRoute path="/forgot-password" component={ForgotPassword} />
                            <UnAuthorizedOnlyRoute path="/reset-password" component={ResetPassword} />

                            <UnAuthorizedOnlyRoute path="/register/email-confirmation" component={EmailConfirmation} />
                            <UnAuthorizedOnlyRoute path="/register/activate" component={Activate} />

                            <AuthorizedRoute component={NotFound} />
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
