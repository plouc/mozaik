import colors from './colors'
import charts from './charts'
import typography from './typography'

export default {
    name: 'solarized dark',
    typography,
    colors,
    root: {
        fontFamily: `'Space Mono', Consolas, monospace`,
        background: colors.background,
        fontSize: '1.6vmin',
        lineHeight: '2.8vmin',
        extend: `
        @import url('https://fonts.googleapis.com/css?family=Space+Mono');
        
        & a {
            text-decoration: underline;
        }
        `,
    },
    dashboard: {
        header: {
            background: '#002b36',
            title: {
                fontSize: '1.8vmin',
                color: '#eee8d5',
            },
        },
        player: {
            slash: {
                color: '#0badc2',
                margin: '0 0.8vmin',
            },
        },
    },
    widget: {
        background: '#002b36',
        wrapper: {
            padding: '0.6vmin',
        },
        header: {
            height: '5vmin',
            subject: {},
            count: {
                color: '#eee8d5',
            },
            icon: {
                fontSize: '2vmin',
                color: '#0badc2',
            },
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: colors.background,
            color: '#b3c5c7',
            extend: `
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
            `,
        },
    },
    label: {
        background: colors.background,
        extend: `
        border-radius: 2px;
        `,
        main: {
            color: '#839496',
        },
        addon: {
            background: '#00242f',
            color: '#93a1a1',
        },
    },
    list: {
        item: {
            hover: {
                background: '#002834',
            },
            meta: {
                fontSize: '1.4vmin',
            },
        },
    },
    charts,
}
