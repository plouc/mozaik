import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, WidgetHeader, WidgetBody, WidgetCounter } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

const stories = storiesOf('WidgetCounter', module)

stories.addDecorator(withMultiTheme)

stories.add('default', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" />
        <WidgetBody>
            <WidgetCounter count={132} />
        </WidgetBody>
    </Widget>
))

stories.add('with unit', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" />
        <WidgetBody>
            <WidgetCounter count={132} unit="unit" />
        </WidgetBody>
    </Widget>
))

stories.add('with pre label', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" title="with pre label" />
        <WidgetBody>
            <WidgetCounter count={132} preLabel="a label to show before count" />
        </WidgetBody>
    </Widget>
))

stories.add('with post label', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" title="with post label" />
        <WidgetBody>
            <WidgetCounter count={132} postLabel="a label to show after count" />
        </WidgetBody>
    </Widget>
))

stories.add('full featured', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" title="full featured" />
        <WidgetBody>
            <WidgetCounter
                count={132}
                unit="unit"
                preLabel="a label to show before count"
                postLabel="a label to show after count"
            />
        </WidgetBody>
    </Widget>
))

stories.add('align left', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" title="align left" />
        <WidgetBody>
            <WidgetCounter
                count={132}
                unit="unit"
                preLabel="a label to show before count"
                postLabel="a label to show after count"
                align="left"
            />
        </WidgetBody>
    </Widget>
))

stories.add('align right', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetCounter" title="align right" />
        <WidgetBody>
            <WidgetCounter
                count={132}
                unit="unit"
                preLabel="a label to show before count"
                postLabel="a label to show after count"
                align="right"
            />
        </WidgetBody>
    </Widget>
))

stories.add('headerless', () => (
    <Widget style={{ height: 260 }}>
        <WidgetBody isHeaderless={true}>
            <WidgetCounter
                count={132}
                unit="unit"
                preLabel="a label to show before count"
                postLabel="a label to show after count"
                align="left"
            />
        </WidgetBody>
    </Widget>
))
