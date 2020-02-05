import 'jest'

import chalk from 'chalk'
import Bus, { PollMode } from '../src/bus'
import loggerMock from './logger'
import { Socket } from 'socket.io'

jest.useFakeTimers()

beforeEach(() => {
    chalk.enabled = false
    ;(setInterval as any).mockClear()
})

it('should log an error if there is no existing client having given id', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.subscribe('test_client', { id: 'test_api.fetch', clients: [] })

    expect(apiMock.fetch).not.toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(`Unable to find a client with id 'test_client'`)
})

it('should throw and log an error if the request id is invalid', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' } as Socket)

    const expectedError = `Invalid subscription id 'test_api', should be something like 'api_id.method'`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api', clients: [] })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if there is no existing api for given request id', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' } as Socket)

    const expectedError = `Unable to find API matching id 'invalid_api'`

    expect(() => {
        bus.subscribe('test_client', { id: 'invalid_api.invalid_method', clients: [] })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if the api method does not exists', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }

    bus.registerApi('test_api', () => apiMock)
    bus.addClient({ id: 'test_client' } as Socket)

    const expectedError = `Unable to find API method matching 'invalid_method'`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api.invalid_method', clients: [] })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it('should throw and log an error if the api method is not a function', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => ({ method: 'method' }))
    bus.addClient({ id: 'test_client' } as Socket)

    const expectedError = `API method 'test_api.method' MUST be a function`

    expect(() => {
        bus.subscribe('test_client', { id: 'test_api.method', clients: [] })
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it(`should immediately call the api if there's no matching subscription`, () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })
    const apiMock = { fetch: jest.fn() }
    const clientMock = ({ id: 'test_client', emit: jest.fn() } as unknown) as Socket

    bus.registerApi('test_api', () => apiMock)
    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.fetch', params: 'arg0', clients: [] })

    expect(apiMock.fetch).toHaveBeenCalled()
    expect(apiMock.fetch).toHaveBeenCalledWith('arg0')
})

it(`should create a timer if there's no matching subscription`, () => {
    const apiData = { test: true }
    const apiMock = {
        fetch: jest.fn(() => ({
            then: jest.fn(fn => {
                fn(apiData)
            }),
        })),
    }
    const clientMock = ({ id: 'test_client', emit: jest.fn() } as unknown) as Socket
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => apiMock)
    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.fetch', clients: [] })

    expect(logger.error).not.toHaveBeenCalled()

    expect((setInterval as any).mock.calls.length).toBe(1)
    expect((setInterval as any).mock.calls[0][1]).toBe(15000)

    jest.runTimersToTime(15000)

    expect(logger.info).toHaveBeenCalledTimes(6)
    expect(logger.info).toHaveBeenCalledWith(`Registered API 'test_api' (mode: poll)`)
    expect(logger.info).toHaveBeenCalledWith(`Client #test_client connected`)
    expect(logger.info).toHaveBeenCalledWith(`Added subscription 'test_api.fetch'`)
    expect(logger.info).toHaveBeenCalledWith(`Calling 'test_api.fetch'`)
    expect(logger.info).toHaveBeenCalledWith(`Creating scheduler for subscription 'test_api.fetch'`)

    expect(apiMock.fetch).toHaveBeenCalledTimes(2)
    // expect(clientMock.emit).toHaveBeenCalled()
    // expect(clientMock.emit).toHaveBeenCalledWith('api.data', undefined)
})

it(`should create a producer if there's no matching subscription and API mode is 'push'`, () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const pushMock = jest.fn()
    const clientMock = ({ id: 'test_client', emit: jest.fn() } as unknown) as Socket

    bus.registerApi('test_api', () => ({ push: pushMock }), PollMode.Push)
    bus.addClient(clientMock)
    bus.subscribe('test_client', { id: 'test_api.push', params: 'arg0', clients: [] })

    expect(pushMock).toHaveBeenCalled()

    const subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push']).not.toBeUndefined()
    expect(subscriptions['test_api.push'].timer).toBeUndefined()

    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith(`Creating producer for 'test_api.push'`)
})

it('should not add the same client id twice to the subscription client list', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => ({ push: () => {} }), PollMode.Push)
    bus.addClient(({ id: 'test_client', emit() {} } as unknown) as Socket)
    bus.subscribe('test_client', { id: 'test_api.push', clients: [] })

    let subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push']).not.toBeUndefined()
    expect(subscriptions['test_api.push'].clients).toEqual(['test_client'])

    bus.subscribe('test_client', { id: 'test_api.push', clients: [] })

    subscriptions = bus.listSubscriptions()
    expect(subscriptions['test_api.push'].clients).toEqual(['test_client'])
})
