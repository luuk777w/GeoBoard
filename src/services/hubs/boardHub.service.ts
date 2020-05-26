import { SignalRClient } from "util/signalrClient";
import { singleton } from "tsyringe";
import configureStore, { store, AppState } from "store";
import PropTypes from 'prop-types'

@singleton()
export class BoardHubService extends SignalRClient {
    constructor() {
        const state: AppState = store.store.getState();
        const currentBoard = state.activeBoard.boardId;

        super(`boardHub?currentBoard=${currentBoard}`);
    }
}
