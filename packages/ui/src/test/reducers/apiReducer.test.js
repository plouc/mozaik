import test from 'ava'
import apiReducer from '../../../src/ui/reducers/apiReducer'
import {
    API_SUBSCRIBE,
    API_UNSUBSCRIBE,
    API_DATA,
} from '../../../src/ui/actions/apiActions'

test('should return the initial state', t => {
    t.deepEqual(apiReducer(undefined, {}), {
        subscriptions: {},
        data: {},
    })
})

test('should handle API_SUBSCRIBE', t => {
    const state = apiReducer(undefined, {
        type: API_SUBSCRIBE,
        subscription: { id: 'yay' },
    })

    t.deepEqual(state, {
        data: {},
        subscriptions: {
            yay: {
                id: 'yay',
                subscriptionCount: 1,
            },
        },
    })
})

test('should increment subscription count when API_SUBSCRIBE is called multiple times', t => {
    const state = apiReducer(
        {
            data: {},
            subscriptions: {
                yay: {
                    id: 'yay',
                    subscriptionCount: 1,
                },
            },
        },
        {
            type: API_SUBSCRIBE,
            subscription: { id: 'yay' },
        }
    )

    t.deepEqual(state, {
        data: {},
        subscriptions: {
            yay: {
                id: 'yay',
                subscriptionCount: 2,
            },
        },
    })
})

test('should handle API_DATA', t => {
    const state = apiReducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data: 'yo',
    })
    t.deepEqual(state, {
        subscriptions: {},
        data: { yay: 'yo' },
    })
})

test('should handle API_UNSUBSCRIBE', t => {
    const state = apiReducer(undefined, {
        type: API_UNSUBSCRIBE,
        id: 'yay',
    })
    t.deepEqual(state, {
        subscriptions: {},
        data: {},
    })
})

test('should decrement subscription count when API_UNSUBSCRIBE is called', t => {
    const state = apiReducer(
        {
            data: {},
            subscriptions: {
                yay: {
                    id: 'yay',
                    subscriptionCount: 2,
                },
            },
        },
        {
            type: API_UNSUBSCRIBE,
            id: 'yay',
        }
    )
    t.deepEqual(state, {
        data: {},
        subscriptions: {
            yay: {
                id: 'yay',
                subscriptionCount: 1,
            },
        },
    })
})

test('should remove subscription when API_UNSUBSCRIBE is called and there is only one subscription', t => {
    const state = apiReducer(
        {
            data: {},
            subscriptions: {
                yay: {
                    id: 'yay',
                    subscriptionCount: 1,
                },
            },
        },
        {
            type: API_UNSUBSCRIBE,
            id: 'yay',
        }
    )
    t.deepEqual(state, {
        data: {},
        subscriptions: {},
    })
})
