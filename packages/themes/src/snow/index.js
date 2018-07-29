import colors from './colors'
import charts from './charts'

export default {
    name: 'snow',
    colors,
    root: {
        color: colors.text,
        background: colors.background,
        extend: `
        @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,200,600,700|Montserrat:400,700");
        
        & a {
            color: #2d7189;
        }
        `,
    },
    dashboard: {
        header: {
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, .15)',
            padding: '0 3.6vmin',
            title: {
                color: '#000',
                fontFamily: `'Montserrat', sans-serif`,
                fontSize: '2vmin',
            },
        },
        player: {
            slash: {
                color: '#0badc2',
                fontSize: '2.2vmin',
            },
        },
    },
    widget: {
        background: '#fff',
        extend: `
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        `,
        wrapper: {
            padding: '1vmin',
        },
        header: {
            height: '5vmin',
            background: '#fafafa',
            extend: `
            border-bottom: 1px solid ${colors.background};
            border-radius: 2px 2px 0 0;
            `,
            subject: {
                color: '#000',
            },
            count: {
                extend: `
                border-radius: 2vmin;
                padding: 0.4vmin 1.2vmin;
                border: 1px solid #ddd;
                `,
            },
            icon: {
                fontSize: '2.6vmin',
                color: '#8fccd2',
            },
        },
        body: {
            top: '5vmin',
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: '#fff',
            extend: `
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
            border-radius: 2px;
            font-size: 1.6vmin;
            `,
        },
    },
    label: {
        extend: `
        border-radius: 2px;
        border: 1px solid #ddd;
        `,
        addon: {
            background: colors.background,
            color: '#000',
        },
    },
    list: {
        item: {
            extend: `
            border-bottom: 1px solid ${colors.background};
            &:last-child {
                border-bottom: 0;
            }
            `,
            hover: {
                background: '#eee',
            },
            meta: {
                color: '#777',
                fontSize: '1.4vmin',
            },
        },
    },
    charts,
}
