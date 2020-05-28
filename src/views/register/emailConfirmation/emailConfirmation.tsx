import { Component } from "react";
import React from "react";
import queryString from 'query-string'
import { container } from "tsyringe";

import { AuthContainer } from "containers/auth/auth";
import Alert from 'components/alert/alert';
import { AuthorizeService } from "services/authorize.service";
import { showAlert, hideAlert } from "store/alert/actions";
import { AlertType } from "store/alert/types";
import { connect } from "react-redux";

import './emailConfirmation.scss';

interface EmailConfirmationProps {
    showAlert: typeof showAlert;
    hideAlert: typeof hideAlert;
    location: any;
    history: any;
}

class EmailConfirmation extends Component<EmailConfirmationProps> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.authorizeService = container.resolve(AuthorizeService);
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);

        if (params.email == undefined || params.email == '') {
            this.props.history.push('/login');
        }
    }

    resendEmail() {
        this.props.hideAlert();

        const params = queryString.parse(this.props.location.search);
        const email = `${params.email}`;

        this.authorizeService.resendActivationEmail(email)
            .then(() => {
                this.props.showAlert(AlertType.Success, 'A new activation email has been sent.');
                this.props.history.push('/login');
            })
            .catch((e) => {
                // TODO: Redirect with alert

                this.props.showAlert(AlertType.Error, 'Something went wrong while resending your activation email. Please try agian');
            });
    }

    render() {
        return (
            <AuthContainer>

                <div className="emailConfirmation-container animated fadeInDown">
                    <Alert />

                    <div className="panel">
                        <div className="panel-header">Activation email has been sent!</div>

                        <div className="panel-body pb-0 pt-2">
                            <img src="/assets/media/email.svg" alt="" />
                        </div>

                        <div className="panel-footer">
                            <p className="mt-0">Didn't receive an activation email?</p>

                            <button className="button button-blue" onClick={() => this.resendEmail()}>Send email again</button>
                        </div>
                    </div>
                </div>
            </AuthContainer>
        );
    }
}


export default connect(null, { showAlert, hideAlert })(EmailConfirmation);
