/*
@todo include those vars if required
@import url("https://fonts.googleapis.com/css?family=Raleway:200,400,600,800|Montserrat:400,700");
theme-night-blue = {
  // DASHBOARD,
  dashboard-header-height        : 5vmin,
  dashboard-header-txt-color     : #e0c671,
  dashboard-header-font          : unquote("normal normal 400 2.6vmin/5vmin 'Raleway', sans-serif"),

  // NOTIFICATIONS,
  notifications-bg-color         : lighten(#323f53, 5),
  notifications-txt-color        : #e0c671,
  notifications-shadow           : 0 1px 1px rgba(0, 0, 0, 0.85),

  // CHART,
  chart-elements-color           : lighten(#2b3847, 40),
  histogram-bar-bg-color         : lighten(#2b3847, 7),
  pie-chart-outline-stroke       : #27313e,
  pie-chart-outline-stroke-width : 6px,
  pie-gauge-needle-color         : #151b26,
  pie-svg-legend-bg-color        : #323f53,

  // PROPS,
  prop-key-txt-color             : #eedba5,
  prop-value-txt-color           : lighten(#eedba5, 10),
}
.time__clock
  box-shadow 0 1px 0 #495b71 inset

  &__outer-circle
    border 0.8vmin solid #495b71
    background-color #1e2430
    box-shadow 0 0 2px rgba(0, 0, 0, 0.5)

  &__inner-circle,
  &__hand
    background-color #e0c671
    box-shadow 0 0 3px rgba(0, 0, 0, 0.5)

  &__brand
    color #495b71
*/

const nightBlueTheme = {
    colors: {
        background: '#1e2430',
        text:       '#eedba5',
        unknown:    '#495b71',
        success:    '#4ec2b4',
        warning:    '#d1be65',
        failure:    '#de5029',
    },
    fonts: {
        default: `normal normal 400 1.6vmin/3vmin 'Raleway', sans-serif`,
    },
    dashboard: {
        header: {
            bgColor:   '#2b3847',
            overrides: {
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.35)',
            },
        },
    },
    card: {
        bgColor: '#2b3847',
        shadow:  '0 10px 20px rgba(0, 0, 0, 0.35)',
    },
    widget: {
        spacing:      '1.2vmin',
        borderRadius: '2px',
        bgColor:      '#2b3847',
        shadow:       '0 1px 1px rgba(0, 0, 0, 0.35)',
        header: {
            bgColor:      '#323f53',
            textColor:    '#eedba5',
            shadow:       '0 1px 0 #495b71 inset',
            borderBottom: '1px solid #253246',
            font:         `normal normal 400 1.6vmin 'Montserrat', sans-serif`,
            overrides:    {
                textTransform: 'uppercase',
            },
            subject: {
                overrides: {
                    color: '#f6ecd0',
                },
            },
            count: {
                bgColor:      '#1e2836',
                textColor:    '#7e9ebc',
                shadow:       '0 1px 0 rgba(0, 0, 0, 0.5) inset',
                textShadow:   '0 1px 0 rgba(0, 0, 0, 0.5)',
                borderRadius: '2px',
                padding:      '3px 7px',
            },
            icon: {
                size:  '2.2vmin',
                color: '#e0c671',
            },
        },
    },
    list: {
        item: {
            overrides: {
                borderBottom: '1px solid #212b37',
            },
            meta: {
                overrides: {
                    color: '#879db7',
                },
            },
        },
    },
    label: {
        bgColor:      '#212e41',
        textColor:    '#e0c671',
        borderRadius: '2px',
        addon:     {
            bgColor:   '#1e2836',
            textColor: '#e0c671',
        },
    },
    table: {
        cell: {
            head: {
                overrides: {
                    borderBottom:  '1px solid #212e41',
                    fontWeight:    '600',
                    fontSize:      '1.4vmin',
                    textTransform: 'uppercase',
                },
            },
        },
    },
    charts: {
        axis: {
            textColor: '#879db7',
            tickColor: '#879db7',
        },
        grid: {
            stroke:          '#596981',
            strokeDasharray: '1,3',
        },
    },
}


export default nightBlueTheme
