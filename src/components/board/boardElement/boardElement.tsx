import React from 'react';
import ReactDOM from 'react-dom';
import { UserViewModel } from 'models/UserViewModel';
import { Direction } from 'models/Direction';

import './boardElement.scss';

export class BoardElement extends React.Component<BoardElementProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="board-element animated bounceIn" data-element-id={this.props.id}>
                <div className="board-element-header">
                    <span className="board-element-number">{this.props.number}</span>
                    <span className="board-element-creator">{this.props.user.username}</span>
                    <i className="fas fa-trash ml-auto delete-icon" data-target="remove"></i>
                </div>
                <div className="board-element-body">
                    {this.props.imagePath
                        ? <img className="board-element-image" src={this.props.imagePath} />
                        : <p className="board-element-message">{this.props.note}</p>
                    }
                </div>
                <div className="board-element-footer">

                    {this.props.direction &&
                        <div className="board-element-direction">
                            <i className="fas fa-location-arrow direction mr-2"></i>{this.props.direction}
                        </div>
                    }

                    <time className="board-element-timestamp" dateTime={this.props.createdAt}>{this.props.createdAt}</time>
                </div>
            </div>
        )
    }
}

interface BoardElementProps {
    id: string;
    number: number;
    user: UserViewModel;
    // TODO: Use direction Enum
    direction: Direction;
    note: string;
    imagePath?: string;
    createdAt: string;
}
