import { combineReducers } from 'redux'
import configuration       from './configurationReducer'
import ws                  from './wsReducer'
import api                 from './apiReducer'


export default combineReducers({
    configuration,
    ws,
    api,
})
