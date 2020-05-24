import React from 'react';
import './sidebar.scss';
import 'css/components/button.scss';
import BoardListItem from './boardListItem/boardListItem';
import { CSSTransition } from 'react-transition-group';
import { container } from "tsyringe";
import { connect } from "react-redux";
import { AppState } from 'store';
import { SidebarState as SidebarState } from 'store/sidebar/types';
import { toggleSidebar } from "store/sidebar/actions"
import { HttpService } from 'services/http.service';

interface SidebarProps {
    toggleSidebar: typeof toggleSidebar;
    sidebar: SidebarState;
}

class Sidebar extends React.Component<SidebarProps> {

    private httpService: HttpService;

    constructor(props: SidebarProps) {
        super(props);

        this.httpService = container.resolve(HttpService);
    }

    render() {

        return (
            <CSSTransition in={this.props.sidebar.isOpen} unmountOnExit={true} timeout={300} classNames={{
                enter: 'animated slideInRight',
                exit: 'animated slideOutRight'
            }}>
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h4 className="m-0">Menu</h4>
                        <span className="close-sidebar" title="Close sidebar" onClick={this.props.toggleSidebar}>
                            <i className="fas fa-times fa-lg"></i>
                        </span>
                    </div>

                    <div className="sidebar-body">
                        {/*TODO ALERT HERE*/}

                        <div className="sidebar-section">
                            <div className="section-header">

                                <div className="section-header-section">
                                    <h3 className="sidebar-section-title sidebar-my-boards">My boards</h3>
                                    <button className="button button-small button-green" data-target="toggleCreateBoard">Create board</button>
                                </div>

                                <div className="section-header-section create-board-section" style={{ display: "none" }}>
                                    <input type="text" name="boardName" />
                                    <button className="button button-small button-green create-board-button"><i className="fa fa-check"></i></button>
                                </div>
                            </div>

                            <ul className="board-list">
                                <BoardListItem
                                    boardId="id1"
                                    boardName="Yo-Yo Yoghurt"
                                    username="Matthijs"
                                />

                                <BoardListItem
                                    boardId="id2"
                                    boardName="Coolheid"
                                    timestamp="02:47 19/05/2020"
                                    isOwner={true}
                                />
                            </ul>

                            {/* <p className="sidebar-text">You don't own any boards. Create one!</p> */}
                        </div>

                        <div className="sidebar-section">
                            <div className="section-header">
                                <h3 className="sidebar-section-title">My snapshots</h3>
                            </div>

                            <p className="sidebar-text">No snapshots available.</p>
                        </div>
                    </div>
                </aside>
            </CSSTransition>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
})

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);

