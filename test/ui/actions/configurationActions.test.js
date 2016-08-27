import test           from 'ava'
import sinon          from 'sinon'
import nock           from 'nock'
import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'
import {
    FETCH_CONFIGURATION,
    FETCH_CONFIGURATION_SUCCESS,
    FETCH_CONFIGURATION_FAILURE,
    fetchConfiguration,
    fetchConfigurationSuccess,
} from '../../../src/ui/actions/configurationActions'


let clock
test.beforeEach('setup fake timer', t => {
    clock = sinon.useFakeTimers()
})

test.afterEach.always('disable fake timer', t => {
    clock.restore()
})


const middlewares = [thunk]
const mockStore   = configureStore(middlewares)


test('fetchConfiguration() should dispatch expected actions', t => {
    nock('http://localhost:5000')
        .get('/config')
        .reply(200, { dashboards: [] })

    const initialState = {
        dashboards: {
            dashboards: [0],
        },
    }

    const store = mockStore(initialState)
    return store.dispatch(fetchConfiguration()).then(() => {
        const actions = store.getActions()
        t.deepEqual(actions, [
            { type: FETCH_CONFIGURATION },
            {
                type:          FETCH_CONFIGURATION_SUCCESS,
                configuration: { dashboards: [] },
            },
            {
                type:  'WS_CONNECT',
                wsUrl: 'ws://localhost:5000',
            },
            {
                type:       'SET_DASHBOARDS',
                dashboards: [],
            },
        ])
    })
})

test('fetchConfiguration() should handle http errors', t => {
    nock('http://localhost:5000')
        .get('/config')
        .reply(503)

    const initialState = {
        dashboards: {
            dashboards: [0],
        },
    }

    const store = mockStore(initialState)
    return store.dispatch(fetchConfiguration()).then(() => {
        const actions = store.getActions()
        t.deepEqual(actions, [
            { type: FETCH_CONFIGURATION },
            {
                type:  FETCH_CONFIGURATION_FAILURE,
                error: 'cannot GET http://localhost:5000/config (503)',
            },
        ])
    })
})
