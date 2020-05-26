import React from 'react';
import { BoardElement } from './boardElement/boardElement';
import { UserViewModel } from '../../models/UserViewModel';
import { Config } from 'util/config';
import { container } from 'tsyringe';

import './board.scss'
import { BoardState } from 'store/board/types';
import { AppState } from 'store';
import { connect } from 'react-redux';
import { BoardHubService } from 'services/hubs/boardHub.service';
import { BoardElementViewModel } from 'models/BoardElementViewModel';
import { BoardViewModel } from 'models/BoardViewModel';
import { HubConnectionState } from '@microsoft/signalr';
import { HttpService } from 'services/http.service';

interface BoardProps {
    board: BoardState;
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
        if (this.props.board.activeBoardId) {
            await this.loadBoardElements();
        }

        this.boardHubService.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
            this.setState({
                boardElements: response.elements
            });

            this.updateSiteTitle();
        });
    }

    /**
     * Load the elements from the board that was already active on page load.
     */
    private async loadBoardElements() {
        await this.httpService.getWithAuthorization<Array<BoardElementViewModel>>(`/boards/${this.props.board.activeBoardId}/elements`)
            .then((response: Array<BoardElementViewModel>) => {
                this.setState({
                    boardElements: response
                });
            })
            .catch((e) => console.warn(e));
    }

    private updateSiteTitle() {
        if (this.props.board.activeBoardId != '') {
            document.title = `${this.config.siteName} | ${this.props.board.activeBoardName}`;
        }
        else
        {
            document.title = this.config.siteName;
        }
    }

    render() {
        return (
            <>
            {this.props.board.activeBoardId != ''
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
    board: state.board
});

export default connect(mapStateToProps, { })(Board);
