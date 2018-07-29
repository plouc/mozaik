import Registry from '../WidgetsRegistry'
import _ from 'lodash'
import { subscribeToApi, unsubscribeFromApi } from './apiActions'

export const SET_DASHBOARDS = 'SET_DASHBOARDS'
export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD'
export const DASHBOARDS_PLAY = 'DASHBOARDS_PLAY'
export const DASHBOARDS_PAUSE = 'DASHBOARDS_PAUSE'

const ignoreProps = ['extension', 'widget', 'x', 'y', 'columns', 'rows']

let timer

const SECOND = 1000

export const setDashboards = dashboards => {
    return (dispatch, getState) => {
        const { api } = getState()

        const currentSubscriptionsIds = api
            .get('subscriptions')
            .keySeq()
            .toArray()
        const newSubscriptionsIds = []

        dashboards.forEach((dashboard, dahsboardIndex) => {
            dashboard.widgets.forEach((w, widgetIndex) => {
                if (Registry.has(w.extension, w.widget)) {
                    const component = Registry.getComponent(w.extension, w.widget)

                    if (typeof component.getApiRequest === 'function') {
                        const childProps = _.omit(w, ignoreProps)
                        const subscription = component.getApiRequest(childProps)

                        if (!_.isObject(subscription) || !subscription.id) {
                            // eslint-disable-next-line no-console
                            console.error(
                                `widget ${w.extension}.${
                                    w.widget
                                } 'getApiRequest()' must return an object with an 'id' property`
                            )
                        } else {
                            dashboards[dahsboardIndex].widgets[widgetIndex].subscriptionId =
                                subscription.id
                            dispatch(subscribeToApi(subscription))
                            newSubscriptionsIds.push(subscription.id)
                        }
                    }
                }
            })
        })

        const staleSubscriptionsIds = _.difference(currentSubscriptionsIds, newSubscriptionsIds)
        staleSubscriptionsIds.forEach(id => {
            dispatch(unsubscribeFromApi(id))
        })

        dispatch({ type: SET_DASHBOARDS, dashboards })
    }
}

const setCurrentDashboard = index => {
    return {
        type: SET_CURRENT_DASHBOARD,
        index,
    }
}

export const previous = () => {
    return (dispatch, getState) => {
        const {
            dashboards: { dashboards, current },
        } = getState()

        let prevIndex
        if (current > 0) {
            prevIndex = current - 1
        } else {
            prevIndex = dashboards.length - 1
        }

        dispatch(setCurrentDashboard(prevIndex))
    }
}

export const next = () => {
    return (dispatch, getState) => {
        const {
            configuration: { configuration },
            dashboards: { dashboards, current, isPlaying },
        } = getState()
        const { rotationDuration } = configuration

        let nextIndex
        if (current < dashboards.length - 1) {
            nextIndex = current + 1
        } else {
            nextIndex = 0
        }

        dispatch(setCurrentDashboard(nextIndex))

        if (isPlaying) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                dispatch(next())
            }, Number(rotationDuration) * SECOND)
        }
    }
}

export const play = () => {
    clearTimeout(timer)

    return (dispatch, getState) => {
        const {
            configuration: { configuration },
            dashboards: { dashboards },
        } = getState()
        const { rotationDuration } = configuration

        if (dashboards.length > 1) {
            dispatch({ type: DASHBOARDS_PLAY })
            timer = setTimeout(() => {
                dispatch(next())
            }, Number(rotationDuration) * SECOND)
        }
    }
}

export const pause = () => {
    clearTimeout(timer)

    return { type: DASHBOARDS_PAUSE }
}
