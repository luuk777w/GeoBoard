import { Component } from "react";
import React from "react";

import BaseContainer from 'containers/base/base';

import './notFound.scss';

interface NotFoundProps {
    history: any;
}

export class NotFound extends Component<NotFoundProps> {

    render() {
        return (
            <BaseContainer history={this.props.history}>
                <h1>404 - Page not found</h1>
            </BaseContainer>
        );
    }
}
