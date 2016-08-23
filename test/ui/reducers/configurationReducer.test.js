import test                 from 'ava'
import configurationReducer from '../../../src/ui/reducers/configurationReducer'
import {
    FETCH_CONFIGURATION,
    FETCH_CONFIGURATION_SUCCESS,
} from '../../../src/ui/actions/configurationActions'


test('should return the initial state', t => {
    t.deepEqual(configurationReducer(undefined, {}), {
        isLoading:     true,
        configuration: null,
    })
})

test('should handle FETCH_CONFIGURATION', t => {
    t.deepEqual(configurationReducer({
        isLoading:     false,
        configuration: null,
    }, {
        type: FETCH_CONFIGURATION,
    }), {
        isLoading:     true,
        configuration: null,
    })
})

test('should handle FETCH_CONFIGURATION_SUCCESS', t => {
    t.deepEqual(configurationReducer(undefined, {
        type:          FETCH_CONFIGURATION_SUCCESS,
        configuration: { yay: 'yo' },
    }), {
        isLoading:     false,
        configuration: { yay: 'yo' },
    })
})
