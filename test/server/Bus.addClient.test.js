const test      = require('ava')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should add a client to the current list', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    t.truthy(bus.listClients().test_client)

    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], 'Client #test_client connected')
})

test('should throw if a client with the same id already exists', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })

    t.throws(() => {
        bus.addClient({ id: 'test_client' })
    }, `Client with id 'test_client' already exists`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `Client with id 'test_client' already exists`)
})
