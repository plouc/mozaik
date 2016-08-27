const test      = require('ava')
const sinon     = require('sinon')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')
require('sinon-as-promised')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should log an error if there is no existing client having given id', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })
    const apiSpy = { fetch: sinon.spy() }

    bus.registerApi('test_api', () => apiSpy)

    bus.subscribe('test_client', { id: 'test_api.fetch' })

    const expectedError = `Unable to find a client with id 'test_client'`

    t.false(apiSpy.fetch.called)
    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], expectedError)
})

test('should throw and log an error if the request id is invalid', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })
    const apiSpy = { fetch: sinon.spy() }

    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({ id: 'test_client' })

    const expectedError = `Invalid subscription id 'test_api', should be something like 'api_id.method'`

    t.throws(() => {
        bus.subscribe('test_client', { id: 'test_api' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], expectedError)
})

test('should throw and log an error if there is no existing api for given request id', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })
    const apiSpy = { fetch: sinon.spy() }

    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({ id: 'test_client' })

    const expectedError = `Unable to find API matching id 'invalid_api'`

    t.throws(() => {
        bus.subscribe('test_client', { id: 'invalid_api.invalid_method' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], expectedError)
})

test('should throw and log an error if the api method does not exists', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })
    const apiSpy = { fetch: sinon.spy() }

    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({ id: 'test_client' })

    const expectedError = `Unable to find API method matching 'invalid_method'`

    t.throws(() => {
        bus.subscribe('test_client', { id: 'test_api.invalid_method' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], expectedError)
})

test('should throw and log an error if the api method is not a function', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => ({ method: 'method' }))

    bus.addClient({ id: 'test_client' })

    const expectedError = `API method 'test_api.method' MUST be a function`

    t.throws(() => {
        bus.subscribe('test_client', { id: 'test_api.method' })
    }, expectedError)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], expectedError)
})

test(`should immediately call the api if there's no matching subscription`, t => {
    const logger  = getLogger()
    const bus     = new Bus({ logger })
    const apiStub = sinon.stub()

    bus.registerApi('test_api', () => ({
        fetch: apiStub,
    }))

    bus.addClient({
        id:   'test_client',
        emit: () => {},
    })

    bus.subscribe('test_client', { id: 'test_api.fetch', params: 'lol' })

    t.true(apiStub.calledOnce)
})

/*
test(`clientSubscription() should create a timer if there's no matching subscription`, t => {
    const apiData = { test: true }

    thenStub  = sinon.stub()
    catchStub = sinon.stub()
    apiStub   = sinon.stub().returns({ then: thenStub })
    thenStub.yields(apiData).returns({ 'catch': catchStub })
    bus.registerApi('test_api', () => ({ fetch: apiStub }))

    clientSpy = { send: sinon.spy() }
    bus.addClient(clientSpy, 'test_client')

    bus.clientSubscription('test_client', { id: 'test_api.fetch' })

    clock.tick(15000)

    t.is(apiStub.callCount, 2, 'API method should have been called')
    t.is(clientSpy.send.callCount, 2, 'API data should have been sent to the client')
    t.true(clientSpy.send.alwaysCalledWith(JSON.stringify({
        id:   'test_api.fetch',
        body: apiData,
    })))

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.fetch'])
    t.truthy(subscriptions['test_api.fetch'].timer)
})

test(`clientSubscription() should create a producer if there's no matching subscription and API mode is 'push'`, t => {
    apiSpy = sinon.spy()
    bus.registerApi('test_api', () => ({ push: apiSpy }), 'push')

    clientSpy = { send: sinon.spy() }
    bus.addClient(clientSpy, 'test_client')

    bus.clientSubscription('test_client', { id: 'test_api.push' })

    t.true(apiSpy.calledOnce, 'API method should have been called')

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.push'])
    //t.truthy(subscriptions['test_api.push'].timer)
})
*/

test('should not add the same client id twice to the subscription client list', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => ({ push: () => {} }), 'push')
    bus.addClient({ id: 'test_client', emit() {} })
    bus.subscribe('test_client', { id: 'test_api.push' })

    let subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.push'])
    t.deepEqual(subscriptions['test_api.push'].clients, ['test_client'])

    bus.subscribe('test_client', { id: 'test_api.push' })

    subscriptions = bus.listSubscriptions()
    t.deepEqual(subscriptions['test_api.push'].clients, ['test_client'])
})
