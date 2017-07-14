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
        wrapper: {
            padding: '1vmin',
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

const miniKuroTheme = {
    name: 'mini kuro',
    colors: {
        icon: '#fff',
        unknown: '#c0ab7f',
        success: '#4eb6a3',
        warning: '#d1be65',
        failure: '#ff9176',
    },
    root: {
        fontFamily: `'Roboto Mono', monospace`,
        color: '#fff',
        background: '#000',
        extend: `
        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500,700');
        & a {
            font-weight: 400;
        }
        & img {
            filter: grayscale(100%);
        }
        `,
    },
    widget: {
        background: '#000',
        wrapper: {
            padding: '1.6vmin 3vmin',
        },
        header: {
            textTransform: 'uppercase',
            fontSize: '1.8vmin',
            padding: '0.8vmin 0 0 0',
            extend: `
            border-top: 2px solid #fff;
            align-items: flex-start;    
            `,
        },
    },
    notifications: {
        item: {
            padding: '1.2vmin 2vmin',
            background: '#fff',
            color: '#000',
            extend: `
            font-weight: 400;
            `,
        },
    },
    label: {
        extend: `
        line-height: 1em;
        border-top: 1px dotted #fff;
        border-bottom: 1px dotted #fff;
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
                border-right: 1px dotted #fff;
            }
            &:last-child {
                padding-left: 1.4vmin;
                border-left: 1px dotted #fff;
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
            border-bottom: 1px solid #fff;
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

const solarizedDarkTheme = {
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

const wineTheme = {
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
    },
    widget: {
        background: 'rgb(69, 23, 23)',
        wrapper: {
            padding: '0.3vmin',
        },
        header: {
            /*
             .subject {
             color: #fff;
             font-weight: 300;
             }

             .count {
             background-color: rgb(40, 18, 18);
             color: hsl(0, 52%, 60%);
             border-radius: 2px;
             padding: 0.6vmin 1vmin;
             font-size: 1.8vmin;
             }

             .icon {
             color: hsl(0, 52%, 60%);
             font-size: 2.6vmin;
             }
             */
            fontSize: '2.2vmin',
            color: 'hsl(10, 60%, 90%)',
            extend: `
            font-family: 'Roboto Slab', sans-serif;
            border-bottom: 1px solid rgb(40, 18, 18);
            `,
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

const nightBlueTheme = {
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
            /*
             .subject {
             color: #f6ecd0;
             }

             .count {
             background-color: #1e2836;
             color: #7e9ebc;
             box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5) inset;
             text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
             border-radius: 2px;
             padding: 0.5vmin 0.8vmin;
             text-transform: none;
             }

             .icon {
             font-size: 2.2vmin;
             color: #e0c671;
             }
             */
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

ThemeManager.defaultTheme = solarizedDarkTheme.name

ThemeManager.add(defaultTheme)
ThemeManager.add(miniKuroTheme)
ThemeManager.add(solarizedDarkTheme)
ThemeManager.add(wineTheme)
ThemeManager.add(nightBlueTheme)

export default ThemeManager
