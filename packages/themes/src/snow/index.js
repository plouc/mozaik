export default {
    name: 'snow',
    colors: {
        icon: '#0badc2',
        unknown: '#d3dfe8',
        success: '#8ddb8d',
        warning: '#d1be65',
        failure: '#e37856',
    },
    root: {
        fontFamily: `'Open sans', sans-serif`,
        color: '#333',
        background: '#ebf0f1',
        fontSize: '1.6vmin',
        lineHeight: '3vmin',
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
            /*
            .subject {
                color: #000;
            }

            .count {
                border-radius: 2vmin;
                padding: 0.4vmin 1.2vmin;
                border: 1px solid #ddd;
            }

            .icon {
                font-size: 2.6vmin;
                color: #8fccd2;
            }
             */
            height: '5vmin',
            background: '#fafafa',
            fontSize: '2vmin',
            extend: `
            border-bottom: 1px solid #ebf0f1;
            font-family: 'Montserrat', sans-serif;
            border-radius: 2px 2px 0 0;
            `,
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
            background: '#ebf0f1',
            color: '#000',
        },
    },
    list: {
        item: {
            extend: `
            border-bottom: 1px solid #ebf0f1;
            &:last-child {
                border-bottom: 0;
            }
            `,
            hover: {
                background: '#eee',
            },
            meta: {
                color: '#777',
                fontSize: '1.4vmin'
            },
        },
    },
}
