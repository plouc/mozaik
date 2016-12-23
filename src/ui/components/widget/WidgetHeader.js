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
        } = this.props

        const { theme } = this.context

        let subjectNode = null
        if (subject) {
            subjectNode = (
                <span className={`widget__header__subject ${classes.subject} ${_.get(theme, 'widgetHeader.subject', '')}`}>
                    {subject}
                </span>
            )
        }

        let countNode = null
        if (count !== undefined) {
            countNode = (
                <span className={`widget__header__count ${classes.count} ${_.get(theme, 'widgetHeader.count', '')}`}>
                    {count}
                </span>
            )
        }

        return (
            <div className={`widget__header ${classes.header} ${_.get(theme, 'widgetHeader.header', '')}`} style={style}>
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
