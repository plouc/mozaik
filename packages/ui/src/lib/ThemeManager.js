import _ from 'lodash'
import defaultTheme from '../defaultTheme'

const themes = {}

const ThemeManager = {
    add(theme) {
        themes[theme.name] = _.defaultsDeep(theme, defaultTheme)
    },

    listThemes() {
        return themes
    },

    get(name) {
        return themes[name]
    },
}

ThemeManager.defaultTheme = defaultTheme.name

ThemeManager.add(defaultTheme)

export default ThemeManager
