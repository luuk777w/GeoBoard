import React from 'react';
import './announcement.scss'
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { AnnouncementState } from 'store/announcement/types';

interface AnnouncementProps {
    announcement: AnnouncementState;
}

class Announcement extends React.Component<AnnouncementProps> {

    constructor(props: AnnouncementProps) {
        super(props);
    }

    render() {

        const cssTransitionEnter = 'announcement-animation-height-open';
        const animationStyle = 'announcement-height-animation-wrapper announcement-animation-height-closed';

        const announcementStyle = 'announcement ' + this.props.announcement.type;

        return (
            <CSSTransition in={this.props.announcement.show} timeout={200} classNames={{
                enter: cssTransitionEnter,
                enterDone: cssTransitionEnter,
                exit: ''
            }}>
                <div className={animationStyle}>
                    <div className={announcementStyle}>{this.props.announcement.body}</div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    announcement: state.announcement,
})

export default connect(mapStateToProps, {})(Announcement);
