import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import Widget                          from '../widget/Widget'
import WidgetHeader                    from '../widget/WidgetHeader'
import WidgetBody                      from '../widget/WidgetBody'
import WidgetListItem                  from '../widget/list/WidgetListItem'
import { MorphIcon }                   from 'react-svg-buttons'


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
                        let icon = 'cross'
                        if (t === currentTheme) {
                            icon = 'check'
                        }

                        return (
                            <WidgetListItem
                                key={t}
                                onClick={() => { setTheme(t) }}
                                title={t}
                                style={{ cursor: 'pointer' }}
                                pre={
                                    <MorphIcon
                                        type={icon}
                                        size={26}
                                        color={_.get(theme, 'colors.icon', '#000')}
                                    />
                                }
                            />
                        )
                    })}
                </WidgetBody>
            </Widget>
        )
    }
}
