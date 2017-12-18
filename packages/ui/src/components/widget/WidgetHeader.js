import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const Header = styled.header`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: pre;
    font-size: ${props => props.theme.widget.header.fontSize};
    height: ${props => props.theme.widget.header.height};
    padding: ${props => props.theme.widget.header.padding};
    background: ${props => props.theme.widget.header.background};
    color: ${props => props.theme.widget.header.color};
    text-transform: ${props => props.theme.widget.header.textTransform};
    ${props => props.theme.widget.header.extend.trim()};
`

const Count = styled.div`
    display: inline-block;
    line-height: 1em;
    margin-left: 1.6vmin;
    color: ${props => props.theme.widget.header.count.color};
    ${props => props.theme.widget.header.count.extend.trim()};
`

const Subject = styled.div`
    display: inline-block;
    margin-left: 0.5em;
    color: ${props => props.theme.widget.header.subject.color};

    &:first-child {
        margin-left: 0;
        margin-right: 0.5em;
    }

    ${props => props.theme.widget.header.subject.extend.trim()};
`

const IconWrapper = styled.div`
    font-size: ${props => props.theme.widget.header.icon.fontSize};
    ${props => props.theme.widget.header.icon.extend.trim()};
`

class WidgetHeader extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        subject: PropTypes.node,
        subjectPlacement: PropTypes.oneOf(['prepend', 'append']).isRequired,
        count: PropTypes.node,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        iconStyle: PropTypes.object.isRequired,
        style: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        iconColor: PropTypes.string,
    }

    static defaultProps = {
        subjectPlacement: 'prepend',
        style: {},
        iconStyle: {},
    }

    render() {
        const {
            title,
            subject,
            subjectPlacement,
            count,
            icon: _icon,
            style,
            theme,
        } = this.props

        let subjectNode = null
        if (subject) {
            subjectNode = (
                <Subject>
                    {subject}
                </Subject>
            )
        }

        let countNode = null
        if (count !== undefined) {
            countNode = (
                <Count>
                    {count}
                </Count>
            )
        }

        let icon = null
        if (_.isFunction(_icon)) {
            icon = (
                <IconWrapper>
                    {_icon({
                        color: iconColor ? iconColor : theme.colors.icon,
                    })}
                </IconWrapper>
            )
        }

        return (
            <Header style={style}>
                <span>
                    {subjectPlacement === 'prepend' && subjectNode}
                    {title}
                    {subjectPlacement === 'append' && subjectNode}
                    {countNode}
                </span>
                {icon}
            </Header>
        )
    }
}

export default withTheme(WidgetHeader)
