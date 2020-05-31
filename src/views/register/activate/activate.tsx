import { Component } from "react";
import React from "react";
import queryString from 'query-string'
import { container } from "tsyringe";

import { AuthContainer } from "containers/auth/auth";
import { AuthorizeService } from "services/authorize.service";
import { showAlert } from "store/alert/actions";
import { AlertType } from "store/alert/types";
import { connect } from "react-redux";
import Alert from "components/alert/alert";

import './activate.scss';

interface ActivateProps {
    showAlert: typeof showAlert;
    location: any;
    history: any;
}

class Activate extends Component<ActivateProps> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.authorizeService = container.resolve(AuthorizeService);
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);

        if (params.email == undefined || params.email == '' || params.token == undefined || params.token == '') {
            this.props.history.push('/login');
            return;
        }

        const email = `${params.email}`;
        const token = `${params.token}`;

        this.authorizeService.activateAccount(email, encodeURIComponent(token)).then(() => {
            this.props.showAlert(AlertType.Success, "Your account has been activated succesfully!");

            this.props.history.push('/login');
        })
            .catch((e) => {
                this.props.showAlert(AlertType.Error, "Something went wrong while activating your account. Please contact support.");
            });
    }

    render() {
        return (
            <AuthContainer>
                <Alert />
                {/* No content for this page. */}
            </AuthContainer>
        );
    }
}


export default connect(null, { showAlert })(Activate);
