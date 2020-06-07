import React from 'react';
import Navbar from 'components/navbar/navbar';
import Sidebar from 'components/sidebar/sidebar';
import Announcement from 'components/announcement/announcement';
import './base.scss';
import { SystemState } from 'store/system/types';
import { AppState } from 'store';
import { connect } from 'react-redux';
import ManageBoardModal from 'components/modal/manageBoardModal/manageBoardModal';
import { ManageBoardModalState } from 'store/modals/manageBoardModal/types';

interface BaseContainerProps {
    system: SystemState;
    manageBoardModal: ManageBoardModalState;
    children: any;
    history: any;
}

class BaseContainer extends React.Component<BaseContainerProps> {

    constructor(props: BaseContainerProps) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.system.darkThemeIsActive ? "home-container dark-theme" : "home-container"}>
                <Navbar history={this.props.history} />
                <Announcement />
                <Sidebar />
                {this.props.children}

                {/* Modals */}
                <ManageBoardModal />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    manageBoardModal: state.manageBoardModal
})

export default connect(mapStateToProps, {})(BaseContainer);
