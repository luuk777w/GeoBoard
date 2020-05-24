import { combineReducers, createStore, Store } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { sidebarReducer } from "./sidebar/reducers";
import { systemReducers } from "./system/reducers";
import { boardReducer } from "./board/reducers";
import { alertReducer } from "./alert/reducers";


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    system: systemReducers,
    sidebar: sidebarReducer,
    board: boardReducer,
    alert: alertReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: Store = createStore(persistedReducer, composeWithDevTools());
    const persistor = persistStore(store);
    return { store, persistor }
}
