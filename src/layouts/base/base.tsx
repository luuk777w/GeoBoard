import React from 'react';
import './base.scss';

export class BaseLayout extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="base-layout">
                {this.props.children}
            </div>
        )
    }

}
