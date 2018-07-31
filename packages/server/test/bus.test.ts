declare var jest, beforeAll, it, expect

import chalk from 'chalk'
import { Socket } from 'socket.io'
import Bus from '../src/bus'
import loggerMock from './logger'

beforeAll(() => {
    chalk.enabled = false
})

it('clientCount() should return the number of connected clients', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    expect(bus.clientCount()).toBe(0)

    bus.addClient({ id: 'client_a' } as Socket)
    bus.addClient({ id: 'client_b' } as Socket)
    bus.addClient({ id: 'client_c' } as Socket)

    expect(bus.clientCount()).toBe(3)
})
