import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetHeader.css'


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
            //padding:         `0 ${theme.widget.innerSpacing}`,
            //height:          theme.widget.header.height,
            //backgroundColor: theme.widget.header.bgColor,
            //color:           theme.widget.header.textColor,
            //borderBottom:    theme.widget.header.borderBottom,
            //boxShadow:       theme.widget.header.shadow,
            //font:            theme.widget.header.font,
            //borderRadius:    `${theme.widget.borderRadius} ${theme.widget.borderRadius} 0 0`,
            //...theme.widget.header.overrides,
            //...style,
        }

        const subjectStyle = {
            //...theme.widget.header.subject.overrides,
        }

        let subjectNode = null
        if (subject) {
            subjectNode = (
                <span className={`${classes.subject} ${_.get(theme, 'widgetHeader.subject', '')}`}>
                    {subject}
                </span>
            )
        }

        let countNode = null
        if (count !== undefined) {
            countNode = (
                <span className={`${classes.count} ${_.get(theme, 'widgetHeader.count', '')}`}>
                    {count}
                </span>
            )
        }

        return (
            <div className={`${classes.header} ${_.get(theme, 'widgetHeader.header', '')}`} style={style}>
                <span>
                    {subjectPlacement === 'prepend' && subjectNode}
                    {title}
                    {subjectPlacement === 'append' && subjectNode}
                    {countNode}
                </span>
                {icon && (
                    <i className={`fa fa-${icon} ${classes.icon} ${_.get(theme, 'widgetHeader.icon', '')}`}/>
                )}
            </div>
        )
    }
}


export default WidgetHeader
