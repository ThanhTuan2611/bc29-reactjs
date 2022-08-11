import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
});
export const store = createStore(rootReducer);