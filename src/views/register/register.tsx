import React from 'react';
import { AuthContainer } from '../../containers/auth/auth';
import { Link } from 'react-router-dom';

import './register.scss';

export class Register extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <AuthContainer>
                <div className="register-container">

                    {/* ALERT HERE */}

                    <div className="panel animated fadeInDown">
                        <div className="panel-header">Create a GeoBoard account</div>

                        <form id="registerForm">
                            <div className="panel-body">

                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" name="username" placeholder="Choose a unique username" />
                                    <div className="validation-error" data-field="username"></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="name@domain.com" />
                                    <div className="validation-error" data-field="email"></div>
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" name="password" placeholder="Choose a strong password" />
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password-confirm">Confirm password</label>
                                    <input type="password" id="password-confirm" name="password-confirm" placeholder="Confirm your passsword" />
                                    <div className="validation-error" data-field="password-confirm"></div>
                                </div>

                            </div>

                            <div className="panel-body py-4">
                                <div className="terms checkbox">
                                    <input id="terms" name="terms" type="checkbox" />
                                    <label htmlFor="terms">I agree to the <span className="link ml-1" data-target="terms">terms of service</span>.</label>
                                </div>
                                <div className="validation-error" data-field="terms"></div>
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <button className="button button-green button-pd-2 loading" data-target="register">Create account</button>
                                    <Link to="/login" className="button button-link button-pd-2">I have an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthContainer>
        )
    }

}
