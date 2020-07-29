import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { container } from 'tsyringe';
import { connect } from 'react-redux';

import { AuthContainer } from '../../containers/auth/auth';
import { AuthorizeService } from '../../services/authorize.service';
import { mapToType } from 'helpers/helpers';
import Alert from 'components/alert/alert';
import { showAlert, hideAlert } from 'store/alert/actions';
import { AlertType } from 'store/alert/types';

import './forgot-password.scss';
import { Button } from 'components/button/button';
import { RequestPasswordResetViewModel } from 'models/passwordViewModels';

interface ForgotPasswordProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    history: any;
}

interface ForgotPasswordState {
    email: string;
    isSubmitting: boolean;
}

class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            isSubmitting: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.hideAlert();

        const data: RequestPasswordResetViewModel = {
            email: this.state.email.trim()
        }

        if (data.email == "") {
            this.props.showAlert(AlertType.Warning, "Please enter your email address", 5000);
            return;
        }

        this.setState({ isSubmitting: true });

        await this.authorizeService.requestPasswordReset(data)
            .then((response: any) => {
                this.setState({ isSubmitting: false });

                this.props.showAlert(AlertType.Success, `An email with instructions has beent sent if the given email exists. If you did not receive an email, please check your spam folder.`);
            })
            .catch((error) => {
                this.setState({ isSubmitting: false });

                if (error.status == 0) {
                    this.props.showAlert(AlertType.Error, "Could not reach the server. Please try again later.");
                    return;
                }

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Error, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "Something went wrong while requesting a password reset. Please try again.");
            });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            mapToType<ForgotPasswordState>({
                [name]: value
            })
        ));
    }

    render() {
        return (
            <AuthContainer>
                <div className="forgot-password-container animated fadeInDown">
                    <Alert />

                    <div className="panel">
                        <div className="panel-header">I forgot my password</div>
                        <form method="post" id="forgotPasswordForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">
                                <p>No worries! Please enter the email address you used upon registration. We will send you a link with instructions to reset your password.</p>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <input type="email" onChange={(e) => this.handleInputChange(e)} id="email" name="email" placeholder="your-name@domain.com" autoFocus autoComplete="email" />
                                    </div>
                                    <div className="validation-error" data-field="email"></div>
                                </div>

                                <div className="validation-error"></div>
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <Link to="/login" className="button button-link button-pd-2"><i className="fas fa-arrow-left fw-fw mr-1"></i>Back to login</Link>
                                    <Button isLoading={this.state.isSubmitting} type="submit" className="button button-green button-pd-2">Request password reset</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthContainer>
        )
    }
}

export default connect(null, { showAlert, hideAlert })(ForgotPassword);
