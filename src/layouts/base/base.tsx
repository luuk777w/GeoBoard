import React from 'react';
import Navbar from 'components/navbar/navbar';
import Sidebar from 'components/sidebar/sidebar';
import './base.scss';
import { AppState } from 'store/app/types';
import { RootState } from 'store';
import { connect } from 'react-redux';

interface BaseLayoutProps {
    app?: AppState;
    children: any;
}

class BaseLayout extends React.Component<BaseLayoutProps> {

    constructor(props: BaseLayoutProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.app?.darkThemeIsActive ? "base-layout dark-theme" : "base-layout"}>
                <Navbar />
                <Sidebar />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    app: state.app,
})

export default connect(mapStateToProps, null)(BaseLayout);
