import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import Widget from '../../../src/ui/containers/WidgetContainer'
import Dashboard from '../../../src/ui/components/dashboard/Dashboard'

const registry = {
    get() {},
}

test(`should render as many widgets as the 'dashboard.widgets' prop have`, t => {
    const dashboard = {
        index: 0,
        columns: 3,
        rows: 2,
        widgets: [
            { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
            { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
            { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
        ],
    }
    const wrapper = shallow(
        <Dashboard dashboard={dashboard} isCurrent={true} registry={registry} />
    )

    const widgets = wrapper.find(Widget)
    t.is(widgets.length, dashboard.widgets.length)
})

test('should convert position and sizing to percent based values', t => {
    const dashboard = {
        index: 0,
        columns: 2,
        rows: 2,
        widgets: [
            { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
            { type: 'test_widget', x: 1, y: 0, columns: 1, rows: 2 },
        ],
    }
    const expectedWidgetsValues = [
        { x: '0%', y: '0%', width: '50%', height: '100%' },
        { x: '50%', y: '0%', width: '50%', height: '100%' },
    ]

    const wrapper = shallow(
        <Dashboard dashboard={dashboard} isCurrent={true} registry={registry} />
    )

    const widgets = wrapper.find(Widget)
    expectedWidgetsValues.forEach((expectedWidgetValues, index) => {
        _.forOwn(expectedWidgetValues, (propValue, propKey) => {
            t.is(widgets.at(index).prop(propKey), propValue)
        })
    })
})

test('should not pass down widget columns/rows values', t => {
    const dashboard = {
        index: 0,
        columns: 2,
        rows: 2,
        widgets: [
            { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
            { type: 'test_widget', x: 1, y: 0, columns: 1, rows: 2 },
        ],
    }

    const wrapper = shallow(
        <Dashboard dashboard={dashboard} isCurrent={true} registry={registry} />
    )

    const widgets = wrapper.find(Widget)
    dashboard.widgets.forEach((widget, index) => {
        t.falsy(widgets.at(index).prop('columns'))
        t.falsy(widgets.at(index).prop('rows'))
    })
})

test(`should add extra class if 'isCurrent' is true`, t => {
    const dashboard = {
        index: 0,
        columns: 2,
        rows: 2,
        widgets: [],
    }

    let wrapper = shallow(
        <Dashboard
            dashboard={dashboard}
            isCurrent={false}
            registry={registry}
        />
    )
    t.notRegex(wrapper.prop('className'), /_is-current/)

    wrapper = shallow(
        <Dashboard dashboard={dashboard} isCurrent={true} registry={registry} />
    )
    t.regex(wrapper.prop('className'), /_is-current/)
})
