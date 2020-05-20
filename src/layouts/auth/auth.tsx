import React from 'react';
import './auth.scss';

export class AuthLayout extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="auth-layout">
                {this.props.children}
            </div>
        )
    }

}
