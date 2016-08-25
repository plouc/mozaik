const test    = require('ava')
const sinon   = require('sinon')
const mockery = require('mockery')
const Bus     = require('../../src/server/Bus')
const chalk   = require('chalk')
require('sinon-as-promised')

const getLogger = () => ({
    info:  sinon.spy(),
    error: sinon.spy(),
    warn:  sinon.spy(),
})

test.before('disable chalk', () => {
    chalk.enabled = false
})


test('registerApi() should make the API available', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { })

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)
})

test('registerApi() should throw if the API was already registered', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { })

    t.true(logger.info.calledOnce, true)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)

    t.throws(() => {
        bus.registerApi('test_api', () => { })
    }, `API 'test_api' already registered`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `API 'test_api' already registered`)
})

test(`registerApi() should allow to set API mode to 'push'`, t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { }, 'push')

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: push)`)
})

test('registerApi() should throw if we pass an invalid API mode', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    t.throws(() => {
        bus.registerApi('test_api', () => { }, 'invalid')
    }, `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)
})

test('addClient() should add a client to the current list', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    t.truthy(bus.listClients().test_client)

    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], 'Client #test_client connected')
})

test('addClient() should throw if a client with the same id already exists', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    t.throws(() => {
        bus.addClient({ id: 'test_client' })
    }, `Client with id 'test_client' already exists`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `Client with id 'test_client' already exists`)
})

test('removeClient() should remove a registered client from the current list', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })
    t.truthy(bus.listClients().test_client)

    bus.removeClient('test_client')
    t.falsy(bus.listClients().test_client)

    t.true(logger.info.calledTwice)
    t.is(logger.info.getCall(0).args[0], 'Client #test_client connected')
    t.is(logger.info.getCall(1).args[0], 'Client #test_client disconnected')
})

test('removeClient() should cleanup subscription and remove timer if no clients left', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({
        id: 'test_client',
        emit() {},
    })
    t.truthy(bus.listClients().test_client)

    bus.registerApi('test_api', () => ({
        test() {}
    }))
    t.deepEqual(bus.listApis(), ['test_api'])

    bus.subscribe('test_client', { id: 'test_api.test' })

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.test'])
    t.truthy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, ['test_client'])

    bus.removeClient('test_client')
    t.falsy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, [])
})

test('subscribe() should log an error if there is no existing client having given id', t => {
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

test('subscribe() should throw and log an error if the request id is invalid', t => {
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

test('subscribe() should throw and log an error if there is no existing api for given request id', t => {
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

test('subscribe() should throw and log an error if the api method does not exists', t => {
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

test('subscribe() should throw and log an error if the api method is not a function', t => {
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

test(`subscribe() should immediately call the api if there's no matching subscription`, t => {
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

test('subscribe() should not add the same client id twice to the subscription client list', t => {
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

test('clientCount() should return the number of connected clients', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    t.is(bus.clientCount(), 0)

    bus.addClient({ id: 'client_a' })
    bus.addClient({ id: 'client_b' })
    bus.addClient({ id: 'client_c' })

    t.is(bus.clientCount(), 3)
})

test('processApiCall() should log api call', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    return bus.processApiCall('test_api.test_method', () => {}).then(() => {
        t.true(logger.info.calledOnce)
        t.is(logger.info.getCall(0).args[0], `Calling 'test_api.test_method'`)
    })
})

test('processApiCall() should support calling apis which return promises', t => {
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

test('processApiCall() should support calling apis which does not return promises', t => {
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

test('processApiCall() should cache result', t => {
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

test('processApiCall() should notify clients on success', t => {
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

test('processApiCall() should not notify clients on error and log error', t => {
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
