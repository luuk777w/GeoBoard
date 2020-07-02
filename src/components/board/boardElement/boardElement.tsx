import React from 'react';
import { Direction } from 'models/Direction';

import './boardElement.scss';
import { dateToReadableString } from 'helpers/helpers';
import { Config } from 'util/config';
import { container } from 'tsyringe';
import { HttpService } from 'services/http.service';

import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { JWTService } from 'services/jwt.service';
import { connect } from 'react-redux';
import { AppState } from 'store';
import { BoardElementState } from 'store/boardElement/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '../Image/Image';
import { ProgressBar } from '../progressBar/progressBar';

interface BoardElementProps {
    element: BoardElementViewModel;
    boardElementState: BoardElementState;
}

interface LocalBoardElementState {
    showLargeImage: boolean;
}

class BoardElement extends React.Component<BoardElementProps, LocalBoardElementState> {

    private config: Config;
    private httpService: HttpService;
    private JWTService: JWTService;
    private ref: any;
    private overflowStlyle = { overflow: "hidden" };

    constructor(props: BoardElementProps) {
        super(props);

        this.state = {
            showLargeImage: false,
        }

        this.config = container.resolve(Config);
        this.httpService = container.resolve(HttpService);
        this.JWTService = container.resolve(JWTService);

        this.closeLargeImage = this.closeLargeImage.bind(this);
        this.setRef = this.setRef.bind(this);
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

    showLargeImage(event: any) {
        if (this.state.showLargeImage == true) return;
        if (event.target.className.includes("large-image-container")) return;
        if (this.ref == undefined) return;

        this.overflowStlyle = { overflow: "" };

        this.setState(() => ({
            showLargeImage: true
        }));
    }

    closeLargeImage(event: any) {
        if (event.target.localName == "img") return;

        this.setState(() => ({
            showLargeImage: false
        }))
    }

    setRef(ref: any) {
        this.ref = ref;
    }

    render() {

        let style = {};

        if (this.state.showLargeImage) {
            style = { height: this.ref.height }
        }

        return (
            <>
                <div className="board-element-header">
                    <span className="board-element-number">{this.props.element.elementNumber}</span>
                    <span className="board-element-creator">{this.props.element.user.userName}</span>
                    <i className="fas fa-trash ml-auto delete-icon" onClick={() => this.removeElement()}></i>
                </div>
                <div className="board-element-body"
                    style={{ ...this.overflowStlyle, ...style }}
                    onClick={() => this.showLargeImage(event)}>
                    <AnimatePresence initial={false} >

                        {this.props.element.textOnly
                            ? <p className="board-element-message">{this.props.element.note}</p>
                            : this.props.element.imageId
                                ? <motion.div
                                    key={0}
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <Image
                                        imageUrl={`${this.config.apiUrl}/content/${this.props.element.imageId}`}
                                        showLargeImage={this.state.showLargeImage}
                                        onLargeImageClose={this.closeLargeImage}
                                        setRef={this.setRef}
                                    />

                                </motion.div>
                                : <motion.div
                                    key={1}
                                    exit={{ y: -200, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ProgressBar
                                        userId={this.JWTService.getUserId()}
                                        elementUserId={this.props.element.userId}
                                        precentage={this.props.boardElementState.imageUploadPrecentage}
                                    />
                                </motion.div>
                        }

                    </AnimatePresence>

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

const mapStateToProps = (state: AppState) => ({
    boardElementState: state.boardElement
});

export default connect(mapStateToProps, {})(BoardElement);
