export default {
    name: 'night blue',
    colors: {
        icon: '#e0c671',
        unknown: '#495b71',
        success: '#4ec2b4',
        warning: '#d1be65',
        failure: '#de5029',
    },
    root: {
        fontFamily: `'Raleway', sans-serif`,
        color: '#eedba5',
        background: '#1e2430',
        extend: `
        @import url('https://fonts.googleapis.com/css?family=Raleway:200,400,600,800|Montserrat:400,700');
        
        & a {
            color: #f6ecd0;
        }
        `,
    },
    dashboard: {
        header: {
            background: '#2b3847',
            color: '#eedba5',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.35)',
            title: {
                color: '#eedba5',
                textTransform: 'uppercase',
                fontFamily: `'Montserrat', sans-serif`,
            },
        },
    },
    widget: {
        background: '#2b3847',
        extend: `
        border-radius: 2px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .35);
        `,
        wrapper: {
            padding: '0.6vmin',
        },
        header: {
            height: '5vmin',
            textTransform: 'uppercase',
            background: '#323f53',
            color: '#eedba5',
            extend: `
            box-shadow: 0 1px 0 #495b71 inset;
            border-bottom: 1px solid #253246;
            font-family: 'Montserrat', sans-serif;
            border-radius: 2px 2px 0 0;
            `,
            subject: {
                color: '#f6ecd0',
            },
            count: {
                color: '#7e9ebc',
                extend: `
                background-color: #1e2836;
                box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5) inset;
                text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
                border-radius: 2px;
                padding: 0.5vmin 0.8vmin;
                text-transform: none;
                `,
            },
            icon: {
                fontSize: '2.2vmin',
                color: '#e0c671',
            },
        },
        body: {
            top: '5vmin',
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: '#1e2430',
            color: '#eedba5',
            extend: `
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            `,
        },
    },
    label: {
        extend: `
        border-radius: 2px;
        `,
        main: {
            background: '#212e41',
            color: '#e0c671',
        },
        addon: {
            background: '#1e2836',
            color: '#e0c671',
        },
    },
    list: {
        item: {
            extend: `
            border-bottom: 1px solid #28323f;
            &:last-child {
                border-bottom: 0;
            }
            `,
            hover: {
                background: '#2f3d4b',
            },
            meta: {
                color: '#879db7',
            },
        },
    },
}
