import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../../Text'
import typography from '../../../theming/typography'

const Item = styled.div`
    position: relative;
    display: flex;
    align-items: ${props =>
        props.align === 'top' ? 'flex-start' : props.align === 'center' ? 'center' : 'flex-end'};
    padding: ${props => props.theme.list.item.padding};
    background: ${props => props.theme.list.item.background};
    ${props => props.theme.list.item.extend.trim()} &:hover {
        background: ${props => props.theme.list.item.hover.background};
    }
`

const Title = styled.div`
    color: ${props => props.theme.colors.textHighlight};
    ${props => typography(props.theme, 'default', 'strong')};
`

const Pre = styled.div`
    margin-right: 2vmin;
`

const Post = styled.div`
    margin-left: 2vmin;
`

export default class WidgetListItem extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        pre: PropTypes.node,
        post: PropTypes.node,
        meta: PropTypes.node,
        style: PropTypes.object,
        onClick: PropTypes.func,
        align: PropTypes.oneOf(['top', 'center', 'bottom']).isRequired,
    }

    static defaultProps = {
        subjectPlacement: 'prepend',
        align: 'center',
    }

    render() {
        const { title, pre, post, meta, onClick, align, style } = this.props

        let metaNode = null
        if (meta !== undefined) {
            metaNode = (
                <Text tag="div" type="default" variant="small">
                    {meta}
                </Text>
            )
        }

        let preNode = null
        if (pre !== undefined) {
            preNode = <Pre>{pre}</Pre>
        }

        let postNode = null
        if (post !== undefined) {
            postNode = <Post>{post}</Post>
        }

        return (
            <Item align={align} style={style} onClick={onClick}>
                {preNode}
                <div style={{ flexGrow: 1 }}>
                    <Title>{title}</Title>
                    {metaNode}
                </div>
                {postNode}
            </Item>
        )
    }
}
