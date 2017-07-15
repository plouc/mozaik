export default {
    name: 'solarized dark',
    colors: {
        icon: '#0badc2',
        unknown: '#495b71',
        success: '#859900',
        warning: '#b58900',
        failure: '#dc322f',
    },
    root: {
        fontFamily: `'Space Mono', Consolas, monospace`,
        color: '#90a2a4',
        background: '#073642',
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
    },
    widget: {
        background: '#002b36',
        wrapper: {
            padding: '0.6vmin',
        },
        header: {
            height: '5vmin',
            /*
             .subject {
             color: #eee8d5;
             }

             .count {
             color: #eee8d5;
             }

             .icon {
             font-size: 2vmin;
             color: #0badc2;
             }
             */
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: '#073642',
            color: '#b3c5c7',
            extend: `
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
            `,
        },
    },
    label: {
        background: '#073642',
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
}