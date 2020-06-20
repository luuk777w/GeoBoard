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
import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { AppState } from 'store';
import { BoardState } from 'store/board/types';
import { connect } from 'react-redux';

interface BoardElementProps {
    element: BoardElementViewModel;
}

interface BoardElementState {
    show: boolean;
    imageNotFound: boolean;
}

export class BoardElement extends React.Component<BoardElementProps, BoardElementState> {

    private config: Config;
    private httpService: HttpService;

    constructor(props: BoardElementProps) {
        super(props);

        this.state = {
            show: false,
            imageNotFound: false
        }

        this.config = container.resolve(Config);
        this.httpService = container.resolve(HttpService);

        this.getImage = this.getImage.bind(this);
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
        this.httpService.deleteWithAuthorization(`/boards/elements/${this.props.element.id}`).then(() => {

        }, (error) => {
            console.warn(error);
        });
    }

    onImageError() {
        this.setState({
            imageNotFound: true
        });
    }

    getImage() {
        if (this.state.imageNotFound) {
            return (
                <div className="board-element-image-error">
                    <i className="icon icon-image icon-8x"></i>
                    <span className="board-element-image-error-message">Image not available</span>
                </div>
            )
        }

        return (
            <img className="board-element-image" src={`${this.config.apiUrl}/content/${this.props.element.imageId}`} onError={() => this.onImageError()} />
        );
    }

    render() {

        return (
            <>
                <div className="board-element-header">
                    <span className="board-element-number">{this.props.element.elementNumber}</span>
                    <span className="board-element-creator">{this.props.element.user.username}</span>
                    <i className="fas fa-trash ml-auto delete-icon" onClick={() => this.removeElement()}></i>
                </div>
                <div className="board-element-body">
                    {this.props.element.imageId
                        ? this.getImage()
                        : <p className="board-element-message">{this.props.element.note}</p>
                    }
                </div>
                <div className="board-element-footer">

                    {this.props.element.direction &&
                        <div className="board-element-direction">
                            <i className="fas fa-location-arrow direction mr-2"></i>{this.getReadableDirection(this.props.element.direction)}
                        </div>
                    }

                    <time className="board-element-timestamp" dateTime={this.props.element.createdAt.toString()}>{dateToReadableString(this.props.element.createdAt)}</time>
                </div>
            </>
        )
    }
}
