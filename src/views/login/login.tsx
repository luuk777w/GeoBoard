import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { container } from 'tsyringe';
import { connect } from 'react-redux';

import { AuthContainer } from '../../containers/auth/auth';
import { AuthorizeService } from '../../services/authorize.service';
import { mapToType } from 'helpers/helpers';
import { LoginViewModel } from 'models/authViewModels';
import Alert from 'components/alert/alert';
import { showAlert, hideAlert } from 'store/alert/actions';
import { AlertType } from 'store/alert/types';
import { JWTService } from 'services/jwt.service';

import './login.scss';
import { Button } from 'components/button/button';

interface LoginProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    history: any;
}

interface LoginState {
    userName: string;
    password: string;
    remember: boolean;
    isSubmitting: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {

    private authorizeService: AuthorizeService;
    private jwtService: JWTService;

    constructor(props: any) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            remember: false,
            isSubmitting: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
        this.jwtService = container.resolve(JWTService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        const loginData: LoginViewModel = {
            userName: this.state.userName.trim(),
            password: this.state.password,
            rememberMe: this.state.remember
        }

        if (loginData.userName == "" || loginData.password == "") {
            this.props.showAlert(AlertType.Warning, "Username or password not filled in.", 5000);
            return;
        }

        this.setState({ isSubmitting: true });

        await this.authorizeService.login(loginData)
            .then((response: any) => {
                this.jwtService.setAccessToken(response.accessToken);
                this.jwtService.setRefreshToken(response.refreshToken)

                this.setState({ isSubmitting: false });

                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ isSubmitting: false });

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
            mapToType<LoginState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthContainer>

                <div className="login-container">
                    <Alert />

                    <div className="login-panel">

                        <div className="panel-left">

                            <div className="logo-container">
                                <img src="/assets/media/favicons/android-chrome-512x512.png" alt="" />
                                <h1>GeoBoard</h1>
                            </div>
                            <p className="about">
                                GeoBoard is the online platform for sharing pictures on a board for all your friends to see! It is great for education, work and playing games like GeoGuessr!
                            </p>

                            <div className="register">

                                <p>No account yet?</p>

                                <Link to="/register" className="button register-button">Register</Link>

                            </div>

                        </div>
                        <div className="panel-right">

                            <div className="inner">

                                <h1>Login to GeoBoard</h1>

                                <form method="post" id="loginForm" onSubmit={(event) => this.onSubmit(event)}>

                                    <div className="group">
                                        <label htmlFor="userName">Username</label>
                                        <div className="input-group">
                                            <div className="input-prefix">
                                                <i className="fa fa-user"></i>
                                            </div>
                                            <input type="text" onChange={(e) => this.handleInputChange(e)} id="userName" name="userName" autoFocus autoComplete="username" />
                                        </div>
                                        <div className="validation-error" data-field="userName"></div>
                                    </div>

                                    <div className="group">
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group">
                                            <div className="input-prefix">
                                                <i className="fa fa-lock"></i>
                                            </div>
                                            <input type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" autoComplete="current-password" />
                                        </div>
                                        <div className="validation-error" data-field="password"></div>
                                    </div>

                                    <div className="remember checkbox">
                                        <input id="remember" type="checkbox" name="remember" onChange={(e) => this.handleInputChange(e)} />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <div className="validation-error"></div>

                                    <div className="login-button-container">
                                        <Button isLoading={this.state.isSubmitting} type="submit" className="button login-button">Login</Button>
                                        <Link to="/forgot-password" className="button button-link button-pd-2 forgot-password">Forgot password?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="login-container animated fadeInDown">
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
                                        <input type="text" onChange={(e) => this.handleInputChange(e)} id="userName" name="userName" placeholder="Username" autoFocus autoComplete="username" />
                                    </div>
                                    <div className="validation-error" data-field="userName"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" placeholder="Password" autoComplete="current-password" />
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
                                    <Button isLoading={this.state.isSubmitting} type="submit" className="button button-green button-pd-2">Login</Button>
                                    <Link to="/forgot-password" className="button button-link button-pd-2">Forgot password</Link>
                                </div>

                                <p className="register-information pt-1">No account yet? <Link to="/register">Create one here</Link></p>
                            </div>
                        </form>
                    </div>
                </div> */}
            </AuthContainer>
        )
    }
}

export default connect(null, { showAlert, hideAlert })(Login);
