import React, { Component } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizeService } from 'services/authorize.service';
import { container } from 'tsyringe';

interface AuthorizedRouteState {
    authorized?: boolean;
}
export class AuthorizedRoute extends Component<any, AuthorizedRouteState> {

    constructor(props: any) {
        super(props);

        this.state = {
            authorized: undefined
        }
    }

    async componentDidMount() {
        await container.resolve(AuthorizeService).isAuthorized()
            .then(() => this.setState({ authorized: true }))
            .catch(() => this.setState({ authorized: false }));
    }

    render() {
        const {component: Component, ...rest} = this.props;

        return <Route {...rest} render={(props) => {

            if (this.state.authorized != undefined) {

                if (this.state.authorized == true) {
                    return (<Component {...props} />);
                }

                return (<Redirect to='/login' />);
            }
        }} />
    }
}
