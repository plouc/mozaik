import React from 'react'
import ReactDOM from 'react-dom'
import Mozaik, { Registry, ThemeManager } from '@mozaik/ui'

// themes
import { miniKuroTheme, nightBlueTheme, solarizedDarkTheme, wineTheme } from '@mozaik/themes'

// extensions
import github from '@mozaik/ext-github'
import travis from '@mozaik/ext-travis'

ThemeManager.add(miniKuroTheme)
ThemeManager.add(nightBlueTheme)
ThemeManager.add(solarizedDarkTheme)
ThemeManager.add(wineTheme)

ThemeManager.defaultTheme = solarizedDarkTheme.name

Registry.addExtensions({
    github,
    travis,
})

ReactDOM.render(<Mozaik />, document.getElementById('root'))
