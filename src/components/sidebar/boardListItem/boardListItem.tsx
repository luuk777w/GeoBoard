import React from 'react';
import './boardListItem.scss';
import 'css/components/button.scss';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { setActiveBoard, setJoinedUsers } from 'store/board/actions';
import { BoardState } from 'store/board/types';
import { JWTService } from 'services/jwt.service';
import { container } from 'tsyringe';
import { dateToReadableString } from 'helpers/helpers';
import { showManageBoardModal } from 'store/modals/manageBoardModal/actions';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { motion } from 'framer-motion';

interface BoardListItemProps {
    /**
     * The boardId of this specific boards list item.
     */
    boardId: string;
    boardName: string;
    userId: string;
    username: string;
    timestamp: Date;

    onBoardRemove: Function;
    onBoardLeave: Function;
    /**
     * The currently shown board.
     */
    activeBoardState: BoardState;
    setActiveBoard: typeof setActiveBoard;
    setJoinedUsers: typeof setJoinedUsers;

    showManageBoardModal: typeof showManageBoardModal;
}

interface BoardListItemState {
    removeBoardIsOpen: boolean;
    removeBoardName: string;

    leaveBoardIsOpen: boolean;
}

class BoardListItem extends React.Component<BoardListItemProps, BoardListItemState> {

    private jwtService: JWTService;
    private boardHubService: BoardHubService;

    constructor(props: BoardListItemProps) {
        super(props);

        this.state = {
            removeBoardIsOpen: false,
            removeBoardName: '',

            leaveBoardIsOpen: false
        }

        this.jwtService = container.resolve(JWTService);
        this.boardHubService = container.resolve(BoardHubService);
    }

    toggleBoard(event: any) {

        if (event.target.className.includes("remove-board")) return;
        else if (event.target.className.includes("title")) return;
        else if (event.target.className.includes("subtitle")) return;
        else if (event.target.className.includes("body")) return;
        else if (event.target.localName == "input") return;
        else if (event.target.localName == "button") return;
        else if (event.target.localName == "i") return;

        const boardToSwitchFrom = this.props.activeBoardState.boardId;
        const boardToSwitchTo = this.props.boardId;

        this.boardHubService.getConnection().invoke('SwitchBoard', boardToSwitchFrom, boardToSwitchTo)
            .then(() => {

                console.log('Switched succesfuly!')

                if (boardToSwitchFrom == boardToSwitchTo) {
                    // Don't set any board active.
                    this.props.setActiveBoard(null, null);

                    // Empty the joined users list.
                    this.props.setJoinedUsers([]);

                } else {
                    this.props.setActiveBoard(boardToSwitchTo, this.props.boardName);
                }
            })
            .catch((e) => {
                console.warn(e);
            });
    }

    promptRemoveBoard() {
        this.setState((state) => ({
            removeBoardIsOpen: !state.removeBoardIsOpen
        }));
    }

    removeBoard() {
        this.setState(() => ({
            removeBoardIsOpen: false,
            removeBoardName: ''
        }));

        this.props.onBoardRemove(this.props.boardId);
    }

    promptLeaveBoard() {
        this.setState((state) => ({
            leaveBoardIsOpen: !state.leaveBoardIsOpen
        }));
    }

    leaveBoard() {
        this.setState(() => ({
            leaveBoardIsOpen: false
        }));

        this.props.onBoardLeave(this.props.boardId, this.props.boardName);

        if (this.props.activeBoardState.boardId == this.props.boardId) {
            // Simulate a toggle to deselect the board.
            this.boardHubService.getConnection().invoke('SwitchBoard', this.props.boardId, this.props.boardId)
                .then(() => {
                    // Don't set any board active.
                    this.props.setActiveBoard(null, null);

                    // Empty the joined users list.
                    this.props.setJoinedUsers([]);
                });
        }
    }

    handleInputChange(event: any) {
        this.setState(() => ({
            removeBoardName: event.target.value
        }));
    }

    render() {

        const isActive = this.props.activeBoardState.boardId == this.props.boardId ? true : false
        const isOwner = this.props.userId == this.jwtService.getUserId();

        const variants = {
            open: {
                y: 0,
                opacity: 1,
                transition: {
                    y: { stiffness: 1000, velocity: -100 }
                }
            },
            closed: {
                y: 50,
                opacity: 0,
                transition: {
                    y: { stiffness: 1000 }
                }
            }
        };

        return (
            <>
                <motion.li className={isActive ? "board-list-item active" : "board-list-item"} onClick={() => this.toggleBoard(event)} variants={variants}
                >
                    {this.props.boardName}
                    {isOwner &&
                        <i title="Manage board and users" className="fas fa-cog manage-board fa-fw ml-1" onClick={() => this.props.showManageBoardModal(this.props.boardId)}></i>
                    }

                    {isOwner
                        ? <i title="Remove board" className="fas fa-trash remove-board fa-fw ml-1" onClick={() => this.promptRemoveBoard()}></i>
                        : <i title={`Leave '${this.props.boardName}'`} className="fas fa-sign-out-alt leave-board fa-fw" onClick={() => this.promptLeaveBoard()}></i>
                    }

                    {this.state.removeBoardIsOpen &&
                        <div className="remove-board-prompt">

                            <div className="remove-board-prompt-header">
                                <div className="remove-board-prompt-header-title">Are you sure you want to remove this board?</div>
                                <i title="Cancel" className="fas fa-times cancel fa-fw ml-1" onClick={() => this.promptRemoveBoard()}></i>
                            </div>

                            <div className="remove-board-prompt-body">
                                <div className="remove-board-prompt-text">All users will lose access and all items will be deleted. This action cannot be undone.</div>

                                <input type="text" placeholder="Enter boardname here to confirm" onChange={() => this.handleInputChange(event)} />

                                <button className="button button-red button-small" onClick={() => this.removeBoard()}
                                    disabled={this.props.boardName !== this.state.removeBoardName}>Remove board</button>
                            </div>
                        </div>
                    }

                    {this.state.leaveBoardIsOpen &&
                        <div className="leave-board-prompt">

                            <div className="leave-board-prompt-header">
                                <div className="leave-board-prompt-header-title">Are you sure you want to leave {this.props.boardName}?</div>
                                <i title="Cancel" className="fas fa-times cancel fa-fw ml-1" onClick={() => this.promptLeaveBoard()}></i>
                            </div>

                            <div className="leave-board-prompt-body">
                                <div className="leave-board-prompt-text mb-1">You will no longer have access to this board.</div>

                                <button className="button button-red button-small" onClick={() => this.leaveBoard()}>Leave board</button>
                            </div>
                        </div>
                    }

                    {isOwner
                        ? <div className="board-list-item-description">Created at <time dateTime={this.props.timestamp.toString()}>{dateToReadableString(this.props.timestamp)}</time></div>
                        : <div className="board-list-item-description">Created by {this.props.username}</div>
                    }
                </motion.li>
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
    activeBoardState: state.activeBoard
})

export default connect(mapStateToProps, { setActiveBoard, setJoinedUsers, showManageBoardModal })(BoardListItem)
