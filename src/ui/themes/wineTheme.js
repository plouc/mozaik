const wineTheme = {
    colors: {
        background: '#281212',
        overlay:    'rgba(0, 0, 0, .35)',
        text:       'hsl(6, 26%, 67%)',
        textMute:   '#9b645e',
        unknown:    '#7e706d',
        success:    '#50a3b2',
        failure:    '#a31c12',
    },
    fonts: {
        default: `normal normal 400 2vmin/3vmin 'Open sans', sans-serif`,
    },
    dashboard: {
        header: {
            bgColor: 'rgb(69, 23, 23)',
        },
    },
    settings: {
        shadow: '0 1px 2px rgba(0, 0, 0, 0.75)',
    },
    card: {
        bgColor: 'rgb(69, 23, 23)',
        shadow:  '0 10px 10px rgba(0, 0, 0, 0.25)',
    },
    widget: {
        spacing: '0.6vmin',
        bgColor: 'rgb(69, 23, 23)',
        header:  {
            textColor:    'hsl(10, 60%, 90%)',
            borderBottom: '1px solid rgb(40, 18, 18)',
            font:         `normal normal 100 2.2vmin 'Roboto Slab', sans-serif`,
            subject: {
                overrides: {
                    color:      '#fff',
                    fontWeight: '300',
                },
            },
            count: {
                bgColor:      'rgb(40, 18, 18)',
                textColor:    'hsl(0, 52%, 60%)',
                padding:      '0.6vmin 0.8vmin',
                borderRadius: '2px',
                overrides: {
                    fontSize: '1.8vmin',
                },
            },
            icon: {
                color: '#1d0e0e',
            },
        },
    },
    list: {
        item: {
            meta: {
                overrides: {
                    fontStyle: 'italic',
                    color:     'hsl(0, 52%, 60%)',
                }
            },
            overrides: {
            },
        },
    },
    label: {
        bgColor:      '#561d1d',
        textColor:    'hsl(10, 60%, 90%)',
        borderRadius: '2px',
        addon:     {
            bgColor:   'rgb(40, 18, 18)',
            textColor: 'hsl(10, 60%, 90%)',
        },
    },
    table: {
        cell: {
            head: {
                overrides: {
                    borderBottom: '1px solid rgb(40, 18, 18)',
                },
            },
        },
    },
    charts: {
        axis: {
            textColor: '#c19995',
            textSize: '1.2vmin',
            tickColor: '#c19995',
        },
        grid: {
            stroke:          '#9b645e',
            strokeDasharray: '1,3',
        },
    },
}


export default wineTheme
