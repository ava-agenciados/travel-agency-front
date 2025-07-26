import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './authSlice'

// constate que carregará o estado do usuário
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('app_state');

        if(serializedState === null) {
            return undefined; // Retorna undefined se não houver estado salvo
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined; // se houver erro, retornar indefinido
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state); // converter o estado de JSON para string
        localStorage.setItem('app_state', serializedState); // salvar no localStorage
    } catch (error) {
        console.error('Erro ao salvar o state da aplicação: ', error) // caso ocorra um erro, exibir no console
    }
}

const rootReducer = combineReducers({
    auth: authReducer // aqui podemos associar, se necessario, outros reducers
})

const preloadedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    preloadedState
});

store.subscribe( // ao utilizar o método subscribe() qualquer tarefa assicrona é executada
    () => {
        saveState({auth: store.getState().auth,});
    }
)

export default store;