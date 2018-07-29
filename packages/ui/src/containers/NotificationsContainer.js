import { connect } from 'react-redux'
import Notifications from '../components/notifications/Notifications'

const mapStateToProps = state => {
    const {
        notifications: { items },
        themes: { current: themeId },
    } = state

    return {
        notifications: items,
        // not used but needed to force refresh of context
        themeId,
    }
}

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications)
