import React from 'react';
import { Config } from 'util/config';
import { container } from 'tsyringe';
import { AppState } from 'store';
import { connect } from 'react-redux';

import { BoardState } from 'store/board/types';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { BoardViewModel } from 'models/BoardViewModel';
import BoardElement from './boardElement/boardElement';
import { HttpService } from 'services/http.service';
import { setActiveBoard } from 'store/board/actions';
import { motion, AnimatePresence } from "framer-motion";

import './board.scss'
import { BoardElementState } from 'store/boardElement/types';
import { setTempImageBlob, setImageUploadPrecentage } from 'store/boardElement/actions';
import { JWTService } from 'services/jwt.service';
import { BoardElementMutateModel } from 'models/BoardElementMutateModel';
import { ClearBoard } from './clearBoard/clearBoard';
import { isString } from 'util';

interface BoardProps {
    activeBoardState: BoardState;
    setActiveBoard: typeof setActiveBoard;
    boardElementState: BoardElementState;
    setTempImageBlob: typeof setTempImageBlob;
    setImageUploadPrecentage: typeof setImageUploadPrecentage;
}

interface LocalBoardState {
    boardElements: Array<BoardElementViewModel>
}

class Board extends React.Component<BoardProps, LocalBoardState> {

    private config: Config;

    private httpService: HttpService;
    private boardHubService: BoardHubService;
    private JWTService: JWTService;
    public imageBlob: string;

    constructor(props: any) {
        super(props);

        this.config = container.resolve(Config);
        this.boardHubService = container.resolve(BoardHubService);
        this.httpService = container.resolve(HttpService);
        this.JWTService = container.resolve(JWTService);

        this.state = {
            boardElements: []
        }
    }

    async componentDidMount() {
        // If there was any active board on page load...
        if (this.props.activeBoardState.boardId) {
            this.updateSiteTitle(this.props.activeBoardState.name);

            await this.loadBoardElements();
        }

        this.boardHubService.getConnection().on('SwitchedBoard', (response: BoardViewModel | null) => {
            console.log(response);

            this.setState(() => ({
                boardElements: []
            }));

            setTimeout(() => {
                this.setState(() => ({
                    boardElements: (response) ? response.elements : []
                }));
            }, 250);

            this.updateSiteTitle(response);
        });

        this.boardHubService.getConnection().on('ReceiveImage', (response: BoardElementViewModel) => {

            setTimeout(() => {
                let elements = this.state.boardElements;
                let index = elements.findIndex(x => x.id == response.id);
                elements[index].imageId = response.imageId;

                this.setState(() => ({
                    boardElements: elements
                }));

                if (this.JWTService.getUserId() == response.userId) {
                    this.props.setImageUploadPrecentage(0);
                } else {
                    this.props.setImageUploadPrecentage(this.props.boardElementState.imageUploadPrecentage);
                }
            }, 200);
        });

        this.boardHubService.getConnection().on('ReceiveElement', (response: BoardElementViewModel) => {
            let elements = this.state.boardElements;

            let isFromSelf = this.JWTService.getUserId() == response.userId;

            if (this.props.boardElementState.tempImageBlob != "" && isFromSelf) {

                let dataObject: BoardElementMutateModel = {
                    BoardElementId: response.id,
                    Image: this.props.boardElementState.tempImageBlob
                }

                this.httpService.postWithAuthorizationAndProgress<BoardElementViewModel>("/boards/elements/uploadimage", JSON.stringify(dataObject), this.setImageUploadPrecentage, this)
                    .then((response: BoardElementViewModel) => {
                        this.props.setTempImageBlob("");
                    }, error => {

                    })
            }

            this.setState(() => ({
                // Put the received element on first place of the array and put the older elements behind it.
                boardElements: [response, ...elements]
            }));
        });

        this.boardHubService.getConnection().on('RemoveElement', (removedElementId: string) => {

            let elementsLeftOver = this.state.boardElements;
            elementsLeftOver.splice(elementsLeftOver.findIndex(e => e.id === removedElementId), 1);

            this.setState(() => ({
                boardElements: elementsLeftOver
            }));
        });

        this.boardHubService.getConnection().on('Clear', () => {
            this.setState(() => ({
                boardElements: []
            }));
        });
    }

    private setImageUploadPrecentage(precentage: number, thiz: any) {
        thiz.props.setImageUploadPrecentage(precentage);
    }

    /**
     * Load the elements from the board that was already active on page load.
     */
    private async loadBoardElements() {

        await this.httpService.getWithAuthorization<Array<BoardElementViewModel>>(`/boards/${this.props.activeBoardState.boardId}/elements`)
            .then((response: Array<BoardElementViewModel>) => {
                this.setState(() => ({
                    boardElements: response
                }));
            })
            .catch((e) => console.warn(e));
    }

    private updateSiteTitle(board: BoardViewModel | string | null) {
        if (board == null || board == "") {
            document.title = this.config.siteName;

            return;
        }

        if (typeof board === "string") {
            document.title = `${board} | ${this.config.siteName}`;
        }
        else {
            if (board != null) {
                document.title = `${board.name} | ${this.config.siteName}`;
            }
        }
    }

    render() {
        return (
            <>
                {this.props.activeBoardState.boardId != null
                    ?
                    <div className="board-elements">

                        <ClearBoard />

                        <AnimatePresence initial={false}>
                            {this.state.boardElements.map((element: BoardElementViewModel) => {
                                return (
                                    <motion.div className="board-element"
                                        key={element.id}
                                        positionTransition
                                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                    >
                                        <BoardElement element={element} />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>

                    </div>

                    :
                    <div className="select-board-instruction">
                        <h1>Please select or create a board.</h1>
                    </div>
                }

            </>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    activeBoardState: state.activeBoard,
    boardElementState: state.boardElement
});

export default connect(mapStateToProps, { setActiveBoard, setTempImageBlob, setImageUploadPrecentage })(Board);
