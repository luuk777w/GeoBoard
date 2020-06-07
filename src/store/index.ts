import { combineReducers, createStore, Store } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { sidebarReducer } from "./sidebar/reducers";
import { systemReducers } from "./system/reducers";
import { boardReducer } from "./board/reducers";
import { alertReducer } from "./alert/reducers";
import { announcementReducer } from "./announcement/reducers";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { manageBoardModalReducer } from "./modals/manageBoardModal/reducers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['system', 'sidebar', 'activeBoard']
}

const rootReducer = combineReducers({
    system: systemReducers,
    sidebar: sidebarReducer,
    activeBoard: boardReducer,
    alert: alertReducer,
    announcement: announcementReducer,

    // Modals
    manageBoardModal: manageBoardModalReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: Store = createStore(persistedReducer, composeWithDevTools());
    const persistor = persistStore(store);
    return { store, persistor }
}

export const store = configureStore();
