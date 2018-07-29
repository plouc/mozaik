import _ from 'lodash'
import defaultTheme from './defaultTheme'

const themes = {
    [defaultTheme.name]: defaultTheme,
}

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

export default ThemeManager
