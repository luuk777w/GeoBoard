import React from 'react';
import { UserViewModel } from 'models/UserViewModel';
import { Direction } from 'models/Direction';

import './boardElement.scss';
import { dateToReadableString } from 'helpers/helpers';
import { Config } from 'util/config';
import { container } from 'tsyringe';
import { HttpService } from 'services/http.service';

import $ from 'jquery'
import { CSSTransition } from 'react-transition-group';

interface BoardElementProps {
    id: string;
    number: number;
    user: UserViewModel;
    // TODO: Use direction Enum
    direction?: Direction;
    note?: string;
    imageId?: string;
    createdAt: Date;
}

interface BoardElementState {
    show: boolean;
}

export class BoardElement extends React.Component<BoardElementProps, BoardElementState> {

    private config: Config;
    private httpService: HttpService;
    private ref: any;

    constructor(props: BoardElementProps) {
        super(props);


        this.state = {
            show: false,
        }

        this.config = container.resolve(Config);
        this.httpService = container.resolve(HttpService);
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

    removeElement() {
        //$(this.ref).slideUp(200);

        setTimeout(() => {
            this.httpService.deleteWithAuthorization(`/boards/elements/${this.props.id}`).then(() => {

            }, (error) => {
                console.warn(error);
            });
        }, 250);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(() => ({
                show: true
            }));
        }, 500);
    }

    render() {

        return (

            <CSSTransition in={this.state.show} timeout={200} classNames={{
                enter: 'animation-height',
                enterDone: 'animation-height',
                exit: ''
            }}>
                <div className="animation-wrapper animation-height-0">
                    <div className="board-element" data-element-id={this.props.id}>
                        <div className="board-element-header">
                            <span className="board-element-number">{this.props.number}</span>
                            <span className="board-element-creator">{this.props.user.username}</span>
                            <i className="fas fa-trash ml-auto delete-icon" onClick={() => this.removeElement()}></i>
                        </div>
                        <div className="board-element-body">
                            {this.props.imageId
                                ? <img className="board-element-image" src={`${this.config.apiUrl}/content/${this.props.imageId}`} />
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
                </div>

            </CSSTransition >

        )
    }
}
