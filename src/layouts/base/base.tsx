import React from 'react';
import Navbar from 'components/navbar/navbar';
import Sidebar from 'components/sidebar/sidebar';
import './base.scss';

export class BaseLayout extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="base-layout">
                <Navbar />
                <Sidebar />
                {this.props.children}
            </div>
        )
    }
}
