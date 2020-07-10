import React from 'react';
import './auth.scss';

import '../../css/components/forms.scss';
import '../../css/components/panel.scss';

export class AuthContainer extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="auth-container">
                {this.props.children}
            </div>
        )
    }

}
