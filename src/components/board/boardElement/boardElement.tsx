import React from 'react';
import { Direction } from 'models/Direction';

import './boardElement.scss';
import { dateToReadableString } from 'helpers/helpers';
import { Config } from 'util/config';
import { container } from 'tsyringe';
import { HttpService } from 'services/http.service';

import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { JWTService } from 'services/jwt.service';

interface BoardElementProps {
    element: BoardElementViewModel;
}

interface BoardElementState {
    imageNotFound: boolean;
}

export class BoardElement extends React.Component<BoardElementProps, BoardElementState> {

    private config: Config;
    private httpService: HttpService;
    private JWTService: JWTService;

    constructor(props: BoardElementProps) {
        super(props);

        this.state = {
            imageNotFound: false
        }

        this.config = container.resolve(Config);
        this.httpService = container.resolve(HttpService);
        this.JWTService = container.resolve(JWTService);

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

    getProgressBar() {

        if (this.JWTService.getUserId() == this.props.element.userId) {

            return (
                <div className="progress-bar-container">
                    <p>Uploading image...</p>
                    <div className="progress-bar">
                        <div className="progress-bar-inner"></div>
                        <div className="progress-bar-precentage">20%</div>
                    </div>
                </div>
            )

        } else {
            return (
                <div className="progress-bar-container">
                    <p>Uploading image...</p>
                    <p>W.I.P.</p>
                </div>
            )
        }
    }


    render() {

        return (
            <>
                <div className="board-element-header">
                    <span className="board-element-number">{this.props.element.elementNumber}</span>
                    <span className="board-element-creator">{this.props.element.user.userName}</span>
                    <i className="fas fa-trash ml-auto delete-icon" onClick={() => this.removeElement()}></i>
                </div>
                <div className="board-element-body">

                    {this.props.element.textOnly
                        ? <p className="board-element-message">{this.props.element.note}</p>

                        : this.props.element.imageId
                            ? this.getImage()
                            : this.getProgressBar()
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
