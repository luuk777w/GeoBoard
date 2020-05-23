import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { sidebarReducer } from "./sidebar/reducers";
import { appReducers } from "./app/reducers";

const rootReducer = combineReducers({
    app: appReducers,
    sidebar: sidebarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const store = createStore(rootReducer, composeWithDevTools());
    return store;
}
