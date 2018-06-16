import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ReducersRegistry from './ReducersRegistry'

export default function configureStore(initialState) {
    const store = createStore(
        ReducersRegistry.combined(),
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    return store
}
