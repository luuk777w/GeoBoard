import React, { CSSProperties } from 'react';
import Navbar from 'components/navbar/navbar';
import Sidebar from 'components/sidebar/sidebar';
import Announcement from 'components/announcement/announcement';
import './base.scss';
import { SystemState } from 'store/system/types';
import { AppState } from 'store';
import { connect } from 'react-redux';
import ManageBoardModal from 'components/modal/manageBoardModal/manageBoardModal';
import BackgroundSwitchModal from 'components/modal/backgroundSwitchModal/backgroundSwitchModal';
import { ManageBoardModalState } from 'store/modals/manageBoardModal/types';

import '../../css/components/forms.scss';
import '../../css/components/panel.scss';
import '../../css/components/table.scss';

interface BaseContainerProps {
    system: SystemState;
    children: any;
    history: any;
}

class BaseContainer extends React.Component<BaseContainerProps> {

    constructor(props: BaseContainerProps) {
        super(props);

        this.getBackgroundImageStyle = this.getBackgroundImageStyle.bind(this);
    }

    getBackgroundImageStyle(): CSSProperties {
        if (this.props.system.backgroundImageUrl != undefined && this.props.system.backgroundImageUrl != null) {
            return {
                backgroundImage: `url('/assets/media/backgrounds/${this.props.system.backgroundImageUrl}.jpg')`
            }
        }

        return {};
    }

    render() {

        return (

            <div style={this.getBackgroundImageStyle()} className={this.props.system.darkThemeIsActive ? "home-container dark-theme" : "home-container"}>
                <Navbar history={this.props.history} />
                <Announcement />
                <Sidebar />
                {this.props.children}

                {/* Modals */}
                <ManageBoardModal />
                <BackgroundSwitchModal />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
})

export default connect(mapStateToProps, {})(BaseContainer);
