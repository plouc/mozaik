import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { MorphIcon } from 'react-svg-buttons'
import Widget from '../widget/Widget'
import WidgetHeader from '../widget/WidgetHeader'
import WidgetBody from '../widget/WidgetBody'
import WidgetListItem from '../widget/list/WidgetListItem'
import { SlidersIcon } from '../icons'

class ThemeSetting extends Component {
    static propTypes = {
        themes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        currentTheme: PropTypes.string.isRequired,
        setTheme: PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps) {
        return this.props.currentTheme !== nextProps.currentTheme
    }

    render() {
        const { themes, currentTheme, setTheme, theme } = this.props

        const themeIds = Object.keys(themes)

        return (
            <Widget>
                <WidgetHeader title="Themes" count={themeIds.length} icon={SlidersIcon} />
                <WidgetBody disablePadding={true}>
                    {themeIds.map(t => {
                        let icon = 'cross'
                        if (t === currentTheme) {
                            icon = 'check'
                        }

                        return (
                            <WidgetListItem
                                key={t}
                                onClick={() => {
                                    setTheme(t)
                                }}
                                title={t}
                                style={{ cursor: 'pointer' }}
                                pre={<MorphIcon type={icon} size={26} color={theme.colors.icon} />}
                            />
                        )
                    })}
                </WidgetBody>
            </Widget>
        )
    }
}

export default withTheme(ThemeSetting)
