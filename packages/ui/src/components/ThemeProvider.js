import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ThemeProvider as Provider } from 'styled-components'

class ThemeProvider extends Component {
    static propTypes = {
        themes: PropTypes.object.isRequired,
        current: PropTypes.string.isRequired,
        children: PropTypes.element,
    }

    render() {
        const { themes, current } = this.props

        let theme = {}
        if (themes.hasOwnProperty(current)) {
            theme = themes[current]
        }

        return <Provider theme={theme}>{this.props.children}</Provider>
    }
}

const mapStateToProps = ({ themes: { themes, current } }) => {
    return { themes, current }
}

export default connect(mapStateToProps)(ThemeProvider)
