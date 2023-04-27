import { createStore } from 'redux'
import { tokenReducer } from './tokenReducer'

const store = createStore(tokenReducer)

export default store