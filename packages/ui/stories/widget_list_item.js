import React from 'react'
import { storiesOf } from '@storybook/react'
import { Widget, WidgetHeader, WidgetBody, WidgetListItem } from '../src'
import withMultiTheme from './decorators/withMultiTheme'

const stories = storiesOf('WidgetListItem', module)

stories.addDecorator(withMultiTheme)

stories.add('default', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem title="WidgetListItem title" />
            <WidgetListItem title="WidgetListItem title" />
            <WidgetListItem title="WidgetListItem title" />
        </WidgetBody>
    </Widget>
))

stories.add('with meta', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="with meta" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem title="WidgetListItem with meta" meta="WidgetListItem meta" />
            <WidgetListItem title="WidgetListItem with meta" meta="WidgetListItem meta" />
            <WidgetListItem title="WidgetListItem with meta" meta="WidgetListItem meta" />
        </WidgetBody>
    </Widget>
))

stories.add('with pre', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="with pre" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem title="WidgetListItem with pre" pre="YAY!" />
            <WidgetListItem title="WidgetListItem with pre" pre="YAY!" />
            <WidgetListItem title="WidgetListItem with pre" pre="YAY!" />
        </WidgetBody>
    </Widget>
))

stories.add('with post', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="with post" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem title="WidgetListItem with post" post="YAY!" />
            <WidgetListItem title="WidgetListItem with post" post="YAY!" />
            <WidgetListItem title="WidgetListItem with post" post="YAY!" />
        </WidgetBody>
    </Widget>
))

stories.add('full featured', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="full featured" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
            />
        </WidgetBody>
    </Widget>
))

stories.add('align top', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="align top" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="top"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="top"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="top"
            />
        </WidgetBody>
    </Widget>
))

stories.add('align bottom', () => (
    <Widget style={{ height: 260 }}>
        <WidgetHeader title="align bottom" subject="WidgetListItem" />
        <WidgetBody disablePadding={true}>
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="bottom"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="bottom"
            />
            <WidgetListItem
                title="WidgetListItem full featured"
                pre="pre"
                post="post"
                meta="sample meta content"
                align="bottom"
            />
        </WidgetBody>
    </Widget>
))
