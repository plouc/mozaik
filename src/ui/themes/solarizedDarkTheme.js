const colors = {
    background: '#073642',
    text:       '#839496',
    textMute:   '#495b71',
    overlay:    'rgba(0, 0, 0, .35)',
    cardBg:     '#002b36',
    unknown:    '#495b71',
    success:    '#859900',
    warning:    '#b58900',
    failure:    '#dc322f',
}

const solarizedDarkTheme = {
    colors,
    fonts: {
        default: `normal normal 400 1.4vmin/2.4vmin 'Space Mono', Consolas, monospace`,
    },
    dashboard: {
        header: {
            bgColor:   colors.cardBg,
            title: {
                overrides: {
                    fontSize: '1.8vmin',
                    color:    '#eee8d5',
                },
            },
        },
    },
    notifications: {
        bgColor:   colors.background,
        textColor: colors.text,
        padding:   '0.8vmin 1.6vmin',
        shadow:    '0 1px 3px rgba(0, 0, 0, 0.25)',
        overrides: {},
    },
    card: {
        bgColor: colors.cardBg,
        shadow:  '0 10px 10px rgba(0, 0, 0, 0.25)',
    },
    widget: {
        spacing: '1.2vmin',
        bgColor: colors.cardBg,
        header:  {
            height:    '5vmin',
            overrides: {},
            subject: {
                overrides: {
                    color: '#eee8d5',
                },
            },
            count: {
                textColor: '#eee8d5',
            },
            icon: {
                size:  '2vmin',
                color: '#0a5667',
            },
        },
    },
    list: {
        item: {
            padding:   '0.6vmin 2vmin',
            overrides: {},
            meta: {
                overrides: {
                    color: '#586e75',
                },
            },
        },
    },
    label: {
        bgColor:      '#073642',
        textColor:    '#839496',
        borderRadius: '2px',
        addon:     {
            bgColor:   '#00242f',
            textColor: '#93a1a1',
        },
    },
    table: {
        cell: {
            head: {
                overrides: {
                    fontSize:      '1.4vmin',
                    textTransform: 'uppercase',
                },
            },
        },
    },
    charts: {
        axis: {
            textColor:      '#839496',
            fontSize:       '1.2vmin',
            tickColor:      '#586e75',
            legendColor:    '#839496',
            legendFontSize: '1.2vmin',
        },
        grid: {
            stroke:          '#485c63',
            strokeDasharray: '1,3',
        },
    },
}


export default solarizedDarkTheme
