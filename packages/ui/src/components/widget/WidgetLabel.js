import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.span`
    display: inline-flex;
    align-items: stretch;
    align-content: stretch;
    background: ${props => props.theme.label.background};
    color: ${props => props.theme.label.color};
    ${props => props.theme.label.extend.trim()};
`

const Label = styled.span`
    display: inline-flex;
    align-items: center;
    white-space: pre;
    flex-grow: 1;
    padding: ${props => props.theme.label.main.padding};
    background: ${props => props.theme.label.main.background};
    color: ${props => props.theme.label.main.color};
    ${props => props.theme.label.main.extend.trim()};
`

const Addon = styled.span`
    display: inline-flex;
    align-items: center;
    white-space: pre;
    padding: ${props => props.theme.label.addon.padding};
    background: ${props => props.theme.label.addon.background};
    color: ${props => props.theme.label.addon.color};
    ${props => props.theme.label.addon.extend.trim()};
`

export default class WidgetLabel extends Component {
    static propTypes = {
        prefix: PropTypes.node,
        label: PropTypes.node.isRequired,
        suffix: PropTypes.node,
        style: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { label, prefix, suffix, style: style } = this.props

        let prefixNode = null
        if (prefix !== undefined) {
            prefixNode = <Addon>{prefix}</Addon>
        }

        let suffixNode = null
        if (suffix !== undefined) {
            suffixNode = <Addon>{suffix}</Addon>
        }

        return (
            <Wrapper style={style}>
                {prefixNode}
                <Label>{label}</Label>
                {suffixNode}
            </Wrapper>
        )
    }
}
