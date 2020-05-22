import React from 'react';
import './sidebar.scss';
import '../../css/components/button.scss';
import { BoardListItem } from './boardListItem/boardListItem';
import { CSSTransition } from 'react-transition-group';
import { container } from "tsyringe";
import { HttpService } from '../../services/http';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { toggleSidebar } from "../../store/sidebar/actions"

interface SidebarProps {
    isOpen?: boolean;
}

interface SidebarState {
    activeBoardId: string;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {

    private httpService: HttpService;

    constructor(props: SidebarProps) {
        super(props);
        this.state = { activeBoardId: '' };

        this.toggleBoard = this.toggleBoard.bind(this);

        this.httpService = container.resolve(HttpService);
    }

    // Lifting state up \/
    // Lees hier meer: https://reactjs.org/docs/lifting-state-up.html
    toggleBoard(board: BoardListItem) {
        const boardId = board.props.boardId;

        this.setState(state => ({
            activeBoardId: state.activeBoardId == boardId ? "" : boardId
        }));
    }

    render() {

        return (
            <CSSTransition in={this.props.isOpen} unmountOnExit={true} timeout={300} classNames={{
                enter: 'animated slideInRight',
                exit: 'animated slideOutRight'
            }}>
                <div className="side-nav">
                    <div className="side-nav-header">
                        <h4 className="m-0">Menu</h4>
                        <span className="close-sidebar" title="Close sidebar" onClick={() => toggleSidebar()}>
                            <i className="fas fa-times fa-lg"></i>
                        </span>
                    </div>

                    <div className="side-nav-body">
                        {/*TODO ALERT HERE*/}

                        <div className="side-nav-section">
                            <div className="section-header">

                                <div className="section-header-section">
                                    <h3 className="side-nav-section-title side-nav-my-boards">My boards</h3>
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
                                    activeBoardId={this.state.activeBoardId}
                                    onClick={this.toggleBoard} />

                                <BoardListItem
                                    boardId="id2"
                                    boardName="Coolheid"
                                    timestamp="02:47 19/05/2020"
                                    isOwner={true}
                                    activeBoardId={this.state.activeBoardId}
                                    onClick={this.toggleBoard} />
                            </ul>

                            {/* <p className="side-nav-text">You don't own any boards. Create one!</p> */}
                        </div>

                        <div className="side-nav-section">
                            <div className="section-header">
                                <h3 className="side-nav-section-title">My snapshots</h3>
                            </div>

                            <p className="side-nav-text">No snapshots available.</p>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar
})

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);

