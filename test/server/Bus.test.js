const test    = require('ava')
const sinon   = require('sinon')
const mockery = require('mockery')


const sandbox = sinon.sandbox.create()
let mockedMozaik
let Bus, bus
let clock
let apiStub
let thenStub, catchStub
let apiSpy
let clientSpy
let api_params


test.before('Enable mockery', () => {
    mockery.enable({
        warnOnReplace:      false,
        warnOnUnregistered: false,
    })
})

test.beforeEach('Register mocks', () => {
    mockery.registerMock('chalk', require('./chalk-mock'))

    clock = sinon.useFakeTimers()

    mockedMozaik = {
        logger: {
            info:  sinon.spy(),
            error: sinon.spy()
        },
        config: {
            apisPollInterval: 15000
        }
    }

    Bus = require('../../src/server/Bus')
    bus = Bus(mockedMozaik)
})

test.afterEach('Deregister mocks', () => {
    sandbox.verifyAndRestore()
    clock.restore()
    mockery.deregisterAll()
})

test.after('Disable mockery', () => {
    mockery.disable()
})

test('registerApi() should make the API available', t => {
    bus.registerApi('test_api', () => { })

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(mockedMozaik.logger.info.calledOnce)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)
})

test('registerApi() should throw if the API was already registered', t => {
    bus.registerApi('test_api', () => { })

    t.true(mockedMozaik.logger.info.calledOnce, true)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)

    t.throws(() => {
        bus.registerApi('test_api', () => { })
    }, `API 'test_api' already registered`)

    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], `API 'test_api' already registered`)
})

test(`registerApi() should allow to set API mode to 'push'`, t => {
    bus.registerApi('test_api', () => { }, 'push')

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(mockedMozaik.logger.info.calledOnce)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], `registered API 'test_api' (mode: push)`)
})

test('registerApi() should throw if we pass an invalid API mode', t => {
    t.throws(() => {
        bus.registerApi('test_api', () => { }, 'invalid')
    }, `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)

    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)
})

test('addClient() should add a client to the current list', t => {
    bus.addClient({}, 'test_client')

    t.truthy(bus.listClients().test_client)

    t.true(mockedMozaik.logger.info.calledOnce)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], 'Client #test_client connected')
})

test('addClient() should throw if a client with the same id already exists', t => {
    bus.addClient({}, 'test_client')

    t.throws(() => {
        bus.addClient({}, 'test_client')
    }, `Client with id 'test_client' already exists`)

    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], `Client with id 'test_client' already exists`)
})

test('removeClient() should remove a registered client from the current list', t => {
    bus.addClient({}, 'test_client')
    t.truthy(bus.listClients().test_client)

    bus.removeClient('test_client')
    t.falsy(bus.listClients().test_client)

    t.true(mockedMozaik.logger.info.calledTwice)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], 'Client #test_client connected')
    t.is(mockedMozaik.logger.info.getCall(1).args[0], 'Client #test_client disconnected')
})

test('removeClient() should cleanup subscription and remove timer if no clients left', t => {
    bus.addClient({ send() {} }, 'test_client')
    t.truthy(bus.listClients().test_client)

    bus.registerApi('test_api', () => ({ test() {
        return Promise.resolve(true)
    }}))
    t.deepEqual(bus.listApis(), ['test_api'])

    bus.clientSubscription('test_client', { id: 'test_api.test' })

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.test'])
    t.truthy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, ['test_client'])

    bus.removeClient('test_client')
    t.falsy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, [])
})

test('clientSubscription() should log an error if there is no existing client having given id', t => {
    apiSpy = { fetch: sinon.spy() }
    bus.registerApi('test_api', () => apiSpy)

    bus.clientSubscription('test_client')

    const expectedError = `Unable to find a client with id 'test_client'`

    t.false(apiSpy.fetch.called)
    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], expectedError)
})

test('clientSubscription() should throw and log an error if the request id is invalid', t => {
    apiSpy = { fetch: sinon.spy() }
    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({}, 'test_client')

    const expectedError = `Invalid request id 'test_api', should be something like 'api_id.method'`

    t.throws(() => {
        bus.clientSubscription('test_client', { id: 'test_api' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], expectedError)
})

test('clientSubscription() should throw and log an error if there is no existing api for given request id', t => {
    apiSpy = { fetch: sinon.spy() }
    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({}, 'test_client')

    const expectedError = `Unable to find API matching id 'invalid_api'`

    t.throws(() => {
        bus.clientSubscription('test_client', { id: 'invalid_api.invalid_method' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], expectedError)
})

test('clientSubscription() should throw and log an error if the api method does not exists', t => {
    apiSpy = { fetch: sinon.spy() }
    bus.registerApi('test_api', () => apiSpy)

    bus.addClient({}, 'test_client')

    const expectedError = `Unable to find API method matching 'invalid_method'`

    t.throws(() => {
        bus.clientSubscription('test_client', { id: 'test_api.invalid_method' })
    }, expectedError)

    t.false(apiSpy.fetch.called)
    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], expectedError)
})

test('clientSubscription() should throw and log an error if the api method is not a function', t => {
    bus.registerApi('test_api', () => ({ method: false }))

    bus.addClient({}, 'test_client')

    const expectedError = `API method 'test_api.method' MUST be a function`

    t.throws(() => {
        bus.clientSubscription('test_client', { id: 'test_api.method' })
    }, expectedError)

    t.true(mockedMozaik.logger.error.calledOnce)
    t.is(mockedMozaik.logger.error.getCall(0).args[0], expectedError)
})

test(`clientSubscription() should immediately call the api if there's no matching subscription`, t => {
    const apiData = { test: true }

    thenStub  = sinon.stub()
    catchStub = sinon.stub()
    apiStub   = sinon.stub().returns({ then: thenStub })
    thenStub.yields(apiData).returns({ 'catch': catchStub })
    bus.registerApi('test_api', () => ({ fetch: apiStub }))

    clientSpy = { send: sinon.spy() }
    bus.addClient(clientSpy, 'test_client')

    bus.clientSubscription('test_client', { id: 'test_api.fetch' })

    t.true(apiStub.calledOnce)
    t.true(clientSpy.send.calledOnce)
    t.is(clientSpy.send.getCall(0).args[0], JSON.stringify({
        id:   'test_api.fetch',
        body: apiData,
    }))
})

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

test('clientSubscription() should not add the same client id twice to the subscription client list', t => {
    bus.registerApi('test_api', () => ({ push: () => {} }), 'push')
    bus.addClient({ send: () => {} }, 'test_client')
    bus.clientSubscription('test_client', { id: 'test_api.push' })

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.push'])
    t.deepEqual(subscriptions['test_api.push'].clients, ['test_client'])

    bus.clientSubscription('test_client', { id: 'test_api.push' })
    t.deepEqual(subscriptions['test_api.push'].clients, ['test_client'])
})

test('clientCount() should return the number of connected clients', t => {
    t.is(bus.clientCount(), 0)

    bus.addClient({}, 'client_a')
    bus.addClient({}, 'client_b')
    bus.addClient({}, 'client_c')

    t.is(bus.clientCount(), 3)
})

test('processApiCall() should log api call', t => {
    apiStub   = sinon.stub()
    thenStub  = sinon.stub()
    catchStub = sinon.stub()

    thenStub.returns({ 'catch': catchStub })
    apiStub.returns({ then: thenStub })

    bus.processApiCall('test_api.test_method', apiStub)

    t.true(mockedMozaik.logger.info.calledOnce)
    t.is(mockedMozaik.logger.info.getCall(0).args[0], `Calling 'test_api.test_method'`)
})

test('processApiCall() should call api', t => {
    apiStub   = sinon.stub()
    thenStub  = sinon.stub()
    catchStub = sinon.stub()

    thenStub.returns({ 'catch': catchStub })
    apiStub.returns({ then: thenStub })

    api_params = { api_param: 'api_param' }

    bus.processApiCall('test_api.test_method', apiStub, api_params)

    t.true(apiStub.calledOnce, 'should have called the given api method')
    t.deepEqual(apiStub.getCall(0).args[0], api_params)
})

test('processApiCall() should cache result', t => {
    bus.listSubscriptions()['test_api.test_method'] = {
        clients: []
    }

    apiStub   = sinon.stub()
    thenStub  = sinon.stub()
    catchStub = sinon.stub()

    thenStub.yields('sample_data').returns({ 'catch': catchStub })
    apiStub.returns({ then: thenStub })

    bus.processApiCall('test_api.test_method', apiStub)

    t.truthy(bus.listSubscriptions()['test_api.test_method'].cached)
    t.deepEqual(bus.listSubscriptions()['test_api.test_method'].cached, {
        id:   'test_api.test_method',
        body: 'sample_data',
    })
})
