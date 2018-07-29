import colors from './colors'
import charts from './charts'
import typography from './typography'

export default {
    name: 'mini',
    typography,
    colors,
    root: {
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
            title: {},
        },
    },
    widget: {
        wrapper: {
            padding: '1.6vmin 3vmin',
        },
        header: {
            padding: '0.8vmin 0 0 0',
            extend: `
            border-top: 2px solid #000;
            align-items: flex-start;
            `,
            subject: {},
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
    charts,
}
