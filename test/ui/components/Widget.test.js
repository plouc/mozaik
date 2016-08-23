import test                 from 'ava'
import React, { Component } from 'react'
import { shallow }          from 'enzyme'
import sinon                from 'sinon'
import Widget               from '../../../src/ui/components/Widget'

class TestWidget extends Component {
    static getApiRequest() {
        return { id: 'test_widget' }
    }

    render() {
        return null
    }
}

const noop     = () => {}
const registry = {
    get: sinon.stub().returns(TestWidget),
}

test.beforeEach('reset registry stub', () => {
    registry.get.reset()
})

test('should render a component matching given type', t => {
    const widget = {
        type:   'test_widget',
        x:      '0%',
        y:      '0%',
        width:  '50%',
        height: '50%',
    }

    const wrapper = shallow(
        <Widget
            {...widget}
            subscribeToApi={noop}
            apiData={{}}
            registry={registry}
        />
    )

    t.true(registry.get.called)
    t.true(registry.get.calledWithExactly(widget.type))
    const widgetContainer = wrapper.find('.widget')
    t.is(widgetContainer.children().length, 1)
})

test('should only pass extra props to created component', t => {
    const widget = {
        type:   'test_widget',
        x:      '0%',
        y:      '0%',
        width:  '50%',
        height: '50%',
        extra:  'extra_test',
    }

    const wrapper = shallow(
        <Widget
            {...widget}
            subscribeToApi={noop}
            apiData={{}}
            registry={registry}
        />
    )

    const widgetContainer = wrapper.find('.widget')
    t.is(widgetContainer.children().length, 1)
    t.deepEqual(widgetContainer.children().at(0).props(), { extra: widget.extra })
})

test('should add a custom css class for widget type', t => {
    const widget = {
        type:   'test_widget.test',
        x:      '0%',
        y:      '0%',
        width:  '50%',
        height: '50%',
        extra:  'extra_test',
    }

    const wrapper = shallow(
        <Widget
            {...widget}
            subscribeToApi={noop}
            apiData={{}}
            registry={registry}
        />
    )

    const widgetContainer = wrapper.find('.widget')
    t.regex(widgetContainer.prop('className'), /test-widget__test/)
})
