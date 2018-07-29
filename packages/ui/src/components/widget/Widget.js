import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import typography from '../../theming/typography'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.widget.wrapper.padding};
`

const Inner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.widget.background};
    ${props => typography(props.theme, 'default', 'default')};
`

export default class Widget extends Component {
    static propTypes = {
        style: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { children, style: _style } = this.props

        return (
            <Container style={_style}>
                <Inner>{children}</Inner>
            </Container>
        )
    }
}
