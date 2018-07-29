import React from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, WidgetHeader, WidgetBody, WidgetStatusBadge, InfoIcon } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

const stories = storiesOf('WidgetStatusBadge', module)

stories.addDecorator(withMultiTheme)

stories.add('default', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="default" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge />
        </WidgetBody>
    </Widget>
))

stories.add('success', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="success" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="success" />
        </WidgetBody>
    </Widget>
))

stories.add('warning', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="warning" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="warning" />
        </WidgetBody>
    </Widget>
))

stories.add('error', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="error" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="error" />
        </WidgetBody>
    </Widget>
))

stories.add('with message', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="with message" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="success" message="message content" />
        </WidgetBody>
    </Widget>
))

stories.add('with meta', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="with meta" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="success" meta="meta content" />
        </WidgetBody>
    </Widget>
))

stories.add('full featured', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetStatusBadge" title="full featured" icon={InfoIcon} />
        <WidgetBody>
            <WidgetStatusBadge status="success" message="message content" meta="meta content" />
        </WidgetBody>
    </Widget>
))
