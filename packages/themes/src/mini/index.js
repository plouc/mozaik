export default {
    name: 'mini',
    colors: {
        icon: '#000',
        unknown: '#c0ab7f',
        success: '#4eb6a3',
        warning: '#d1be65',
        failure: '#ff9176',
    },
    root: {
        fontFamily: `'Roboto Mono', monospace`,
        color: '#000',
        background: '#fff',
        extend: `
        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500,700');
        & a {
            font-weight: 700;
        }
        & img {
            filter: grayscale(100%);
        }
        `,
    },
    dashboard: {
        header: {
            title: {
                textTransform: 'uppercase',
                extend: `
                font-weight: 700;
                `,
            },
        },
    },
    widget: {
        wrapper: {
            padding: '1.6vmin 3vmin',
        },
        header: {
            textTransform: 'uppercase',
            fontSize: '1.8vmin',
            padding: '0.8vmin 0 0 0',
            extend: `
            border-top: 2px solid #000;
            align-items: flex-start;
            `,
            subject: {
                extend: `
                font-weight: 700;
                `,
            },
            count: {
                extend: `
                font-weight: 700;
                vertical-align: baseline;
                `,
            },
            icon: {
                extend: `
                display: none;
                `,
            },
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: '#000',
            color: '#fff',
            extend: `
            font-weight: 300;
            `,
        },
    },
    label: {
        extend: `
        line-height: 1em;
        border-top: 1px dotted #000;
        border-bottom: 1px dotted #000;
        align-items: baseline;
        `,
        main: {
            padding: '1vmin 0.2vmin',
        },
        addon: {
            padding: '1vmin 0.6vmin',
            extend: `
            font-weight: 700;
            &:first-child {
                padding-right: 1.4vmin;
                border-right: 1px dotted #000;
            }
            &:last-child {
                padding-left: 1.4vmin;
                border-left: 1px dotted #000;
            }
            & + .Label {
                padding-left: 1.4vmin;
            }
            .Label + & {
                margin-left: 1.4vmin;
            }
            `,
        },
    },
    list: {
        item: {
            padding: '1vmin 0',
            extend: `
            border-bottom: 1px solid #000;
            &:last-child {
                border-bottom: 0;
            }
            `,
            meta: {
                fontSize: '1.4vmin',
                extend: `
                font-weight: 300;
                `,
            },
        },
    },
}
