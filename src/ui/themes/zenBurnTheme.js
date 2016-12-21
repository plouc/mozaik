const zenBurnTheme = {
    colors: {
        background: '#373737',
        overlay:    'rgba(0, 0, 0, .35)',
        text:       '#d0a182',
        textMute:   '#87685a',
        unknown:    '#333333',
        success:    '#84c3c6',
        warning:    '#b58900',
        failure:    '#c14c38',
    },
    fonts: {
        default: `normal normal 400 1.6vmin/2.4vmin Consolas`,
    },
    dashboard: {
        header: {
            bgColor:   '#3f3f3f',
            overrides: {},
        },
    },
    card: {
        bgColor: '#3f3f3f',
        shadow:  '0 10px 10px rgba(0, 0, 0, 0.25)',
    },
    widget: {
        spacing: '2px',
        bgColor: '#3f3f3f',
        header:  {
            height:    '5vmin',
            overrides: {},
            subject: {
                overrides: {
                    color: '#ffd5b7',
                },
            },
            count: {
                textColor: '#ffd5b7',
            },
            icon: {
                size:  '2vmin',
                color: '#d0a182',
            },
        },
    },
    list: {
        item: {
            padding:   '0.6vmin 2vmin',
            overrides: {},
            meta: {
                overrides: {
                    color: '#b48f7a',
                },
            },
        },
    },
    label: {
        bgColor:   '#393939',
        textColor: '#d0a182',
        addon:     {
            bgColor:   '#333333',
            textColor: '#d0a182',
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
            textColor: '#b48f7a',
            tickColor: '#b48f7a',
        },
        grid: {
            stroke:          '#87685a',
            strokeDasharray: '1,3',
        },
    },
}


export default zenBurnTheme
