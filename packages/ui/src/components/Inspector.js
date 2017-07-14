import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InspectorIcon from 'react-icons/lib/fa/stethoscope'
import WidgetsIcon from 'react-icons/lib/fa/columns'
import ApisIcon from 'react-icons/lib/fa/plug'
import ClientsIcon from 'react-icons/lib/fa/user'
import UptimeIcon from 'react-icons/lib/fa/clock-o'

import Registry from './../WidgetsRegistry'
import Widget from './widget/Widget'
import WidgetHeader from './widget/WidgetHeader'
import WidgetBody from './widget/WidgetBody'
import WidgetLabel from './widget/WidgetLabel'

const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24

/**
 * Format uptime (seconds) to human readable output.
 *
 * @param {Number} uptime
 * @returns {string}
 */
const formatUptime = uptime => {
    let parts = []
    let remaining = Math.round(uptime)

    if (remaining >= SECONDS_PER_DAY) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_DAY)}d`)
        remaining = remaining % SECONDS_PER_DAY
    }

    if (remaining >= SECONDS_PER_HOUR) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_HOUR)}h`)
        remaining = remaining % SECONDS_PER_HOUR
    }

    if (remaining >= SECONDS_PER_MINUTE) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_MINUTE)}mn`)
        remaining = remaining % SECONDS_PER_MINUTE
    }

    parts.push(`${remaining}s`)

    return parts.join(' ')
}

export default class Inspector extends Component {
    static propTypes = {
        apiData: PropTypes.shape({
            apis: PropTypes.array,
            clientCount: PropTypes.number,
        }),
    }

    static getApiRequest() {
        return { id: 'mozaik.inspector' }
    }

    render() {
        const { apiData } = this.props

        const items = []

        items.push(
            <WidgetLabel
                key="widgets"
                label="widgets"
                prefix={Registry.widgetsCount()}
                suffix={<WidgetsIcon />}
            />
        )

        if (apiData) {
            items.push(
                <WidgetLabel
                    key="apis"
                    label="APIs"
                    prefix={apiData.apis.length}
                    suffix={<ApisIcon />}
                />
            )
            items.push(
                <WidgetLabel
                    key="clients"
                    label="connected clients"
                    prefix={apiData.clientCount}
                    suffix={<ClientsIcon />}
                />
            )
            items.push(
                <WidgetLabel
                    key="uptime"
                    label={`uptime: ${formatUptime(apiData.uptime)}`}
                    suffix={<UptimeIcon />}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={<span>Mozaïk</span>}
                    subject="inspector"
                    subjectPlacement="append"
                    icon={InspectorIcon}
                />
                <WidgetBody
                    style={{
                        padding: '1.6vmin 2vmin',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        alignContent: 'stretch',
                        justifyContent: 'space-around',
                    }}
                >
                    {items}
                </WidgetBody>
            </Widget>
        )
    }
}
