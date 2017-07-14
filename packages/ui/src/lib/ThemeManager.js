const themes = {}

const ThemeManager = {
    add(theme) {
        themes[theme.name] = theme
    },

    listThemes() {
        return themes
    },

    get(name) {
        return themes[name]
    },
}

ThemeManager.defaultTheme = 'night blue'

export default ThemeManager
