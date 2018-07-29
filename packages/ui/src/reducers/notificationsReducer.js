import { NOTIFY, NOTIFICATION_UPDATE, NOTIFICATION_CLOSE } from '../actions/notificationsActions'

export default function notifications(
    state = {
        items: [],
    },
    action
) {
    switch (action.type) {
        case NOTIFY:
            return {
                ...state,
                items: [action.notification, ...state.items],
            }

        case NOTIFICATION_UPDATE:
            return {
                ...state,
                items: state.items.map(notification => {
                    if (notification.id === action.id) {
                        return {
                            ...notification,
                            ...action.notification,
                        }
                    }

                    return notification
                }),
            }

        case NOTIFICATION_CLOSE:
            return {
                ...state,
                items: state.items.filter(({ id }) => id !== action.id),
            }

        default:
            return state
    }
}
