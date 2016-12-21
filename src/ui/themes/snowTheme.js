/*
@todo include those vars if required
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,200,800|Montserrat:400,700");
theme-snow = {
  // DASHBOARD
  dashboard-header-font          : unquote("normal normal 400 2.6vmin/6vmin 'Montserrat', sans-serif"),
}
.dashboard__title {
  background: themes[snow][widget-header-bg-color];
  border-radius: themes[snow][widget-border-radius];
  padding: 0 2vmin;
}
.time__clock
  &__outer-circle
    border-color #d3dfe8
    background-color #f1f6f7
    box-shadow 0 0 30px rgba(255, 255, 255, 0.75) inset

  &__inner-circle
    background #c5d2db

  &__indicator
    display none

  &__hand
    background-color #c5d2db
    &--seconds
      background-color #a9dca9

*/

const snowTheme = {
    colors: {
        background: '#ebf0f1',
        text:       '#333',
        textMute:   '#999',
        unknown:    '#d3dfe8',
        success:    '#8ddb8d',
        warning:    '#d1be65',
        failure:    '#e37856',
    },
    fonts: {
        default: `normal normal 400 1.6vmin/3vmin 'Open Sans', sans-serif`,
    },
    dashboard: {
        header: {
            bgColor: '#fff',
            overrides: {
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
            },
        },
    },
    settings: {
        shadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    },
    notifications: {
        bgColor:   '#fff',
        textColor: '#333',
        padding:   '0.8vmin 1.6vmin',
        shadow:    '0 1px 2px rgba(0, 0, 0, 0.15), 0 4px 7px rgba(0, 0, 0, 0.15)',
        overrides: {},
    },
    card: {
        bgColor: '#fff',
        shadow:  '0 10px 10px rgba(0, 0, 0, 0.15)',
    },
    widget: {
        spacing:      '2vmin',
        borderRadius: '2px',
        bgColor:      '#fff',
        shadow:       '0 1px 3px rgba(0, 0, 0, 0.1)',
        header: {
            bgColor:   '#fafafa',
            height:    '5vmin',
            font:      `normal normal 400 2vmin 'Montserrat', sans-serif`,
            borderBottom: '1px solid #ebf0f1',
            overrides: {},
            subject: {
                overrides: {
                    color: '#000',
                },
            },
            count: {
                borderRadius: '2vmin',
                padding:      '0.4vmin 1.2vmin',
                border:       '1px solid #ddd',
            },
            icon: {
                color: '#bbb',
            },
        },
    },
    list: {
        item: {
            overrides: {
                //borderBottom: '1px solid #212b37',
            },
            meta: {
                overrides: {
                    color: '#777',
                },
            },
        },
    },
    label: {
        bgColor:      '#fff',
        textColor:    '#333',
        borderRadius: '2px',
        border:       '1px solid #ddd',
        addon:        {
            bgColor:   '#ebf0f1',
            textColor: '#000',
        },
    },
    table: {
        cell: {
            head: {
                overrides: {
                    borderBottom: '1px solid #ddd',
                },
            },
        },
    },
    charts: {
        axis: {
            textColor:      '#777',
            fontSize:       '1.3vmin',
            tickColor:      '#777',
            legendColor:    '#777',
            legendFontSize: '1.3vmin',
        },
        grid: {
            stroke:          '#aaa',
            strokeDasharray: '1,3',
        },
    },
}


export default snowTheme
