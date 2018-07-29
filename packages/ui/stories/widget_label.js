import React from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, WidgetHeader, WidgetBody, WidgetLabel } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

storiesOf('WidgetLabel', module)
    .addDecorator(withMultiTheme)
    .add('default', () => (
        <Widget style={{ height: 260 }}>
            <WidgetHeader title="WidgetLabel" />
            <WidgetBody>
                <div>
                    <WidgetLabel label="default" />
                </div>
                <div>
                    <WidgetLabel prefix="prefix" label="with prefix" />
                </div>
                <div>
                    <WidgetLabel label="with suffix" suffix="suffix" />
                </div>
                <div>
                    <WidgetLabel prefix="prefix" label="with prefix & suffix" suffix="suffix" />
                </div>
            </WidgetBody>
        </Widget>
    ))
