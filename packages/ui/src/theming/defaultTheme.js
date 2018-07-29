export default {
    name: 'default',
    typography: {
        default: {
            default: {
                fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
                fontSize: '1.8vmin',
                fontWeight: 400,
                lineHeight: '1.5em',
            },
            strong: {
                fontWeight: 600,
            },
            small: {
                fontSize: '1.8vmin',
            },
        },
        display: {
            default: {
                fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
                fontSize: '2vmin',
                fontWeight: 600,
            },
        },
        mono: {
            default: {
                fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
                fontSize: '1.8vmin',
                lineHeight: '1.4em',
            },
        },
    },
    colors: {
        text: '#555',
        textHighlight: '#000',
        icon: '#000',
        unknown: '#d3dfe8',
        success: '#8ddb8d',
        warning: '#d1be65',
        failure: '#e37856',
    },
    root: {
        background: '#eee',
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
        player: {
            slash: {
                margin: '0 0.6vmin',
                color: 'inherit',
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
            background: 'transparent',
            color: 'inherit',
            padding: '2vmin',
            fontSize: 'inherit',
            extend: '',
            subject: {
                extend: '',
            },
            count: {
                color: 'inherit',
                fontSize: 'inherit',
                extend: '',
            },
            icon: {
                color: 'inherit',
                fontSize: '2vmin',
                extend: '',
            },
        },
        body: {
            top: '6vmin',
            padding: '1vmin 2vmin 2vmin',
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
    charts: {
        axis: {
            textColor: '#333',
            fontSize: '1.2vmin',
            tickColor: '#333',
            legendColor: '#333',
            legendFontSize: '1.2vmin',
        },
        grid: {
            stroke: '#eee',
        },
        colors: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9'],
    },
}
