import test      from 'ava'
import wsReducer from '../../../src/ui/reducers/wsReducer'
import {
    WS_CONNECT,
    WS_CONNECT_SUCCESS,
    WS_DISCONNECTED,
    WS_RETRY,
} from '../../../src/ui/actions/wsActions'


test('should return the initial state', t => {
    t.deepEqual(wsReducer(undefined, {}), {
        connected:  false,
        connecting: false,
        retryCount: 0,
    })
})

test('should handle WS_CONNECT', t => {
    t.deepEqual(wsReducer(undefined, {
        type: WS_CONNECT,
    }), {
        connected:  false,
        connecting: true,
        retryCount: 0,
    })
})

test('should handle WS_CONNECT_SUCCESS', t => {
    t.deepEqual(wsReducer(undefined, {
        type: WS_CONNECT_SUCCESS,
    }), {
        connected:  true,
        connecting: false,
        retryCount: 0,
    })
})

test('should handle WS_DISCONNECTED', t => {
    t.deepEqual(wsReducer({
        connected:  true,
        connecting: false,
        retryCount: 0,
    }, {
        type: WS_DISCONNECTED,
    }), {
        connected:  false,
        connecting: false,
        retryCount: 0,
    })
})

test('should handle WS_RETRY', t => {
    t.deepEqual(wsReducer(undefined, {
        type: WS_RETRY,
    }), {
        connected:  false,
        connecting: false,
        retryCount: 1,
    })
})
