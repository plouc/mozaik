import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { setOptions } from '@storybook/addon-options'

setOptions({
    name: '@mozaik/ui',
    downPanelInRight: true,
})

addDecorator(withKnobs)

function loadStories() {
    require('../stories/text.js')
    require('../stories/widget_header')
    require('../stories/widget_label')
    require('../stories/widget_list_item')
    require('../stories/widget_counter')
}

configure(loadStories, module)
