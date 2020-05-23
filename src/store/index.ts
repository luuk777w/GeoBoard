import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { sidebarReducer } from "./sidebar/reducers";
import { systemReducers } from "./system/reducers";
import { boardReducer } from "./board/reducers";

const rootReducer = combineReducers({
    system: systemReducers,
    sidebar: sidebarReducer,
    board: boardReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools());
    return store;
}
