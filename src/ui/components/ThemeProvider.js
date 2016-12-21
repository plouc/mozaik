import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'


class ThemeProvider extends Component {
    static propTypes = {
        themes:   PropTypes.object.isRequired,
        current:  PropTypes.string.isRequired,
        children: PropTypes.element,
    }

    static childContextTypes = {
        theme: PropTypes.object.isRequired,
    }

    getChildContext() {
        const { themes, current } = this.props

        return { theme: themes[current] }
    }

    render() {
        return this.props.children
    }
}

const mapStateToProps = ({
    themes: { themes, current },
}) => {
    return { themes, current }
}


export default connect(mapStateToProps)(ThemeProvider)