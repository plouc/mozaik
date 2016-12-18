import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import ThemeManager                    from '../themes/ThemeManager'


class ThemeProvider extends Component {
    static propTypes = {
        theme:    PropTypes.string.isRequired,
        children: PropTypes.element,
    }

    static childContextTypes = {
        theme: PropTypes.object.isRequired,
    }

    getChildContext() {
        const { theme } = this.props

        return {
            theme: ThemeManager.get(theme),
        }
    }

    render() {
        return this.props.children
    }
}

const mapStateToProps = ({ settings: { theme } }) => ({ theme })


export default connect(mapStateToProps)(ThemeProvider)