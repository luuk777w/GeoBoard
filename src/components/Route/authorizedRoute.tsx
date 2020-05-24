import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizeService } from 'services/authorize.service';
import { container } from 'tsyringe';

export const AuthorizedRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        container.resolve(AuthorizeService).isAuthorized() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />);



