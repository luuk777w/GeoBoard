import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizeService } from 'services/authorize.service';
import { container } from 'tsyringe';

export const UnAuthorizedOnlyRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        container.resolve(AuthorizeService).isAuthorized() === false
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />);



