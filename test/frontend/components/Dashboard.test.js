/* global describe it */
import React       from 'react';
import { shallow } from 'enzyme';
import expect      from 'expect';
import _           from 'lodash';
import Widget      from '../../../src/browser/components/Widget.jsx';
import Dashboard   from '../../../src/browser/components/Dashboard.jsx';


describe('Mozaïk | Dashboard component', () => {
    it(`should render as many widgets as the 'dashboard.widgets' prop have`, () => {
        const dashboard = {
            index:   0,
            columns: 3,
            rows:    2,
            widgets: [
                { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
                { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
                { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 }
            ]
        };
        const wrapper = shallow(<Dashboard dashboard={dashboard} />);

        const widgets = wrapper.find(Widget);
        expect(widgets.length).toEqual(dashboard.widgets.length);
    });

    it('should convert position and sizing to percent based values', () => {
        const dashboard = {
            index:   0,
            columns: 2,
            rows:    2,
            widgets: [
                { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
                { type: 'test_widget', x: 1, y: 0, columns: 1, rows: 2 }
            ]
        };
        const expectedWidgetsValues = [
            { x: '0%',  y: '0%', width: '50%', height: '100%' },
            { x: '50%', y: '0%', width: '50%', height: '100%' }
        ];

        const wrapper = shallow(<Dashboard dashboard={dashboard} />);

        const widgets = wrapper.find(Widget);
        expectedWidgetsValues.forEach((expectedWidgetValues, index) => {
            _.forOwn(expectedWidgetValues, (propValue, propKey) => {
                expect(widgets.at(index).prop(propKey)).toEqual(propValue);
            });
        });
    });

    it('should not pass down widget columns/rows values', () => {
        const dashboard = {
            index:   0,
            columns: 2,
            rows:    2,
            widgets: [
                { type: 'test_widget', x: 0, y: 0, columns: 1, rows: 2 },
                { type: 'test_widget', x: 1, y: 0, columns: 1, rows: 2 }
            ]
        };

        const wrapper = shallow(<Dashboard dashboard={dashboard} />);

        const widgets = wrapper.find(Widget);
        dashboard.widgets.forEach((widget, index) => {
            expect(widgets.at(index).prop('columns')).toNotExist();
            expect(widgets.at(index).prop('rows')).toNotExist();
        });
    });

    it(`should add extra class if 'isCurrent' is true`, () => {
        const dashboard = {
            index:   0,
            columns: 2,
            rows:    2,
            widgets: []
        };

        const wrapper = shallow(<Dashboard dashboard={dashboard} />);

        expect(wrapper.prop('className')).toNotContain('_is-current');
        wrapper.setState({ isCurrent: true });
        expect(wrapper.prop('className')).toContain('_is-current');
    });
});
