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

                            <div className="about-container">
                                <div className="logo-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.5 392l-18.6 119.7c-1.2 0-2.7 0.3-3.9 0.3C115.3 512 0 397.7 0 257c0-52.5 16.9-102.1 43.9-142.6 7.2 0.6 45-29.4 53.4-30L256 353.9 278.5 392z" fill="#69A8FF"/><path d="M278.5 392l-18.6 119.7c-1.2 0-2.7 0.3-3.9 0.3V353.9L278.5 392z" fill="#00C8C8"/><path d="M512 257c0 116.7-78.6 215.1-185.7 245.1L268.3 345.8 256 328.7 141.4 167.9 256 88.3l99.7-68.5C447.5 58.5 512 151.1 512 257z" fill="#69A8FF"/><path d="M512 257c0 116.7-78.6 215.1-185.7 245.1L268.3 345.8 256 328.7V88.3l99.7-68.5C447.5 58.5 512 151.1 512 257z" fill="#3389FF"/><path d="M429.2 306.2c-6.6-14.1-20.7-17.4-33.3-20.1 -24.3-5.4-34.2-10.5-46.8-31.8 -17.7-29.1-40.9-31.5-68.5-11.7 -6.6 4.8-12.6 9.3-24.6 11.4 -4.8 0.6-10.2 1.2-17.1 1.2 -24 0-38.4-13.8-43.2-25.8 -1.8-4.5-5.4-15.9 3.3-24.6 4.2-4.2 6.3-4.2 20.7 3 9 4.5 22.5 11.1 36.3 7.8 6.3-1.2 12.6-4.5 18.9-10.8 43.5-43.5 132.1 4.7 132.1-62.2 0-25.5-36-83.8-51.3-122.8C329.3 8.7 291.4 0 256 0 181.3 0 114.4 33.4 67.6 84.4c-8.4 9.6-16.5 19.5-23.7 30 7.2 0.6 15 0.6 23.4 0 9.9-0.3 33.3-1.2 37.2 2.7 0 0 1.5 6-9.9 24.3 -24.6 40.2-32.1 66.1-24.9 84.4C76.9 243.8 95.2 248.9 109.9 253.1c21 5.7 80.4 35.1 84 42.6V320.9c0 18.9 18 28.8 32.1 37.2 5.7 3.3 17.7 10.2 18.6 13.5 0 52.5 4.5 93.6 11.4 124.5 1.2 5.7 2.7 10.8 3.9 15.6 19.2-0.3 45.1-3.3 66.4-9.6 0-25.8 0-52.8-0.3-60.9 2.1-5.1 19.5-16.2 30.9-23.7C397.4 391.1 449.3 350.3 429.2 306.2z" fill="#93D632"/><path d="M274.9 204.8c-6.3 6.3-12.6 9.6-18.9 10.8V0c35.4 0 73.3 8.7 99.7 19.8C371 58.8 407 117.1 407 142.6 407 209.5 318.4 161.3 274.9 204.8z" fill="#78B22A"/><path d="M356.9 417.5c-11.4 7.5-28.8 18.6-30.9 23.7 0.3 8.1 0.3 35.1 0.3 60.9 -21.3 6.3-47.2 9.3-66.4 9.6 -1.2-4.8-2.7-9.9-3.9-15.6V254c12-2.1 18-6.6 24.6-11.4 27.6-19.8 50.8-17.4 68.5 11.7 12.6 21.3 22.5 26.4 46.8 31.8 12.6 2.7 26.7 6 33.3 20.1C449.3 350.3 397.4 391.1 356.9 417.5z" fill="#78B22A"/><path d="M407 242c-57.9 0-106 47.1-106 105 0 22.8 8.2 44.7 22 63l72 96c2.1 2.7 7.5 6 12 6s9.9-3.3 12-6l72-96C504.8 391.7 512 369.8 512 347 512 289.1 464.9 242 407 242zM407 392c-24.9 0-45-20.1-45-45s20.1-45 45-45 45 20.1 45 45S431.9 392 407 392z" fill="#FF2121"/><path d="M512 347c0 22.8-7.2 44.7-21 63l-72 96c-2.1 2.7-7.5 6-12 6V392c24.9 0 45-20.1 45-45s-20.1-45-45-45v-60C464.9 242 512 289.1 512 347z" fill="#B80000"/></svg>
                                    <h1>GeoBoard</h1>
                                </div>
                                <p className="about">
                                    GeoBoard is the online platform for sharing pictures on a board for all your friends to see! It is great for education, work and playing games like GeoGuessr!
                                </p>
                            </div>

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
