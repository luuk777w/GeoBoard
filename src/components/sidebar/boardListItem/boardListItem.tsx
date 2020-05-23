import React from 'react';
import './boardListItem.scss';
import 'css/components/button.scss';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { setBoardId } from 'store/sidebar/actions';
import { SidebarState } from 'store/sidebar/types';

interface BoardListItemProps {
    boardId: string;
    boardName: string;
    username?: string;
    timestamp?: string;
    isOwner?: boolean;
    sidebar: SidebarState;
    setBoardId: typeof setBoardId;
}

class BoardListItem extends React.Component<BoardListItemProps> {

    constructor(props: BoardListItemProps) {
        super(props);

        this.toggleBoard = this.toggleBoard.bind(this);
    }

    toggleBoard() {
        this.props.setBoardId(this.props.boardId);
    }

    render() {

        //Conditional rendering
        //Lees hier meer: https://reactjs.org/docs/conditional-rendering.html

        const isActive = this.props.sidebar.activeBoardId == this.props.boardId ? true : false

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
    sidebar: state.sidebar
})

export default connect(mapStateToProps, { setBoardId })(BoardListItem)
