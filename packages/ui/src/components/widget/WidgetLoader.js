import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class WidgetLoader extends Component {
    static propTypes = {
        style: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { style } = this.props
        const { theme } = this.context

        return <div style={style}>LOADER</div>
    }
}
