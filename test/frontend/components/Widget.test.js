/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import sinon       from 'sinon';
import mockery     from 'mockery';


let Widget;
let componentRegistryStub;

describe('Widget component', () => {
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

    it(`should render as many widgets as the 'dashboard.widgets' prop have`, () => {
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
        //const widgets = wrapper.find(Widget);
        //expect(widgets.length).toEqual(dashboard.widgets.length);
    });
});
