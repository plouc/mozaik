import { combineReducers } from 'redux'
import api from './reducers/apiReducer'
import configuration from './reducers/configurationReducer'
import dashboards from './reducers/dashboardsReducer'
import notifications from './reducers/notificationsReducer'
import ws from './reducers/wsReducer'
import themes from './reducers/themesReducer'

const registry = {
    api,
    configuration,
    dashboards,
    notifications,
    ws,
    themes,
}

const ReducersRegistry = {
    addExtensions(extensions) {
        Object.assign(registry, extensions)
    },

    combined() {
        return combineReducers(registry)
    },
}

export default ReducersRegistry
