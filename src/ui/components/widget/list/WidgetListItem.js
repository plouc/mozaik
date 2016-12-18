import React, { Component, PropTypes } from 'react'


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
            style: _style
        } = this.props

        const { theme } = this.context

        const rootStyle = {
            position:     'relative',
            padding:      theme.list.item.padding,
            display:      'flex',
            alignItems:   'center',
            borderBottom: theme.list.item.border,
            ...theme.list.item.overrides,
            ..._style,
        }

        if (onClick !== undefined) {
            rootStyle.cursor = 'pointer'
        }

        const style = {
            flexGrow: 1,
        }

        let metaNode = null
        if (meta !== undefined) {
            const metaStyle = {
                fontSize: theme.list.item.meta.fontSize,
                ...theme.list.item.meta.overrides,
            }

            metaNode = (
                <div style={metaStyle}>
                    {meta}
                </div>
            )
        }

        const spacing = theme.list.item.spacing

        let preNode = null
        if (pre !== undefined) {
            preNode = <div style={{ marginRight: spacing }}>{pre}</div>
        }

        let postNode = null
        if (post !== undefined) {
            postNode = <div style={{ marginLeft: spacing }}>{post}</div>
        }

        return (
            <div style={rootStyle} onClick={onClick}>
                {preNode}
                <div style={style}>
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
