import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Item = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: ${props => props.theme.list.item.padding};
    background: ${props => props.theme.list.item.background};
    ${props => props.theme.list.item.extend.trim()} &:hover {
        background: ${props => props.theme.list.item.hover.background};
    }
`

const Pre = styled.div`margin-right: 2vmin;`

const Post = styled.div`margin-left: 2vmin;`

const Meta = styled.div`
    fontSize: ${props => props.theme.list.item.meta.fontSize};
    ${props => props.theme.list.item.meta.extend.trim()};
`

export default class WidgetListItem extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        pre: PropTypes.node,
        post: PropTypes.node,
        meta: PropTypes.node,
        style: PropTypes.object,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        subjectPlacement: 'prepend',
    }

    render() {
        const { title, pre, post, meta, onClick, style } = this.props

        let metaNode = null
        if (meta !== undefined) {
            metaNode = (
                <Meta>
                    {meta}
                </Meta>
            )
        }

        let preNode = null
        if (pre !== undefined) {
            preNode = (
                <Pre>
                    {pre}
                </Pre>
            )
        }

        let postNode = null
        if (post !== undefined) {
            postNode = (
                <Post>
                    {post}
                </Post>
            )
        }

        return (
            <Item style={style} onClick={onClick}>
                {preNode}
                <div style={{ flexGrow: 1 }}>
                    {title}
                    {metaNode}
                </div>
                {postNode}
            </Item>
        )
    }
}
