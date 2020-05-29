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

import './board.scss'

interface BoardProps {
    activeBoardState: BoardState;
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

        this.boardHubService.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
            this.updateSiteTitle();

            this.setState({
                boardElements: response.elements
            });
        });
    }

    /**
     * Load the elements from the board that was already active on page load.
     */
    private async loadBoardElements() {
        await this.httpService.getWithAuthorization<Array<BoardElementViewModel>>(`/boards/${this.props.activeBoardState.boardId}/elements`)
            .then((response: Array<BoardElementViewModel>) => {
                this.setState({
                    boardElements: response
                });
            })
            .catch((e) => console.warn(e));
    }

    private updateSiteTitle() {
        if (this.props.activeBoardState.boardId != null) {
            document.title = `${this.props.activeBoardState.name} | ${this.config.siteName}`;
        }
        else
        {
            document.title = this.config.siteName;
        }
    }

    render() {
        return (
            <>
            {this.props.activeBoardState.boardId != null
                ?
                <div className="board-elements">

                    {this.state.boardElements.map((element: BoardElementViewModel, index) => {
                        return (
                            <BoardElement
                                key={index}
                                id={element.id}
                                // TODO: Use number from server
                                number={index + 1}
                                user={element.user}
                                direction={element.direction}
                                note={element.note}
                                imagePath={element.imagePath}
                                createdAt={element.createdAt}
                            />
                        )
                    })}
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

export default connect(mapStateToProps, { })(Board);
