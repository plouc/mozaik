declare var jest, it, expect, beforeAll

import chalk from 'chalk'
import Bus from '../src/bus'
import loggerMock from './logger'

beforeAll(() => {
    chalk.enabled = false
})

it('should make the API available', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => {})

    expect(bus.listApis()).toEqual(['test_api'])
    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith(`Registered API 'test_api' (mode: poll)`)
})

it('should throw if the API was already registered', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => {})

    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith(`Registered API 'test_api' (mode: poll)`)

    const expectedError = `API 'test_api' already registered`

    expect(() => {
        bus.registerApi('test_api', () => {})
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})

it(`should allow to set API mode to 'push'`, () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.registerApi('test_api', () => {}, 'push')

    expect(bus.listApis()).toEqual(['test_api'])
    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith(`Registered API 'test_api' (mode: push)`)
})

it('should throw if we pass an invalid API mode', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    const expectedError = `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`

    expect(() => {
        bus.registerApi('test_api', () => {}, 'invalid')
    }).toThrow(expectedError)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(expectedError)
})
