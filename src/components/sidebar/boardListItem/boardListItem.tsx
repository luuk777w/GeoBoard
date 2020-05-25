import React from 'react';
import './boardListItem.scss';
import 'css/components/button.scss';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { setActiveBoardId, setActiveBoardName } from 'store/board/actions';
import { BoardState } from 'store/board/types';
import { JWTService } from 'services/jwt.service';
import { container } from 'tsyringe';
import { dateToReadableString } from 'helpers/helpers';

interface BoardListItemProps {
    boardId: string;
    boardName: string;
    userId: string;
    username: string;
    timestamp: Date;
    activeBoard: BoardState;
    setActiveBoardId: typeof setActiveBoardId;
    setActiveBoardName: typeof setActiveBoardName;
}

class BoardListItem extends React.Component<BoardListItemProps> {

    private jwtService: JWTService;

    constructor(props: BoardListItemProps) {
        super(props);

        this.toggleBoard = this.toggleBoard.bind(this);

        this.jwtService = container.resolve(JWTService);
    }

    toggleBoard() {
        this.props.setActiveBoardId(this.props.boardId);
        this.props.setActiveBoardName(this.props.boardName);
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

export default connect(mapStateToProps, { setActiveBoardId, setActiveBoardName })(BoardListItem)
