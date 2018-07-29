import React from 'react'
import { ThemeProvider } from 'styled-components'
import { select } from '@storybook/addon-knobs'
import './registerThemes'
import { ThemeManager } from '../../src'

const ThemeSelector = ({ theme, children }) => (
    <ThemeProvider theme={ThemeManager.get(theme)}>{children}</ThemeProvider>
)

const options = {}
for (let name in ThemeManager.listThemes()) {
    options[name] = name
}

export default story => (
    <ThemeSelector theme={select('theme', options, 'default', 'theming')}>{story()}</ThemeSelector>
)
