import React from 'react';
import { Config } from 'util/config';
import { container } from 'tsyringe';
import { AppState } from 'store';
import { connect } from 'react-redux';

import { BoardState } from 'store/board/types';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { BoardViewModel } from 'models/BoardViewModel';
import { BoardElement } from './boardElement/boardElement';
import { HttpService } from 'services/http.service';
import { setActiveBoard } from 'store/board/actions';
import { motion, AnimatePresence } from "framer-motion";

import './board.scss'
import { mapToType } from 'helpers/helpers';
import { TransitionGroup } from 'react-transition-group';

interface BoardProps {
    activeBoardState: BoardState;
    setActiveBoard: typeof setActiveBoard;
}

interface LocalBoardState {
    boardElements: Array<BoardElementViewModel>
}

class Board extends React.Component<BoardProps, LocalBoardState> {

    private config: Config;

    private httpService: HttpService;
    private boardHubService: BoardHubService;

    constructor(props: any) {
        super(props);

        this.config = container.resolve(Config);
        this.boardHubService = container.resolve(BoardHubService);
        this.httpService = container.resolve(HttpService);

        this.state = {
            boardElements: []
        }
    }

    async componentDidMount() {
        // If there was any active board on page load...
        if (this.props.activeBoardState.boardId) {

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

        this.boardHubService.getConnection().on('ReceiveElement', (response: BoardElementViewModel) => {
            let elements = this.state.boardElements;

            this.setState(() => ({
                boardElements: [response, ...elements]
            }));
        });

        this.boardHubService.getConnection().on('RemoveElement', (response: string) => {

            let newArray = [...this.state.boardElements];
            newArray.splice(newArray.findIndex(e => e.id === response), 1);

            this.setState(() => ({
                boardElements: newArray
            }));
        });
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

    private updateSiteTitle(board: BoardViewModel | null) {
        if (board != null) {
            document.title = `${board.name} | ${this.config.siteName}`;
        }
        else {
            document.title = this.config.siteName;
        }
    }

    render() {
        return (
            <>
                {this.props.activeBoardState.boardId != null
                    ?
                    <div className="board-elements">

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
                                        <BoardElement
                                            element={element}
                                        />
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
    activeBoardState: state.activeBoard
});

export default connect(mapStateToProps, { setActiveBoard })(Board);
