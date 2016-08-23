import test          from 'ava'
import React         from 'react'
import { shallow }   from 'enzyme'
import InspectorItem from '../../../src/ui/components/InspectorItem'


test('should render given count, label and icon', t => {
    const itemData = {
        label: 'test label',
        count: 13,
        icon:  'check'
    }

    const wrapper = shallow(
        <InspectorItem
            label={itemData.label}
            count={itemData.count}
            icon={itemData.icon}
        />
    )

    t.is(wrapper.find('.label').text(), itemData.label)
    t.is(wrapper.find('.label__addon').at(0).text(), `${itemData.count}`)
    t.regex(wrapper.find('.label__addon').at(1).childAt(0).prop('className'), new RegExp(`fa-${itemData.icon}`))
})

test('should not render count if none given', t => {
    const itemData = {
        label: 'test label',
        icon:  'check'
    }

    const wrapper = shallow(
        <InspectorItem
            label={itemData.label}
            icon={itemData.icon}
        />
    )

    t.is(wrapper.find('.label__addon').length, 1)
    t.regex(wrapper.find('.label__addon').at(0).childAt(0).prop('className'), new RegExp(`fa-${itemData.icon}`))
})
