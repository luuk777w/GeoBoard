import React from 'react';
import ReactDOM from 'react-dom';
import './boardListItem.scss';
import '../../css/components/button.scss';

export class BoardListItem extends React.Component<BoardListItemProps> {

    constructor(props: any) {
        super(props);

        this.toggleBoard = this.toggleBoard.bind(this);
    }

    toggleBoard() {
        this.props.onClick(this);
    }

    render() {

        //Conditional rendering
        //Lees hier meer: https://reactjs.org/docs/conditional-rendering.html

        const isActive = this.props.activeBoardId == this.props.boardId ? true : false

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

interface BoardListItemProps {
    boardId: string;
    boardName: string;
    activeBoardId: string;
    onClick: any;
    username?: string;
    timestamp?: string;
    isOwner?: boolean;
}
