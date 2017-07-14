'use strict'

const chalk = require('chalk')

const Bus = require('../bus')
const loggerMock = require('./logger')

beforeAll(() => {
    chalk.enabled = false
})

it('clientCount() should return the number of connected clients', () => {
    const logger = loggerMock()
    const bus = new Bus({ logger })

    expect(bus.clientCount()).toBe(0)

    bus.addClient({ id: 'client_a' })
    bus.addClient({ id: 'client_b' })
    bus.addClient({ id: 'client_c' })

    expect(bus.clientCount()).toBe(3)
})
