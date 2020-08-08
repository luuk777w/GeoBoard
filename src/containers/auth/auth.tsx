import React from 'react';
import './auth.scss';

import '../../css/components/forms.scss';
import '../../css/components/panel.scss';

class AuthContainerProps {
    pageType?: 'login' | 'register' | 'password-reset';
}

export class AuthContainer extends React.Component<AuthContainerProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={`auth-container ${this.props.pageType}`}>
                {this.props.children}
                <footer className="footer">
                    <code className="version">1.0 - Made with ❤️ by LuxMatter</code>
                </footer>
            </div>
        )
    }

}
