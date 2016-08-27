const test      = require('ava')
const sinon     = require('sinon')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')
require('sinon-as-promised')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should log api call', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    return bus.processApiCall('test_api.test_method', () => {}).then(() => {
        t.true(logger.info.calledOnce)
        t.is(logger.info.getCall(0).args[0], `Calling 'test_api.test_method'`)
    })
})

test('should support calling apis which return promises', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    const apiStub   = sinon.stub().resolves('test')
    const apiParams = { param: 'param' }

    return bus.processApiCall('test_api.test_method', apiStub, apiParams).then(message => {
        t.true(apiStub.calledOnce, 'should have called the given api method')
        t.deepEqual(apiStub.getCall(0).args[0], apiParams)
        t.deepEqual(message, {
            id:   'test_api.test_method',
            data: 'test',
        })
    })
})

test('should support calling apis which does not return promises', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    const apiStub   = sinon.stub().returns('test')
    const apiParams = { param: 'param' }

    return bus.processApiCall('test_api.test_method', apiStub, apiParams).then(message => {
        t.true(apiStub.calledOnce, 'should have called the given api method')
        t.deepEqual(apiStub.getCall(0).args[0], apiParams)
        t.deepEqual(message, {
            id:   'test_api.test_method',
            data: 'test',
        })
    })
})

test('should cache result', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.subscriptions['test_api.test_method'] = {}

    return bus.processApiCall('test_api.test_method', () => 'test').then(() => {
        t.truthy(bus.listSubscriptions()['test_api.test_method'].cached)
        t.deepEqual(bus.listSubscriptions()['test_api.test_method'].cached, {
            id:   'test_api.test_method',
            data: 'test',
        })
    })
})

test('should notify clients on success', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    const emitSpy = sinon.spy()
    bus.clients = {
        'test_client': { emit: emitSpy },
    }
    bus.subscriptions = {
        'test_api.test_method': {
            clients: ['test_client'],
        }
    }

    return bus.processApiCall('test_api.test_method', () => 'test').then(() => {
        t.true(emitSpy.calledOnce)
        t.deepEqual(emitSpy.getCall(0).args, [
            'api.data',
            {
                id:   'test_api.test_method',
                data: 'test',
            },
        ])
    })
})

test('should not notify clients on error and log error', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    const emitSpy = sinon.spy()
    bus.clients = {
        'test_client': { emit: emitSpy },
    }
    bus.subscriptions = {
        'test_api.test_method': {
            clients: ['test_client'],
        }
    }

    return bus.processApiCall('test_api.test_method', () => Promise.reject({ status: -1 })).then(() => {
        t.false(emitSpy.called)
        t.true(logger.error.calledOnce)
        t.is(logger.error.getCall(0).args[0], '[test_api] test_api.test_method - status code: -1')
    })
})
