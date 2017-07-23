import { ThemeManager } from '@mozaik/ui'

// themes
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

ThemeManager.defaultTheme = miniTheme.name
