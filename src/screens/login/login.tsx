import React from 'react';
import ReactDOM from 'react-dom';
import { AuthLayout } from '../../layouts/auth/auth';
import { Link } from 'react-router-dom';

import './login.scss';

export class Login extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <AuthLayout>
                <div className="login-container animated fadeInDown">
                    {/* ALERT HERE */}

                    <div className="panel">
                        <div className="panel-header">Login to GeoBoard</div>

                        <form id="loginForm">
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <input type="text" id="username" name="username" placeholder="Username" autoFocus />
                                    </div>
                                    <div className="validation-error" data-field="username"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" id="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="remember checkbox">
                                    <input id="remember" type="checkbox" name="remember" />
                                    <label htmlFor="remember">Remember me</label>
                                </div>

                                <div className="validation-error"></div>
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <button type="submit" className="button button-green button-pd-2">Login</button>
                                    <button className="button button-link button-pd-2" data-target="recover-password">Reset password</button>
                                </div>

                                <p className="register-information pt-1">No account yet? <Link to="/register">Create one here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthLayout>
        )
    }

}
