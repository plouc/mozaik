import { ThemeManager } from '@mozaik/ui'

import {
    miniTheme,
    miniKuroTheme,
    nightBlueTheme,
    snowTheme,
    solarizedDarkTheme,
    wineTheme,
} from '@mozaik/themes'

ThemeManager.add(miniTheme)
ThemeManager.add(miniKuroTheme)
ThemeManager.add(nightBlueTheme)
ThemeManager.add(snowTheme)
ThemeManager.add(solarizedDarkTheme)
ThemeManager.add(wineTheme)

ThemeManager.defaultTheme = solarizedDarkTheme.name
