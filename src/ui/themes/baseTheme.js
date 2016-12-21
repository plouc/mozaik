
const colors = {
    background: '#fff',
    text:       '#555',
    textMute:   '#999',
    overlay:    'rgba(0, 0, 0, .15)',
    // Meaningful colors
    unknown:    '#495b71',
    success:    '#30b366',
    warning:    '#d1be65',
    failure:    '#d53721',
}

const fonts = {
    default: `normal normal 400 2vmin/3.6vmin 'Open sans', sans-serif`,
}

const dashboard = {
    header: {
        height:    '6vmin',
        padding:   '0 2vmin',
        textColor: colors.text,
        font:      fonts.default,
        bgColor:   'transparent',
        overrides: {},
        title: {
            overrides: {}
        },
    },
}

const settings = {
    shadow: 'none',
}

const notifications = {
    bgColor:   colors.background,
    textColor: colors.text,
    padding:   0,
    shadow:    'none',
    overrides: {},
}

const card = {
    bgColor: 'transparent',
    shadow:  'none',
}

const widget = {
    spacing:      '2vmin',
    bgColor:      'transparent',
    shadow:       'none',
    border:       0,
    borderRadius: 0,
    innerSpacing: '2vmin',
    header: {
        height:       '6vmin',
        border:       0,
        bgColor:      'transparent',
        textColor:    'inherit',
        shadow:       'none',
        borderBottom: 0,
        font:         'inherit',
        itemsSpacing: '0.8vmin',
        overrides:    {},
        subject:      {
            overrides: {},
        },
        count: {
            bgColor:      'transparent',
            textColor:    'inherit',
            shadow:       'none',
            textShadow:   'none',
            border:       0,
            borderRadius: 0,
            padding:      0,
            spacing:     '1.6vmin',
        },
        icon: {
            color: 'inherit',
            size:  'inherit',
        },
    },
    body: {
        border:  0,
        bgColor: 'transparent',
        shadow:  'none',
    },
}

const list = {
    item: {
        padding:   '1.5vmin 2vmin',
        border:    0,
        spacing:   '1.5vmin',
        overrides: {},
        meta:      {
            fontSize:  '85%',
            overrides: {},
        },
        status:    {
            size:      '1.6vmin',
            overrides: {},
        },
    },
}

const label = {
    padding:      '0.4vmin 1.4vmin',
    fontSize:     'inherit',
    bgColor:      'transparent',
    textColor:    'inherit',
    borderRadius: 0,
    overrides:    {},
    //label-border: 0,
    addon:        {
        bgColor:   'transparent',
        textColor: 'inherit',
        overrides: {},
    }
}

const table = {
    cell: {
        padding:   '1.2vmin 2vmin',
        overrides: {},
        head: {
            padding:   '1.2vmin 2vmin',
            overrides: {},
        },
    },
}

const charts = {
    axis: {
        fontSize:       '1.4vmin',
        legendColor:    '#555',
        legendFontSize: '1.4vmin',
    },
}

export default {
    colors,
    fonts,
    dashboard,
    settings,
    notifications,
    card,
    widget,
    list,
    label,
    table,
    charts,
}
