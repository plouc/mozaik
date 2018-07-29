import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import styled from 'styled-components'
import Widget from '../../containers/WidgetContainer'

const Wrapper = styled.div`
    position: absolute;
    top: calc(1.2vmin / 2 + ${props => props.theme.dashboard.header.height});
    right: calc(1.2vmin / 2);
    bottom: calc(1.2vmin / 2);
    left: calc(1.2vmin / 2);
`

export const DashboardPropType = PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    widgets: PropTypes.arrayOf(
        PropTypes.shape({
            extension: PropTypes.string.isRequired,
            widget: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            columns: PropTypes.number.isRequired,
            rows: PropTypes.number.isRequired,
        })
    ).isRequired,
})

const widgetWillEnter = ({ data }) => {
    return {
        opacity: 0,
        x: 200 * (data.x + 1),
    }
}

const widgetWillLeave = () => ({
    opacity: spring(0, { stiffness: 120, damping: 15, precision: 0.1 }),
    x: spring(-60, { stiffness: 120, damping: 15, precision: 1 }),
})

const ignoreProps = ['x', 'y', 'top', 'left', 'columns', 'rows', 'width', 'height']

export default class Dashboard extends Component {
    static propTypes = {
        dashboard: DashboardPropType.isRequired,
        dashboardIndex: PropTypes.number.isRequired,
        registry: PropTypes.shape({
            getComponent: PropTypes.func.isRequired,
        }).isRequired,
    }

    render() {
        const {
            dashboard: { columns, rows, widgets: _widgets },
            dashboardIndex,
            registry,
        } = this.props

        const widgets = _widgets.map(w => {
            return {
                ...w,
                key: `dashboard${dashboardIndex}.x${w.x}.y${w.y}`,
                width: `${(w.columns / columns) * 100}%`,
                height: `${(w.rows / rows) * 100}%`,
                left: `${(w.x / columns) * 100}%`,
                top: `${(w.y / rows) * 100}%`,
            }
        })

        return (
            <TransitionMotion
                willEnter={widgetWillEnter}
                willLeave={widgetWillLeave}
                styles={widgets.map(w => ({
                    key: w.key,
                    data: w,
                    style: {
                        opacity: spring(1, {
                            stiffness: 60,
                            damping: 10,
                            precision: 0.1,
                        }),
                        x: spring(0, {
                            stiffness: 60,
                            damping: 10,
                            precision: 1,
                        }),
                    },
                }))}
            >
                {styles => (
                    <Wrapper>
                        {styles.map(({ key, data, style }) => {
                            return (
                                <div
                                    key={key}
                                    style={{
                                        transformOrigin: '0 50%',
                                        position: 'absolute',
                                        width: data.width,
                                        height: data.height,
                                        top: data.top,
                                        left: data.left,
                                        opacity: style.opacity,
                                        transform: `translate3d(${style.x}px,0,0)`,
                                    }}
                                >
                                    <Widget {..._.omit(data, ignoreProps)} registry={registry} />
                                </div>
                            )
                        })}
                    </Wrapper>
                )}
            </TransitionMotion>
        )
    }
}
