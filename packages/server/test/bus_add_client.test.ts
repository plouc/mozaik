declare var jest, beforeAll, it, expect

import chalk from 'chalk'
import { Socket } from 'socket.io'
import Bus from '../src/bus'
import loggerMock from './logger'

beforeAll(() => {
    chalk.enabled = false
})

it('should add a client to the current list', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.addClient({ id: 'test_client' } as Socket)

    expect(bus.listClients()).toHaveProperty('test_client')

    expect(logger.info).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalledWith('Client #test_client connected')
})

it('should throw if a client with the same id already exists', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    bus.addClient({ id: 'test_client' } as Socket)

    expect(() => {
        bus.addClient({ id: 'test_client' } as Socket)
    }).toThrow(`Client with id 'test_client' already exists`)

    expect(logger.error).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalledWith(`Client with id 'test_client' already exists`)
})
