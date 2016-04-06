/* global describe it */
import React         from 'react';
import { shallow }   from 'enzyme';
import expect        from 'expect';
import InspectorItem from '../../../src/browser/components/InspectorItem.jsx';


describe('Mozaïk | InspectorItem component', () => {
    it('should render given count, label and icon', () => {
        const itemData = {
            label: 'test label',
            count: 13,
            icon:  'check'
        };

        const wrapper = shallow(
            <InspectorItem
                label={itemData.label}
                count={itemData.count}
                icon={itemData.icon}
            />
        );

        expect(wrapper.find('.label').text()).toEqual(itemData.label);
        expect(wrapper.find('.label__addon').at(0).text()).toEqual(`${itemData.count}`);
        expect(wrapper.find('.label__addon').at(1).childAt(0).prop('className')).toContain(`fa-${itemData.icon}`);
    });

    it('should not render count if none given', () => {
        const itemData = {
            label: 'test label',
            icon:  'check'
        };

        const wrapper = shallow(
            <InspectorItem
                label={itemData.label}
                icon={itemData.icon}
            />
        );

        expect(wrapper.find('.label__addon').length).toEqual(1);
        expect(wrapper.find('.label__addon').at(0).childAt(0).prop('className')).toContain(`fa-${itemData.icon}`);
    });
});
