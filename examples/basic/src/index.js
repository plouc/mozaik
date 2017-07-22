import React from 'react'
import ReactDOM from 'react-dom'
import './register_extensions'
import Mozaik, { ThemeManager } from '@mozaik/ui'

// themes
import {
    miniKuroTheme,
    nightBlueTheme,
    snowTheme,
    solarizedDarkTheme,
    wineTheme,
} from '@mozaik/themes'

ThemeManager.add(miniKuroTheme)
ThemeManager.add(nightBlueTheme)
ThemeManager.add(snowTheme)
ThemeManager.add(solarizedDarkTheme)
ThemeManager.add(wineTheme)

ThemeManager.defaultTheme = snowTheme.name

ReactDOM.render(<Mozaik />, document.getElementById('root'))
