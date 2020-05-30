import React from 'react';
import './boardListItem.scss';
import 'css/components/button.scss';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { setActiveBoard } from 'store/board/actions';
import { BoardState } from 'store/board/types';
import { JWTService } from 'services/jwt.service';
import { container } from 'tsyringe';
import { dateToReadableString } from 'helpers/helpers';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { BoardViewModel } from 'models/BoardViewModel';

interface BoardListItemProps {
    /**
     * The boardId of this specific boards list item.
     */
    boardId: string;
    boardName: string;
    userId: string;
    username: string;
    timestamp: Date;
    onRemoveBoard: Function;
    /**
     * The currently shown board.
     */
    activeBoardState: BoardState;
    setActiveBoard: typeof setActiveBoard;
}

interface BoardListItemState {
    removeBoardIsOpen: boolean;
    removeBoardName: string;
}

class BoardListItem extends React.Component<BoardListItemProps, BoardListItemState> {

    private jwtService: JWTService;
    private boardHubService: BoardHubService;

    constructor(props: BoardListItemProps) {
        super(props);

        this.state = {
            removeBoardIsOpen: false,
            removeBoardName: ''
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

        const boardId = this.props.activeBoardState.boardId == this.props.boardId ? null : this.props.boardId;
        const boardName = this.props.activeBoardState.name == this.props.boardName ? null : this.props.boardName;

        if (boardId == null) {
        } else {
        }
        this.props.setActiveBoard(boardId, boardName);
        this.boardHubService.getConnection().invoke('SwitchBoard', boardId, this.props.boardId);
    }

    promptRemoveBoard() {
        this.setState((state) => ({
            removeBoardIsOpen: !state.removeBoardIsOpen
        }))
    }

    removeBoard() {
        this.setState(() => ({
            removeBoardIsOpen: false,
            removeBoardName: ''
        }));

        this.props.onRemoveBoard(this.props.boardId);
    }

    handleInputChange(event: any) {
        this.setState(() => ({
            removeBoardName: event.target.value
        }));
    }

    render() {

        const isActive = this.props.activeBoardState.boardId == this.props.boardId ? true : false
        const isOwner = this.props.userId == this.jwtService.getUserId();

        return (
            <>
                <li className={isActive ? "board-list-item active" : "board-list-item"} onClick={() => this.toggleBoard(event)}>
                    {this.props.boardName}
                    {isOwner &&
                        <i title="You own this bord" className="fas fa-crown is-owner fa-fw ml-1"></i>
                    }

                    {isOwner &&
                        <i title="Remove board" className="fas fa-trash remove-board fa-fw ml-1" onClick={() => this.promptRemoveBoard()}></i>
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

                    {isOwner
                        ? <div className="board-list-item-description">Created at <time dateTime={this.props.timestamp.toString()}>{dateToReadableString(this.props.timestamp)}</time></div>
                        : <div className="board-list-item-description">Created by {this.props.username}</div>
                    }
                </li>



            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
    activeBoardState: state.activeBoard
})

export default connect(mapStateToProps, { setActiveBoard })(BoardListItem)
