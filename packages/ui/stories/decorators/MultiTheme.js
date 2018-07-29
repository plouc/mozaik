import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ThemeManager } from '../../src'

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const Container = styled.div`
    background: ${props => props.theme.root.background};
    color: ${props => props.theme.colors.text};
    padding: 2vmin;
`

export default class MultiTheme extends Component {
    render() {
        const { children } = this.props

        return (
            <Grid>
                {Object.keys(ThemeManager.listThemes()).map(theme => {
                    return (
                        <ThemeProvider key={theme} theme={ThemeManager.get(theme)}>
                            <Container>{children}</Container>
                        </ThemeProvider>
                    )
                })}
            </Grid>
        )
    }
}
