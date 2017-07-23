export default {
    name: 'wine',
    colors: {
        icon: 'hsl(0, 52%, 60%)',
        unknown: '#7e706d',
        success: '#50a3b2',
        warning: '#b87334',
        failure: '#a31c12',
    },
    root: {
        fontFamily: `'Open sans', sans-serif`,
        color: 'hsl(6, 26%, 67%)',
        background: '#281212',
        fontSize: '1.8vmin',
        extend: `
        @import url("https://fonts.googleapis.com/css?family=Roboto+Slab:100,300|Open+Sans:400italic,400,300,600,700");
        & a {
            color: hsl(10, 60%, 90%);
        }
        `,
    },
    dashboard: {
        header: {
            background: 'rgb(69, 23, 23)',
        },
        player: {
            slash: {
                color: 'hsl(0, 52%, 60%)',
            },
        },
    },
    widget: {
        background: 'rgb(69, 23, 23)',
        wrapper: {
            padding: '0.3vmin',
        },
        header: {
            fontSize: '2.2vmin',
            color: 'hsl(10, 60%, 90%)',
            extend: `
            font-family: 'Roboto Slab', sans-serif;
            border-bottom: 1px solid rgb(40, 18, 18);
            `,
            subject: {
                color: '#fff',
                extend: `
                font-weight: 300;
                `,
            },
            count: {
                color: 'hsl(0, 52%, 60%)',
                fontSize: '1.8vmin',
                extend: `
                background-color: rgb(40, 18, 18);
                border-radius: 2px;
                padding: 0.6vmin 1vmin;
                `,
            },
            icon: {
                fontSize: '2.6vmin',
                color: 'hsl(0, 52%, 60%)',
            },
        },
    },
    notifications: {
        item: {
            background: 'rgb(87, 25, 25)',
            color: '#fff',
            extend: `
            box-shadow: 0 1px 2px rgba(0, 0, 0, .75);
            font-size: 1.6vmin;
            `,
        },
    },
    label: {
        extend: `
        border-radius: 2px;
        `,
        main: {
            background: '#561d1d',
            color: 'hsl(10, 60%, 90%)',
        },
        addon: {
            background: 'rgb(55, 21, 21)',
            color: 'hsl(0, 60%, 63%)',
        },
    },
    list: {
        item: {
            extend: `
            border-bottom: 1px solid rgb(52, 20, 20);
            &:last-child {
                border-bottom: 0;
            }
            `,
            hover: {
                background: 'rgb(82, 25, 25)',
            },
            meta: {
                color: 'hsl(0, 52%, 60%)',
                fontSize: '1.6vmin',
            },
        },
    },
}
