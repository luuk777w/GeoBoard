import React from 'react';
import { UserViewModel } from 'models/UserViewModel';
import { Direction } from 'models/Direction';

import './boardElement.scss';
import { dateToReadableString } from 'helpers/helpers';

interface BoardElementProps {
    id: string;
    number: number;
    user: UserViewModel;
    // TODO: Use direction Enum
    direction?: Direction;
    note?: string;
    imagePath?: string;
    createdAt: Date;
}

export class BoardElement extends React.Component<BoardElementProps> {

    constructor(props: BoardElementProps) {
        super(props);
    }

    getReadableDirection(direction: Direction) {
        // TODO: Richtingen vertalen
        switch (direction) {
            case Direction.North: return 'Noord';
            case Direction.NorthEast: return 'Noordoost';
            case Direction.East: return 'Oost';
            case Direction.SouthEast: return 'Zuidoost';
            case Direction.South: return 'Zuid';
            case Direction.SouthWest: return 'Zuidwest';
            case Direction.West: return 'West';
            case Direction.NorthWest: return 'Noordwest';
        }
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
                            <i className="fas fa-location-arrow direction mr-2"></i>{this.getReadableDirection(this.props.direction)}
                        </div>
                    }

                    <time className="board-element-timestamp" dateTime={this.props.createdAt.toString()}>{dateToReadableString(this.props.createdAt)}</time>
                </div>
            </div>
        )
    }
}
