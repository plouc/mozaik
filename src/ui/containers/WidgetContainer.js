import { connect }   from 'react-redux'
import WidgetWrapper from '../components/widget/WidgetWrapper'


const mapStateToProps = ({
    themes: { current: theme },
    api:    { data, errors },
}) => {
    return {
        // not used but needed to force refresh of context
        themeId:   theme,
        apiData:   data,
        apiErrors: errors,
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WidgetWrapper)
