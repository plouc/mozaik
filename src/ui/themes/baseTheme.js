
const colors = {
    background: '#fff',
    text:       '#555',
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
    },
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
        textSize: '1.4vmin',
    },
}

export default {
    colors,
    fonts,
    dashboard,
    card,
    widget,
    list,
    label,
    table,
    charts,
}

/*
defaults = {
  // GENERIC
  main-bg-color                     : $main-bg-color,
  main-txt-color                    : $main-txt-color,
  main-margin                       : 1vmin,
  main-font                         : $main-font,
  card-bg-color                     : $main-bg-color,

  // COUNT
  count-bg-color                    : transparent,
  count-txt-color                   : $main-txt-color,
  count-font-size                   : 2.4vmin,
  count-border                      : 0,
  count-border-radius               : 0,
  count-padding                     : 0.4vmin 1.4vmin,

  // LABEL
  label-padding                     : 0.4vmin 1.4vmin,
  label-font-size                   : 1.8vmin,
  label-bg-color                    : transparent,
  label-txt-color                   : $main-txt-color,
  label-addon-bg-color              : transparent,
  label-addon-txt-color             : transparent,
  label-border-radius               : 0,
  label-border                      : 0,

  // NOTIFICATIONS
  notifications-padding             : 1.4vmin 2vmin 1.4vmin 2.8vmin,
  notifications-bg-color            : $main-bg-color,
  notifications-txt-color           : $main-txt-color,
  notifications-shadow              : 0 1px 1px rgba(0, 0, 0, 0.35),
  notifications-marker-width        : 0.8vmin,

  // CHARTS
  chart-elements-color              : $main-txt-color,
  histogram-bar-bg-color            : $main-txt-color,
  chart-axis-txt-color              : $main-txt-color,
  chart-tick-txt-size               : 1.2vmin,
  chart-axis-tick-color             : $main-txt-color,
  chart-grid-line-color             : $main-txt-color,
  pie-chart-outline-fill            : none,
  pie-chart-outline-stroke          : none,
  pie-chart-outline-stroke-width    : 0,
  pie-gauge-needle-color            : #000,
  pie-svg-legend-bg-color           : none,
  pie-svg-legend-txt-color          : $main-txt-color,

  // PROPS
  prop-key-txt-color                : $main-txt-color,
  prop-value-txt-color              : $main-txt-color,
}
*/
