'use strict'

const chalk = require('chalk')

const Bus = require('../bus')
const loggerMock = require('./logger')

beforeAll(() => {
    chalk.enabled = false
})

it('should add a client to the current list', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    expect(bus.listClients()).toHaveProperty('test_client')

    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('Client #test_client connected')
})

it('should throw if a client with the same id already exists', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    expect(() => {
        bus.addClient({ id: 'test_client' })
    }).toThrow(`Client with id 'test_client' already exists`)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(`Client with id 'test_client' already exists`)
})
