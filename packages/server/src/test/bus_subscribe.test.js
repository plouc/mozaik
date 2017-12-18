'use strict'

const chalk = require('chalk')

const Bus = require('../bus')
const loggerMock = require('./logger')

jest.useFakeTimers()
const pollInterval = 100

beforeEach(() => {
    chalk.enabled = false
    setInterval.mockClear()
})

it('should log an error if there is no existing client having given id', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.subscribe('test_client', { id: 'test_api.fetch' })

    expect(apiMock.fetch).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(
        `Unable to find a client with id 'test_client'`
    )
})

it('should throw and log an error if the request id is invalid', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' })

    const expectedError = `Invalid subscription id 'test_api', should be something like 'api_id.method'`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api' })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if there is no existing api for given request id', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' })

    const expectedError = `Unable to find API matching id 'invalid_api'`

    expect(() => {
        bus.subscribe('test_client', { id: 'invalid_api.invalid_method' })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if the api method does not exists', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' })

    const expectedError = `Unable to find API method matching 'invalid_method'`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api.invalid_method' })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if the api method is not a function', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => ({ method: 'method' }))
    bus.addClient({ id: 'test_client' })

    const expectedError = `API method 'test_api.method' MUST be a function`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api.method' })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it(`should immediately call the api if there's no matching subscription`, () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }
    const clientMock = { id: 'test_client', emit: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.fetch', params: 'arg0' })

    expect(apiMock.fetch).toHaveBeenCalled()
    expect(apiMock.fetch).toHaveBeenCalledWith('arg0')
})

it(`should create a timer if there's no matching subscription`, done => {
    const apiData = { test: true }
    const apiMock = {
        fetch: jest.fn(() => ({
            then: jest.fn(fn => {
                fn(apiData)
            }),
        })),
    }
    const logger = loggerMock()
    const bus = new Bus({ logger, pollInterval })
    bus.registerApi('test_api', () => apiMock)

    let receivedInitialCall = false
    const clientMock = { id: 'test_client', emit: (type, message) => {
        if (!receivedInitialCall) {
            receivedInitialCall = true
            jest.runTimersToTime(pollInterval)
            return
        }
        expect(type).toBe('api.data')
        expect(message.data).toBe(apiData)
        done()
    }}

    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.fetch' })
})

it(`should create a producer if there's no matching subscription and API mode is 'push'`, () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const pushMock = jest.fn()
    const clientMock = { id: 'test_client', emit: jest.fn() }

    bus.registerApi('test_api', () => ({ push: pushMock }), 'push')
    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.push', params: 'arg0' })

    expect(pushMock).toHaveBeenCalled()

    const subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push']).not.toBeUndefined()
    expect(subscriptions['test_api.push'].timer).toBeUndefined()

    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith(
        `Creating producer for 'test_api.push'`
    )
})

it('should not add the same client id twice to the subscription client list', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => ({ push: () => {} }), 'push')
    bus.addClient({ id: 'test_client', emit() {} })
    bus.subscribe('test_client', { id: 'test_api.push' })

    let subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push']).not.toBeUndefined()
    expect(subscriptions['test_api.push'].clients).toEqual(['test_client'])

    bus.subscribe('test_client', { id: 'test_api.push' })

    subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push'].clients).toEqual(['test_client'])
})
