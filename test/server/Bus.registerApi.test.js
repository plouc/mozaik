const test      = require('ava')
const Bus       = require('../../src/server/Bus')
const chalk     = require('chalk')
const getLogger = require('./getLogger')


test.before('disable chalk', () => {
    chalk.enabled = false
})


test('should make the API available', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { })

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)
})

test('should throw if the API was already registered', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { })

    t.true(logger.info.calledOnce, true)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: poll)`)

    t.throws(() => {
        bus.registerApi('test_api', () => { })
    }, `API 'test_api' already registered`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `API 'test_api' already registered`)
})

test(`should allow to set API mode to 'push'`, t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    bus.registerApi('test_api', () => { }, 'push')

    t.deepEqual(bus.listApis(), ['test_api'])
    t.true(logger.info.calledOnce)
    t.is(logger.info.getCall(0).args[0], `registered API 'test_api' (mode: push)`)
})

test('should throw if we pass an invalid API mode', t => {
    const logger = getLogger()
    const bus    = new Bus({ logger })

    t.throws(() => {
        bus.registerApi('test_api', () => { }, 'invalid')
    }, `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)

    t.true(logger.error.calledOnce)
    t.is(logger.error.getCall(0).args[0], `API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`)
})
