import React, { FormEvent } from 'react';
import { AuthContainer } from '../../containers/auth/auth';
import { Link } from 'react-router-dom';
import Alert from 'components/alert/alert';

import './register.scss';
import { mapToType } from 'helpers/helpers';
import { showAlert, hideAlert } from 'store/alert/actions';
import { connect } from 'react-redux';
import { AuthorizeService } from 'services/authorize.service';
import { container } from 'tsyringe';
import { RegisterViewModel } from 'models/authViewModels';
import { AlertType } from 'store/alert/types';
import { FormFieldValidationErrors } from 'components/formFieldValidationErrors/formFieldValidationErrors';
import { Form } from 'components/form/form';
import { FormGroup } from 'components/form/formGroup';
import { FormLabel } from 'components/form/formLabel';
import FormInput from 'components/form/formInput';
import { Button } from 'components/button/button';

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
    errors: any;
    isSubmitting: boolean;
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
            terms: false,
            errors: {},
            isSubmitting: false
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

        this.setState({ isSubmitting: true });

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

                // TODO: Show field specific errors.
                this.setState({
                    errors: error.responseJSON.errors
                });

                console.log(error.responseJSON.errors);

                error.responseJSON.message != null
                    ? this.props.showAlert(AlertType.Error, error.responseJSON.message)
                    : this.props.showAlert(AlertType.Error, "An unknown error occurred. Please try again.");
            })
            .finally(() => {
                this.setState({isSubmitting: false});
            });;
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(() => (
            mapToType<RegisterState>({
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

                        <Form method="post" id="registerForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">
                                <FormGroup>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <FormInput type="text" onChange={(e) => this.handleInputChange(e)} id="username" name="username" placeholder="Choose a unique username" autoFocus />

                                    <FormFieldValidationErrors field="Username" errors={this.state.errors} />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <FormInput type="email" onChange={(e) => this.handleInputChange(e)} id="email" name="email" placeholder="name@domain.com" />

                                    <FormFieldValidationErrors field="Email" errors={this.state.errors} />
                                </FormGroup>
                            </div>

                            <div className="panel-body">
                                <FormGroup>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormInput type="password" onChange={(e) => this.handleInputChange(e)} id="password" name="password" placeholder="Choose a strong password" />

                                    <FormFieldValidationErrors field="Password" errors={this.state.errors} />
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="password-confirm">Confirm password</FormLabel>
                                    <FormInput type="password" onChange={(e) => this.handleInputChange(e)} id="password-confirm" name="passwordConfirm" placeholder="Confirm your passsword" />

                                    <FormFieldValidationErrors field="PasswordConfirm" errors={this.state.errors} />
                                </FormGroup>

                            </div>

                            <div className="panel-body py-4">
                                <div className="terms checkbox">
                                    <FormInput id="terms" onChange={(e) => this.handleInputChange(e)} name="terms" type="checkbox" />
                                    <FormLabel htmlFor="terms">I agree to the <span className="link ml-1" data-target="terms">terms of service</span>.</FormLabel>
                                </div>
                                <FormFieldValidationErrors field="Terms" errors={this.state.errors} />
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <Button isLoading={this.state.isSubmitting} className="button button-green button-pd-2 loading" data-target="register">Create account</Button>
                                    <Link to="/login" className="button button-link button-pd-2">I have an account</Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </AuthContainer>
        )
    }

}

export default connect(null, { showAlert, hideAlert })(Register);
