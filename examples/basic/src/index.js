import React from 'react'
import ReactDOM from 'react-dom'
import './register_extensions'
import Mozaik, { ThemeManager } from '@mozaik/ui'

// themes
import {
    miniKuroTheme,
    nightBlueTheme,
    solarizedDarkTheme,
    wineTheme,
} from '@mozaik/themes'

ThemeManager.add(miniKuroTheme)
ThemeManager.add(nightBlueTheme)
ThemeManager.add(solarizedDarkTheme)
ThemeManager.add(wineTheme)

ThemeManager.defaultTheme = solarizedDarkTheme.name

ReactDOM.render(<Mozaik />, document.getElementById('root'))
