import _         from 'lodash'
import baseTheme from './baseTheme'

const themes = {}

const ThemeManager = {
    loadTheme(id, theme) {
        themes[id] = _.merge({}, baseTheme, theme)
    },

    listThemes() {
        return themes
    },

    get(id) {
        return themes[id]
    },
}

ThemeManager.defaultTheme = 'wine'


export default ThemeManager
