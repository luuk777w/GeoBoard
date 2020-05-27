import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { container } from 'tsyringe';
import { connect } from 'react-redux';

import { AuthContainer } from '../../containers/auth/auth';
import { AuthorizeService } from '../../services/authorize.service';
import { mapToViewModel } from 'helpers/helpers';
import { LoginViewModel } from 'models/authViewModels';
import Alert from 'components/alert/alert';
import { showAlert, hideAlert } from 'store/alert/actions';
import { AlertType } from 'store/alert/types';
import { JWTService } from 'services/jwt.service';

import './login.scss';

interface LoginProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    history: any;
}

interface LoginState {
    username: string;
    password: string;
    remember: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {

    private authorizeService: AuthorizeService;
    private jwtService: JWTService;

    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
        this.jwtService = container.resolve(JWTService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        const loginData: LoginViewModel = {
            username: this.state.username.trim(),
            password: this.state.password,
            rememberMe: this.state.remember
        }

        if (loginData.username == "" || loginData.password == "") {
            this.props.showAlert(AlertType.Warning, "Username or password not filled in.");
            return;
        }

        await this.authorizeService.login(loginData)
            .then((response: any) => {
                this.jwtService.setToken(response.token);
                this.props.history.push("/");
            })
            .catch((error) => {
                if (error.status == 0) {
                    this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                    return;
                }

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Error, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "An unknown error occurred. Please try again.");
            });
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
                    <Alert />

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
                                    <input id="remember" type="checkbox" name="remember" onChange={(e) => this.handleInputChange(e)} />
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
