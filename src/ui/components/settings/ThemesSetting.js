import React, { Component, PropTypes } from 'react'
import Widget                          from '../widget/Widget'
import WidgetHeader                    from '../widget/WidgetHeader'
import WidgetBody                      from '../widget/WidgetBody'
import WidgetListItem                  from '../widget/list/WidgetListItem'


export default class ThemeSetting extends Component {
    static propTypes = {
        themes:       PropTypes.object.isRequired,
        currentTheme: PropTypes.string.isRequired,
        setTheme:     PropTypes.func.isRequired,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { themes, currentTheme, setTheme } = this.props
        const { theme }                          = this.context

        const themeIds = Object.keys(themes)

        return (
            <Widget style={{ width: '30%' }}>
                <WidgetHeader
                    title="Themes"
                    count={themeIds.length}
                    icon="adjust"
                />
                <WidgetBody>
                    {themeIds.map(t => {
                        let icon = 'circle-thin'
                        if (t === currentTheme) {
                            icon = 'dot-circle-o'
                        }

                        return (
                            <WidgetListItem
                                key={t}
                                onClick={() => { setTheme(t) }}
                                title={t}
                                pre={<i className={`fa fa-${icon}`}/>}
                            />
                        )
                    })}
                </WidgetBody>
            </Widget>
        )
    }
}
