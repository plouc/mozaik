import React, { Component, PropTypes } from 'react'


class WidgetHeader extends Component {
    static propTypes = {
        title:            PropTypes.node.isRequired,
        subject:          PropTypes.node,
        subjectPlacement: PropTypes.oneOf(['prepend', 'append']).isRequired,
        count:            PropTypes.node,
        icon:             PropTypes.string,
        iconStyle:        PropTypes.object.isRequired,
        style:            PropTypes.object.isRequired,
    }

    static defaultProps = {
        subjectPlacement: 'prepend',
        style:            {},
        iconStyle:        {},
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            title,
            subject,
            subjectPlacement,
            count,
            icon,
            style,
            iconStyle: _iconStyle,
        } = this.props

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
            color:    theme.widget.header.icon.color,
            fontSize: theme.widget.header.icon.size,
            ..._iconStyle,
        }

        let subjectNode = null
        if (subject) {
            if (subjectPlacement === 'prepend') {
                subjectStyle.marginRight = theme.widget.header.itemsSpacing
            } else {
                subjectStyle.marginLeft = theme.widget.header.itemsSpacing
            }

            subjectNode = (
                <span style={subjectStyle}>
                    {subject}
                </span>
            )
        }

        let countNode = null
        if (count !== undefined) {
            const countStyle = {
                display:         'inline-block',
                lineHeight:      '1em',
                verticalAlign:   'middle',
                marginLeft:      theme.widget.header.count.spacing,
                backgroundColor: theme.widget.header.count.bgColor,
                color:           theme.widget.header.count.textColor,
                padding:         theme.widget.header.count.padding,
                boxShadow:       theme.widget.header.count.shadow,
                textShadow:      theme.widget.header.count.textShadow,
                borderRadius:    theme.widget.header.count.borderRadius,
                border:          theme.widget.header.count.border,
                ...theme.widget.header.count.overrides,
            }

            countNode = <span style={countStyle}>{count}</span>
        }

        return (
            <div style={headerStyle}>
                <span>
                    {subjectPlacement === 'prepend' && subjectNode}
                    {title}
                    {subjectPlacement === 'append' && subjectNode}
                    {countNode}
                </span>
                {icon && <i style={iconStyle} className={`fa fa-${icon}`} />}
            </div>
        )
    }
}


export default WidgetHeader
