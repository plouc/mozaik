import _         from 'lodash'
import baseTheme from './baseTheme'

const themes = {}

const ThemeManager = {
    loadTheme(id, theme) {
        themes[id] = _.merge({}, baseTheme, theme)
    },

    listThemes() {
        return Object.keys(themes)
    },

    get(id) {
        return themes[id]
    },
}


export default ThemeManager
