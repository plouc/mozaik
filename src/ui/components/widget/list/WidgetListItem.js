import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classes                         from './WidgetList.css'


class WidgetListItem extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            title,
            pre,
            post,
            meta,
            onClick,
            style,
        } = this.props

        const { theme } = this.context

        let metaNode = null
        if (meta !== undefined) {
            metaNode = (
                <div className={_.get(theme, 'widgetList.meta', '')}>
                    {meta}
                </div>
            )
        }

        let preNode = null
        if (pre !== undefined) {
            preNode = <div className={`${classes.pre} ${_.get(theme, 'widgetList.pre', '')}`}>{pre}</div>
        }

        let postNode = null
        if (post !== undefined) {
            postNode = <div className={`${classes.post} ${_.get(theme, 'widgetList.post', '')}`}>{post}</div>
        }

        return (
            <div
                className={`${classes.item} ${_.get(theme, 'widgetList.item', '')}`}
                style={style}
                onClick={onClick}
            >
                {preNode}
                <div style={{ flexGrow: 1 }}>
                    {title}
                    {metaNode}
                </div>
                {postNode}
            </div>
        )
    }
}

WidgetListItem.propTypes = {
    title:   PropTypes.node.isRequired,
    pre:     PropTypes.node,
    post:    PropTypes.node,
    meta:    PropTypes.node,
    style:   PropTypes.object,
    onClick: PropTypes.func,
}

WidgetListItem.defaultProps = {
    subjectPlacement: 'prepend',
}


export default WidgetListItem
