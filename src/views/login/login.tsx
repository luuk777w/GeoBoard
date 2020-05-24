import React, { FormEvent } from 'react';
import { AuthContainer } from '../../containers/auth/auth';
import { Link } from 'react-router-dom';

import './login.scss';
import { container } from 'tsyringe';
import { AuthorizeService } from '../../services/authorize';
import { mapToViewModel } from 'helpers/helpers';
import { LoginViewModel } from 'models/authViewModels';
import Alert from 'components/alert/alert';
import { connect } from 'react-redux';
import { showAlert, hideAlert } from 'store/alert/actions';

interface LoginProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
}

interface LoginState {
    username: string;
    password: string;
    rememberMe: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.props.hideAlert();

        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    i = 1;

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const loginData: LoginViewModel = {
            username: this.state.username,
            password: this.state.password,
            rememberMe: this.state.rememberMe
        }

        await this.authorizeService.login(loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {

                if (this.i % 2) {
                    this.props.showAlert();
                } else {

                    this.props.hideAlert();
                }

                this.i++;
            })
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            mapToViewModel<LoginState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthContainer>
                <div className="login-container animated fadeInDown">
                    <Alert unmountOnExit={false} />

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
            </AuthContainer>
        )
    }
}

export default connect(null, { showAlert, hideAlert })(Login);
