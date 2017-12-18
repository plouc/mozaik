'use strict'

const chalk = require('chalk')

const Bus = require('../bus')
const loggerMock = require('./logger')

jest.useFakeTimers()
const pollInterval = 100

beforeAll(() => {
    chalk.enabled = false
})

it('should log api call', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    expect.assertions(2)

    return bus.processApiCall('test_api.test_method', () => {}).then(() => {
        expect(logger.info).toHaveBeenCalled()
        expect(logger.info).toHaveBeenCalledWith(
            `Calling 'test_api.test_method'`
        )
    })
})

it('should support calling apis which return promises', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const apiMock = jest.fn(() => Promise.resolve('test'))
    const apiParams = { param: 'param' }

    expect.assertions(3)

    return bus
        .processApiCall('test_api.test_method', apiMock, apiParams)
        .then(message => {
            expect(apiMock).toHaveBeenCalled()
            expect(apiMock).toHaveBeenCalledWith(apiParams)
            expect(message).toEqual({
                id: 'test_api.test_method',
                data: 'test',
            })
        })
})

it('should support calling apis which does not return promises', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const apiMock = jest.fn(() => 'test')
    const apiParams = { param: 'param' }

    expect.assertions(3)

    return bus
        .processApiCall('test_api.test_method', apiMock, apiParams)
        .then(message => {
            expect(apiMock).toHaveBeenCalled()
            expect(apiMock).toHaveBeenCalledWith(apiParams)
            expect(message).toEqual({
                id: 'test_api.test_method',
                data: 'test',
            })
        })
})

it('should cache result', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.subscriptions['test_api.test_method'] = { clients: [] }

    expect.assertions(3)

    return bus.processApiCall('test_api.test_method', () => 'test').then(() => {
        const subscriptions = bus.listSubscriptions()
        expect(subscriptions['test_api.test_method']).not.toBeUndefined()
        expect(subscriptions['test_api.test_method']).toHaveProperty('cached')
        expect(subscriptions['test_api.test_method'].cached).toEqual({
            id: 'test_api.test_method',
            data: 'test',
        })
    })
})

it('should return cached data to the client when the API call returns no data', done => {
    const logger = loggerMock()
    const bus = new Bus({ logger, pollInterval })
    const apiData = { test: true }

    bus.subscriptions['test_api.test_method'] = { clients: [] }
    bus.processApiCall('test_api.test_method', () => apiData) // Hydrate cache

    bus.registerApi('test_api', () => ({ test_method: () => undefined }))
    
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
    bus.subscribe('test_client', { id: 'test_api.test_method' })
})

it('should return cached data to the client when the API call fails', done => {
    const logger = loggerMock()
    const bus = new Bus({ logger, pollInterval })
    const apiData = { test: true }

    bus.subscriptions['test_api.test_method'] = { clients: [] }
    bus.processApiCall('test_api.test_method', () => apiData) // Hydrate cache

    bus.registerApi('test_api', () => ({
        test_method: () => Promise.reject('Test error')
    }))

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
    bus.subscribe('test_client', { id: 'test_api.test_method' })
})

it('should notify clients on success', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const emitMock = jest.fn()
    bus.clients = {
        test_client: { emit: emitMock },
    }
    bus.subscriptions = {
        'test_api.test_method': {
            clients: ['test_client'],
        },
    }

    expect.assertions(2)

    return bus.processApiCall('test_api.test_method', () => 'test').then(() => {
        expect(emitMock).toHaveBeenCalled()
        expect(emitMock).toHaveBeenCalledWith('api.data', {
            id: 'test_api.test_method',
            data: 'test',
        })
    })
})

it('should not notify clients on error and log error', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const emitMock = jest.fn()
    bus.clients = {
        test_client: { emit: emitMock },
    }
    bus.subscriptions = {
        'test_api.test_method': {
            clients: ['test_client'],
        },
    }

    expect.assertions(4)

    return bus
        .processApiCall('test_api.test_method', () =>
            Promise.reject({ status: -1 })
        )
        .then(() => {
            expect(emitMock).toHaveBeenCalledTimes(1)
            expect(emitMock).toHaveBeenCalledWith('api.error', {
                data: { message: undefined },
                id: 'test_api.test_method',
            })
            expect(logger.error).toHaveBeenCalled()
            expect(logger.error).toHaveBeenCalledWith(
                '[test_api] test_api.test_method - status code: -1'
            )
        })
})
