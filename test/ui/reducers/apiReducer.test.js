import test       from 'ava'
import apiReducer from '../../../src/ui/reducers/apiReducer'
import {
    API_SUBSCRIPTION,
    BUFFER_API_SUBSCRIPTION,
    API_DATA,
} from '../../../src/ui/actions/apiActions'


test('should return the initial state', t => {
    t.deepEqual(apiReducer(undefined, {}), {
        history: [],
        buffer:  [],
        data:    {},
    })
})

test('should handle API_SUBSCRIPTION', t => {
    t.deepEqual(apiReducer(undefined, {
        type:         API_SUBSCRIPTION,
        subscription: { id: 'yay' },
    }), {
        history: [{ id: 'yay' }],
        buffer:  [],
        data:    {},
    })
})

test('should handle BUFFER_API_SUBSCRIPTION', t => {
    t.deepEqual(apiReducer(undefined, {
        type:         BUFFER_API_SUBSCRIPTION,
        subscription: { id: 'yay' },
    }), {
        history: [],
        buffer:  [{ id: 'yay' }],
        data:    {},
    })
})

test('should handle API_DATA', t => {
    t.deepEqual(apiReducer(undefined, {
        type: API_DATA,
        id:   'yay',
        data: 'yo',
    }), {
        history: [],
        buffer:  [],
        data:    { yay: 'yo' },
    })
})
