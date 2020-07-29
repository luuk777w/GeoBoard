import React, { FormEvent } from 'react';
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import { container } from 'tsyringe';
import { connect } from 'react-redux';

import { AuthContainer } from '../../containers/auth/auth';
import { AuthorizeService } from '../../services/authorize.service';
import { mapToType } from 'helpers/helpers';
import Alert from 'components/alert/alert';
import { showAlert, hideAlert } from 'store/alert/actions';
import { AlertType } from 'store/alert/types';
import { JWTService } from 'services/jwt.service';

import './reset-password.scss';
import { Button } from 'components/button/button';
import { PasswordResetViewModel } from 'models/passwordViewModels';
interface ResetPasswordProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    location: any;
    history: any;
}

interface ResetPasswordState {
    email: any;
    password: string;
    passwordConfirm: string;

    isSubmitting: boolean;
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            isSubmitting: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);

        const email = params.email || '';
        const token = params.token || '';

        if (email == undefined || email == '' || token == undefined || token == '') {
            this.props.history.push('/login');
            return;
        }

        this.setState({ email: email })
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        const params = queryString.parse(this.props.location.search);

        const data: PasswordResetViewModel = {
            email: this.state.email.trim(),
            password: this.state.password,
            token: params.token
        }

        if (this.state.password != this.state.passwordConfirm) {
            // TODO: Change to field error.
            this.props.showAlert(AlertType.Warning, "The confirmed password does not match the passsword.");
            return;
        }

        this.setState({ isSubmitting: true });

        await this.authorizeService.resetPassword(data)
            .then((response: any) => {
                this.setState({ isSubmitting: false });

                this.props.showAlert(AlertType.Success, `Your password has been reset succesfully.`);

                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ isSubmitting: false });

                if (error.status == 0) {
                    this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                    return;
                }

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Error, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "Something went wrong while resetting a password reset. Please try again.");
            });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            mapToType<ResetPasswordState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthContainer>
                <div className="reset-password-container animated fadeInDown">
                    <Alert />

                    <div className="panel">
                        <div className="panel-header">Reset your password</div>
                        <form method="post" id="resetPasswordForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <input type="email" onChange={(e) => this.handleInputChange(e)} id="email" value={this.state.email} name="email" placeholder="your-name@domain.com" autoComplete="email" />
                                    </div>
                                    <div className="validation-error" data-field="email"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" placeholder="Choose a strong password" autoFocus autoComplete="new-password" />
                                    </div>
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" onChange={(e) => this.handleInputChange(e)} id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your new password" autoComplete="new-password" />
                                    </div>
                                    <div className="validation-error" data-field="passwordConfirm"></div>
                                </div>

                                <div className="validation-error"></div>
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <Button isLoading={this.state.isSubmitting} type="submit" className="button button-green button-pd-2">Reset password</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthContainer>
        )
    }
}

export default connect(null, { showAlert, hideAlert })(ResetPassword);
