const test      = require('ava')
const sinon     = require('sinon')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')
require('sinon-as-promised')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should warn if the client does not exist', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.unsubscribe('invalid', 'invalid')

    t.true(logger.warn.calledOnce)
    t.is(logger.warn.getCall(0).args[0], `unable to unsubscribe from 'invalid', client with id 'invalid' does not exist`)
})

test('should warn if the subscription does not exist', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.clients = { 'test_client': {} }
    bus.unsubscribe('test_client', 'invalid')

    t.true(logger.warn.calledOnce)
    t.is(logger.warn.getCall(0).args[0], `unable to unsubscribe from 'invalid', subscription does not exist`)
})

test('should remove client from subscription', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.clients       = { 'test_client': {} }
    bus.subscriptions = {
        test_subscription: {
            clients: [
                'test_client',
                'other_client',
            ],
        },
    }

    bus.unsubscribe('test_client', 'test_subscription')

    t.truthy(bus.listSubscriptions().test_subscription)
    t.deepEqual(bus.listSubscriptions().test_subscription, {
        clients: ['other_client'],
    })
})

test('should remove subscription if no more client left', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.clients       = { 'test_client': {} }
    bus.subscriptions = {
        test_subscription: {
            clients: ['test_client'],
            timer:   true,
        },
    }

    bus.unsubscribe('test_client', 'test_subscription')

    t.deepEqual(bus.listSubscriptions(), {})
})
