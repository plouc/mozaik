import React from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, WidgetHeader, WidgetBody } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

const stories = storiesOf('WidgetHeader', module)

stories.addDecorator(withMultiTheme)

stories.add('default', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="WidgetHeader title" />
        <WidgetBody>widget body</WidgetBody>
    </Widget>
))

stories.add('with count', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="WidgetHeader with count" count={13} />
        <WidgetBody>widget body</WidgetBody>
    </Widget>
))

stories.add('with subject', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="WidgetHeader with subject" subject="subject" />
        <WidgetBody>widget body</WidgetBody>
    </Widget>
))
