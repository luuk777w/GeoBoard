import React, { FormEvent } from 'react';
import { AuthLayout } from '../../layouts/auth/auth';
import { Link } from 'react-router-dom';

import './login.scss';
import { container } from 'tsyringe';
import { AuthorizeService } from '../../services/authorize';

export class Login extends React.Component<{}, LoginState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await this.authorizeService.login(this.state.username, this.state.password, this.state.rememberMe)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => console.log(e))
    }

    map<T>(object: any): T {
        return object;
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            this.map<LoginState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthLayout>
                <div className="login-container animated fadeInDown">
                    {/* ALERT HERE */}

                    <div className="panel">
                        <div className="panel-header">Login to GeoBoard</div>

                        <form method="post" id="loginForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} id="username" name="username" placeholder="Username" autoFocus />
                                    </div>
                                    <div className="validation-error" data-field="username"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="remember checkbox">
                                    <input id="remember" type="checkbox" name="remember" onChange={(e) => this.handleInputChange(e)} checked={this.state.rememberMe} />
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

interface LoginState {
    username: string;
    password: string;
    rememberMe: boolean;
}
