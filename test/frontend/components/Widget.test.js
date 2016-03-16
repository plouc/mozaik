/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import sinon       from 'sinon';
import mockery     from 'mockery';


let Widget;
let componentRegistryStub;

describe('Mozaïk | Widget component', function () {
    this.timeout(5000);

    before(() => {
        mockery.enable({
            warnOnReplace:      false,
            warnOnUnregistered: false,
            useCleanCache:      true
        });

        componentRegistryStub = sinon.stub();
        componentRegistryStub.returns(() => {});

        mockery.registerMock('./../component-registry', {
            get: componentRegistryStub
        });

        Widget = require('../../../src/browser/components/Widget.jsx').default;
    });

    beforeEach(() => {
        componentRegistryStub.reset();
    });

    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should render a component matching given type', () => {
        const widget = {
            type:   'test_widget',
            x:      '0%',
            y:      '0%',
            width:  '50%',
            height: '50%'
        };

        const wrapper = shallow(<Widget {...widget} />);

        expect(componentRegistryStub.calledOnce).toEqual(true);
        expect(componentRegistryStub.calledWithExactly(widget.type)).toEqual(true);
        const widgetContainer = wrapper.find('.widget');
        expect(widgetContainer.children().length).toEqual(1);
    });

    it('should only pass extra props to created component', () => {
        const widget = {
            type:   'test_widget',
            x:      '0%',
            y:      '0%',
            width:  '50%',
            height: '50%',
            extra:  'extra_test'
        };

        const wrapper = shallow(<Widget {...widget} />);

        const widgetContainer = wrapper.find('.widget');
        expect(widgetContainer.children().length).toEqual(1);
        expect(widgetContainer.children().at(0).props()).toEqual({ extra: widget.extra });
    });

    it('should add a custom css class for widget type', () => {
        const widget = {
            type:   'test_widget.test',
            x:      '0%',
            y:      '0%',
            width:  '50%',
            height: '50%',
            extra:  'extra_test'
        };

        const wrapper = shallow(<Widget {...widget} />);

        const widgetContainer = wrapper.find('.widget');
        expect(widgetContainer.prop('className')).toContain('test-widget__test');
    });
});
