'use strict'

const chalk = require('chalk')

const Bus = require('../bus')
const loggerMock = require('./logger')

beforeAll(() => {
    chalk.enabled = false
})

it('should warn if the client does not exist', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.unsubscribe('invalid', 'invalid')

    expect(logger.warn).toHaveBeenCalled()
    expect(logger.warn).toHaveBeenCalledWith(
        `unable to unsubscribe from 'invalid', client with id 'invalid' does not exist`
    )
})

it('should warn if the subscription does not exist', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.clients = { test_client: {} }
    bus.unsubscribe('test_client', 'invalid')

    expect(logger.warn).toHaveBeenCalled()
    expect(logger.warn).toHaveBeenCalledWith(
        `unable to unsubscribe from 'invalid', subscription does not exist`
    )
})

it('should remove client from subscription', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.clients = { test_client: {} }
    bus.subscriptions = {
        test_subscription: {
            clients: ['test_client', 'other_client'],
        },
    }
    bus.unsubscribe('test_client', 'test_subscription')

    const subscriptions = bus.listSubscriptions()
    expect(subscriptions).toHaveProperty('test_subscription')
    expect(subscriptions.test_subscription).toEqual({
        clients: ['other_client'],
    })
})

it('should remove subscription if no more client left', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.clients = { test_client: {} }
    bus.subscriptions = {
        test_subscription: {
            clients: ['test_client'],
            timer: true,
        },
    }

    bus.unsubscribe('test_client', 'test_subscription')

    const subscriptions = bus.listSubscriptions()
    expect(subscriptions).toEqual({})
})
