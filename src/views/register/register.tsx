import React, { FormEvent } from 'react';
import { AuthContainer } from '../../containers/auth/auth';
import { Link, useHistory } from 'react-router-dom';
import Alert from 'components/alert/alert';

import './register.scss';
import { mapToViewModel } from 'helpers/helpers';
import { showAlert, hideAlert } from 'store/alert/actions';
import { connect } from 'react-redux';
import { AuthorizeService } from 'services/authorize.service';
import { container } from 'tsyringe';
import { RegisterViewModel } from 'models/authViewModels';
import { AlertType } from 'store/alert/types';

interface RegisterProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    history: any
}

interface RegisterState {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    terms: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            terms: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        // TODO: Change to field error.
        if (this.state.terms == false) {
            this.props.showAlert(AlertType.Info, "Please accept the terms of service to continue.");
            return;
        }

        if (this.state.password != this.state.passwordConfirm) {
            // TODO: Change to field error.
            this.props.showAlert(AlertType.Warning, "The confirmed password does not match the passsword.");
            return;
        }

        const registerData: RegisterViewModel = {
            username: this.state.username.trim(),
            email: this.state.email.trim(),
            password: this.state.password
        };

        await this.authorizeService.register(registerData)
            .then((response: any) => {
                this.props.history.push(`/register/email-confirmation?email=${registerData.email}`);
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
            mapToViewModel<RegisterState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthContainer>
                <div className="register-container">

                    <Alert />

                    <div className="panel animated fadeInDown">
                        <div className="panel-header">Create a GeoBoard account</div>

                        <form method="post" id="registerForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">

                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" onChange={(e) => this.handleInputChange(e)} id="username" name="username" placeholder="Choose a unique username" autoFocus />
                                    <div className="validation-error" data-field="username"></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" onChange={(e) => this.handleInputChange(e)} id="email" name="email" placeholder="name@domain.com" />
                                    <div className="validation-error" data-field="email"></div>
                                </div>
                            </div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" placeholder="Choose a strong password" />
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password-confirm">Confirm password</label>
                                    <input type="password" onChange={(e) => this.handleInputChange(e)} id="password-confirm" name="passwordConfirm" placeholder="Confirm your passsword" />
                                    <div className="validation-error" data-field="password-confirm"></div>
                                </div>

                            </div>

                            <div className="panel-body py-4">
                                <div className="terms checkbox">
                                    <input id="terms" onChange={(e) => this.handleInputChange(e)} name="terms" type="checkbox" />
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

export default connect(null, { showAlert, hideAlert })(Register);
