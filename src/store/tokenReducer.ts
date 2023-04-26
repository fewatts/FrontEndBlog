import {Action} from './tokens/action'

export interface TokenState {
    token: string,
    id: string
}

const inicialState = {
    token: '',
    id: ''
}

export const tokenReducer = (state: TokenState = inicialState, action: Action) => {
    switch(action.type) {
        case "ADD_TOKEN": {
            return {token: action.payload, id: state.id}
        }
        case "ADD_ID": {
            return {id: action.payload, token: state.token}
        }
        default: return state
    }

}
