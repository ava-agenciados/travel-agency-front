//
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    // outros reducers podem ser adicionados aqui
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store;