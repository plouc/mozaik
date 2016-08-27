const test      = require('ava')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')
require('sinon-as-promised')


test.before('disable chalk', () => {
    chalk.enabled = false
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
