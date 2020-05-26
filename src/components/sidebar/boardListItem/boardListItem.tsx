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
     * The boardId of this specific board list item.
     */
    boardId: string;
    boardName: string;
    userId: string;
    username: string;
    timestamp: Date;
    /**
     * The currently shown board.
     */
    activeBoard: BoardState;
    setActiveBoard: typeof setActiveBoard;
}

class BoardListItem extends React.Component<BoardListItemProps> {

    private jwtService: JWTService;
    private boardHubService: BoardHubService;

    constructor(props: BoardListItemProps) {
        super(props);

        this.toggleBoard = this.toggleBoard.bind(this);

        this.jwtService = container.resolve(JWTService);
        this.boardHubService = container.resolve(BoardHubService);
    }

    toggleBoard() {
        if (this.props.boardId != '') {
            this.props.setActiveBoard(this.props.boardId, this.props.boardName);

            const activeBoard = (this.props.activeBoard.activeBoardId == '') ? null : this.props.activeBoard.activeBoardId;

            this.boardHubService.getConnection().invoke('SwitchBoard', activeBoard, this.props.boardId);
        }
    }

    render() {

        //Conditional rendering
        //Lees hier meer: https://reactjs.org/docs/conditional-rendering.html

        const isActive = this.props.activeBoard.activeBoardId == this.props.boardId ? true : false
        const isOwner = this.props.userId == this.jwtService.getUserId();

        return (
            <li className={isActive ? "board-list-item active" : "board-list-item"} onClick={this.toggleBoard}>
                {this.props.boardName}
                {isOwner &&
                    <i title="You own this bord" className="fas fa-crown is-owner fa-fw ml-1"></i>
                }

                {isOwner
                    ? <div className="board-list-item-description">Created at <time dateTime={this.props.timestamp.toString()}>{dateToReadableString(this.props.timestamp)}</time></div>
                    : <div className="board-list-item-description">Created by {this.props.username}</div>
                }
            </li>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
    activeBoard: state.board
})

export default connect(mapStateToProps, { setActiveBoard })(BoardListItem)
