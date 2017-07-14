import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
`

export default class Widget extends Component {
    static propTypes = {
        style: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const { children, style: _style } = this.props

        return (
            <Container style={_style}>
                <Inner>
                    {children}
                </Inner>
            </Container>
        )
    }
}
