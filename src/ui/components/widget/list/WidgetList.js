import React, { Component, PropTypes } from 'react'


class WidgetList extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { title, subject, subjectPlacement, icon, style } = this.props

        const { theme } = this.context

        const headerStyle = {
            position:        'relative',
            overflow:        'hidden',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            whiteSpace:      'pre',
            padding:         `0 ${theme.widget.innerSpacing}`,
            height:          theme.widget.header.height,
            backgroundColor: theme.widget.header.bgColor,
            color:           theme.widget.header.textColor,
            borderBottom:    theme.widget.header.borderBottom,
            boxShadow:       theme.widget.header.shadow,
            font:            theme.widget.header.font,
            borderRadius:    `${theme.widget.borderRadius} ${theme.widget.borderRadius} 0 0`,
            ...theme.widget.header.overrides,
            ...style,
        }

        const subjectStyle = {
            ...theme.widget.header.subject.overrides,
        }

        const iconStyle = {

        }

        let subjectNode = null
        if (subject) {
            subjectNode = (
                <span style={subjectStyle}>
                    {subject}
                </span>
            )
        }

        return (
            <div style={headerStyle}>
                <span>
                    {subjectPlacement === 'prepend' && subjectNode}
                    {title}
                    {subjectPlacement === 'append' && subjectNode}
                </span>
                {icon && <i style={iconStyle} className={`fa fa-${icon}`} />}
            </div>
        )
    }
}

WidgetList.propTypes = {
    style: PropTypes.object,
}

WidgetList.defaultProps = {
    subjectPlacement: 'prepend',
}


export default WidgetList
