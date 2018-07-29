import { Map } from 'immutable'
import apiReducer from '../../src/reducers/apiReducer'
import { API_SUBSCRIBE, API_UNSUBSCRIBE, API_DATA } from '../../src/actions/apiActions'

it('should return the initial state', () => {
    expect(apiReducer(undefined, {})).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({}),
            errors: new Map({}),
        })
    )
})

it('should handle API_SUBSCRIBE', () => {
    const state = apiReducer(undefined, {
        type: API_SUBSCRIBE,
        subscription: { id: 'yay' },
    })

    expect(state).toEqual(
        new Map({
            subscriptions: new Map({
                yay: new Map({
                    id: 'yay',
                    hasSubscribed: false,
                }),
            }),
            data: new Map({}),
            errors: new Map({}),
        })
    )
})

it('should handle API_DATA with array based data', () => {
    const data = ['a', 'b', 'c']
    const state = apiReducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    })
    expect(state).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({
                yay: data,
            }),
            errors: new Map({}),
        })
    )
})

it('should handle API_DATA with string based data', () => {
    const data = 'incoming data'
    const state = apiReducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    })
    expect(state).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({
                yay: data,
            }),
            errors: new Map({}),
        })
    )
})

it('should handle API_DATA with number based data', () => {
    const data = 132
    const state = apiReducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    })
    expect(state).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({
                yay: data,
            }),
            errors: new Map({}),
        })
    )
})

it('should handle API_DATA with object based data', () => {
    const data = {
        test: true,
        count: 12.3,
        labels: ['test', 'object'],
    }
    const state = apiReducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    })
    expect(state).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({
                yay: data,
            }),
            errors: new Map({}),
        })
    )
})

it('should handle API_UNSUBSCRIBE', () => {
    const state = apiReducer(
        new Map({
            subscriptions: new Map({
                yay: 'exists',
            }),
            data: new Map({}),
            errors: new Map({}),
        }),
        {
            type: API_UNSUBSCRIBE,
            id: 'yay',
        }
    )
    expect(state).toEqual(
        new Map({
            subscriptions: new Map({}),
            data: new Map({}),
            errors: new Map({}),
        })
    )
})
