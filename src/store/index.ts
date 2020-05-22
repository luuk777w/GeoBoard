import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { sidebarReducer } from "./sidebar/reducers";

const rootReducer = combineReducers({
    sidebar: sidebarReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools());
    return store;
}
