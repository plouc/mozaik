import test           from 'ava'
import sinon          from 'sinon'
import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'
import {
    SET_DASHBOARDS,
    SET_CURRENT_DASHBOARD,
    setDashboards,
    startDashboardRotation,
} from '../../../src/ui/actions/dashboardsActions'

let clock
test.beforeEach('setup fake timer', t => {
    clock = sinon.useFakeTimers()
})

test.afterEach.always('disable fake timer', t => {
    clock.restore()
})


const middlewares = [thunk]
const mockStore   = configureStore(middlewares)


test('setDashboards() should generate expected action', t => {
    const action = setDashboards([])

    t.deepEqual(action, {
        type:       SET_DASHBOARDS,
        dashboards: [],
    })
})

test('startDashboardRotation() should rotate dashboards at given interval', t => {
    const initialState = {
        dashboards: {
            dashboards: [0, 1, 2],
            current:    0,
        },
    }

    const store = mockStore(initialState)
    store.dispatch(startDashboardRotation(10))

    clock.tick(20)

    const actions = store.getActions()
    t.deepEqual(actions, [
        { type: SET_CURRENT_DASHBOARD, index: 1 },
        { type: SET_CURRENT_DASHBOARD, index: 1 },
    ])
})

test('startDashboardRotation() should not start until there is more than one dashboard', t => {
    const initialState = {
        dashboards: {
            dashboards: [0],
        },
    }

    const store = mockStore(initialState)
    store.dispatch(startDashboardRotation(10))

    clock.tick(10)

    const actions = store.getActions()
    t.deepEqual(actions, [])
})