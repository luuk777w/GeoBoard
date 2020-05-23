import React from 'react';
import './boardListItem.scss';
import 'css/components/button.scss';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { setActiveBoardId, setActiveBoardName } from 'store/board/actions';
import { BoardState } from 'store/board/types';

interface BoardListItemProps {
    boardId: string;
    boardName: string;
    username?: string;
    timestamp?: string;
    isOwner?: boolean;
    board: BoardState;
    setActiveBoardId: typeof setActiveBoardId;
    setActiveBoardName: typeof setActiveBoardName;
}

class BoardListItem extends React.Component<BoardListItemProps> {

    constructor(props: BoardListItemProps) {
        super(props);

        this.toggleBoard = this.toggleBoard.bind(this);
    }

    toggleBoard() {
        this.props.setActiveBoardId(this.props.boardId);
        this.props.setActiveBoardName(this.props.boardName);
    }

    render() {

        //Conditional rendering
        //Lees hier meer: https://reactjs.org/docs/conditional-rendering.html

        const isActive = this.props.board.activeBoardId == this.props.boardId ? true : false

        return (
            <li className={isActive ? "board-list-item active" : "board-list-item"} onClick={this.toggleBoard}>
                {this.props.boardName}
                {this.props.isOwner &&
                    <i title="You own this bord" className="fas fa-crown is-owner fa-fw ml-1"></i>
                }

                {this.props.isOwner
                    ? <div className="board-list-item-description">Created at <time>{this.props.timestamp}</time></div>
                    : <div className="board-list-item-description">Created by {this.props.username}</div>
                }
            </li>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar,
    board: state.board
})

export default connect(mapStateToProps, { setActiveBoardId, setActiveBoardName })(BoardListItem)
