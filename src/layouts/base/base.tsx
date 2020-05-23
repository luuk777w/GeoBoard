import React from 'react';
import Navbar from 'components/navbar/navbar';
import Sidebar from 'components/sidebar/sidebar';
import './base.scss';
import { SystemState } from 'store/system/types';
import { AppState } from 'store';
import { connect } from 'react-redux';

interface BaseLayoutProps {
    system: SystemState;
    children: any;
}

class BaseLayout extends React.Component<BaseLayoutProps> {

    constructor(props: BaseLayoutProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.system.darkThemeIsActive ? "base-layout dark-theme" : "base-layout"}>
                <Navbar />
                <Sidebar />
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
})

export default connect(mapStateToProps, {})(BaseLayout);
