import React, { Component, PropTypes } from 'react'


class WidgetAvatar extends Component {
    static propTypes = {
        children: PropTypes.node,
        size:     PropTypes.oneOfType([
            PropTypes.number,
            // supports string because of vmin, rem…
            // CSS calc() is used to compute relative sizes
            PropTypes.string,
        ]).isRequired,
        style:    PropTypes.object,
    }

    static defaultProps = {
        size:  36,
        style: {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { children, size, style: _style } = this.props
        const { theme } = this.context

        const style = {
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       `calc(${size} / 2)`,
            borderRadius:   '50%',
            height:         size,
            width:          size,
            overflow:       'hidden',
            ..._style,
        }

        return (
            <div style={style}>
                {children}
            </div>
        )
    }
}


export default WidgetAvatar
