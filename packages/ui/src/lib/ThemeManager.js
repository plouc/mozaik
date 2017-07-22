import _ from 'lodash'

const defaultTheme = {
    name: 'default',
    colors: {
        icon: '#000',
        unknown: '#d3dfe8',
        success: '#8ddb8d',
        warning: '#d1be65',
        failure: '#e37856',
    },
    root: {
        fontFamily: 'sans-serif',
        color: '#555',
        background: '#eee',
        fontSize: '1.6vmin',
        lineHeight: '3vmin',
        extend: '',
    },
    dashboard: {
        header: {
            height: '6vmin',
            padding: '0 3vmin',
            background: 'transparent',
            color: 'inherit',
            boxShadow: 'none',
            extend: '',
            title: {
                color: 'inherit',
                textTransform: 'none',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                extend: '',
            },
        },
    },
    widget: {
        background: 'white',
        extend: '',
        wrapper: {
            padding: '1vmin',
            extend: '',
        },
        header: {
            height: '6vmin',
            textTransform: 'normal',
            background: 'transparent',
            color: 'inherit',
            padding: '2vmin',
            fontSize: 'inherit',
            extend: '',
        },
        body: {
            top: '6vmin',
            extend: '',
        },
    },
    notifications: {
        item: {
            padding: '0.8vmin 2vmin',
            background: 'white',
            color: 'inherit',
            extend: '',
        },
    },
    label: {
        background: 'transparent',
        color: 'inherit',
        extend: '',
        main: {
            padding: '0.4vmin 1.4vmin',
            background: 'transparent',
            color: 'inherit',
            extend: '',
        },
        addon: {
            padding: '0.4vmin 1.4vmin',
            background: 'transparent',
            color: 'inherit',
            extend: '',
        },
    },
    list: {
        item: {
            padding: '1.5vmin 2vmin',
            background: 'transparent',
            extend: '',
            hover: {
                background: 'inherit',
                extend: '',
            },
            meta: {
                fontSize: 'inherit',
                extend: '',
            },
        },
    },
}

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
