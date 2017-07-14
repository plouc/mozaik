import { combineReducers } from 'redux'
import api from './apiReducer'
import configuration from './configurationReducer'
import dashboards from './dashboardsReducer'
import notifications from './notificationsReducer'
import ws from './wsReducer'
import themes from './themesReducer'

export default combineReducers({
    api,
    configuration,
    dashboards,
    notifications,
    ws,
    themes,
})
