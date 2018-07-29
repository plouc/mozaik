import { Map } from 'immutable'

import {
    API_SUBSCRIBE,
    API_SUBSCRIBED,
    API_ALL_UNSUBSCRIBED,
    API_UNSUBSCRIBE,
    API_DATA,
    API_FAILURE,
} from '../actions/apiActions'

const defaultState = Map({
    subscriptions: Map(),
    data: Map(),
    errors: Map(),
})

export default function configuration(state = defaultState, action) {
    switch (action.type) {
        case API_SUBSCRIBE:
            if (state.get('subscriptions').has(action.subscription.id)) {
                return state
            }

            return state.setIn(
                ['subscriptions', action.subscription.id],
                Map(
                    Object.assign({}, action.subscription, {
                        hasSubscribed: false,
                    })
                )
            )

        case API_SUBSCRIBED:
            if (!state.get('subscriptions').has(action.subscription.id)) {
                return state
            }

            return state.setIn(['subscriptions', action.subscription.id, 'hasSubscribed'], true)

        case API_ALL_UNSUBSCRIBED:
            return state.setIn(
                ['subscriptions'],
                state.get('subscriptions').map(subscription => {
                    return subscription.setIn(['hasSubscribed'], false)
                })
            )

        case API_UNSUBSCRIBE:
            if (!state.get('subscriptions').has(action.id)) {
                return state
            }

            return state.deleteIn(['subscriptions', action.id])

        case API_DATA:
            return state.deleteIn(['errors', action.id]).setIn(['data', action.id], action.data)

        case API_FAILURE:
            return state.mergeIn(['errors', action.id], action.data)

        default:
            return state
    }
}
