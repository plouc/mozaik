const test      = require('ava')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should remove a registered client from the current list', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({ id: 'test_client' })
    t.truthy(bus.listClients().test_client)

    bus.removeClient('test_client')
    t.falsy(bus.listClients().test_client)

    t.true(logger.info.calledTwice)
    t.is(logger.info.getCall(0).args[0], 'Client #test_client connected')
    t.is(logger.info.getCall(1).args[0], 'Client #test_client disconnected')
})

test('should cleanup subscription and remove timer if no clients left', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.addClient({
        id: 'test_client',
        emit() {},
    })
    t.truthy(bus.listClients().test_client)

    bus.registerApi('test_api', () => ({
        test() {}
    }))
    t.deepEqual(bus.listApis(), ['test_api'])

    bus.subscribe('test_client', { id: 'test_api.test' })

    const subscriptions = bus.listSubscriptions()
    t.truthy(subscriptions['test_api.test'])
    t.truthy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, ['test_client'])

    bus.removeClient('test_client')
    t.falsy(subscriptions['test_api.test'].timer)
    t.deepEqual(subscriptions['test_api.test'].clients, [])
})
