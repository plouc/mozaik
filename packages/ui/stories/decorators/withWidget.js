import React from 'react'
import styled from 'styled-components'
import { Widget } from '../../src'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.root.background};
    color: ${props => props.theme.root.color};
`

const widgetStyle = {
    width: 320,
    height: 320,
}

export default story => (
    <Container>
        <Widget style={widgetStyle}>{story()}</Widget>
    </Container>
)
