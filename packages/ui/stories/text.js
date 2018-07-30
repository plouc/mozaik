import React from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, Text, WidgetHeader, WidgetBody } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

const stories = storiesOf('Text', module)

stories.addDecorator(withMultiTheme)

stories.add('default', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="default" />
        <WidgetBody>
            <div>
                <Text>default default variant span</Text>
            </div>
            <div>
                <Text tag="div">
                    default default variant div
                    <br />
                    with multiline text
                </Text>
            </div>
            <div>
                <Text variant="strong">default strong variant</Text>
            </div>
            <div>
                <Text tag="div" variant="strong">
                    default strong variant div
                    <br />
                    with multiline text
                </Text>
            </div>
            <div>
                <Text variant="small">default small variant</Text>
            </div>
            <div>
                <Text tag="div" variant="small">
                    default small variant div
                    <br />
                    with multiline text
                </Text>
            </div>
        </WidgetBody>
    </Widget>
))

stories.add('display', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="display" />
        <WidgetBody>
            <div>
                <Text type="display">display default variant</Text>
            </div>
            <div>
                <Text type="display" variant="strong">
                    display strong variant
                </Text>
            </div>
            <div>
                <Text type="display" variant="small">
                    display small variant
                </Text>
            </div>
        </WidgetBody>
    </Widget>
))

stories.add('mono', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="mono" />
        <WidgetBody>
            <div>
                <Text type="mono">mono default variant</Text>
            </div>
            <div>
                <Text type="mono" variant="strong">
                    mono strong variant
                </Text>
            </div>
            <div>
                <Text type="mono" variant="small">
                    mono small variant
                </Text>
            </div>
        </WidgetBody>
    </Widget>
))
