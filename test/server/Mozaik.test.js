const test    = require('ava')
const mockery = require('mockery')


let Mozaik


test.before('Enable mockery', () => {
    mockery.enable({
        warnOnReplace:      false,
        warnOnUnregistered: false,
    })
})

test.beforeEach('Register mocks', () => {
    mockery.registerMock('chalk',   require('./chalk-mock'))
    mockery.registerMock('winston', {
        info() {}
    })

    Mozaik = require('../../src/server/Mozaik')
})

test.afterEach('Deregister all mocks', () => {
    mockery.deregisterAll()
})

test.after('Disable mockery', () => {
    mockery.disable()
})

test('constructor() should fill config defaults', t => {
    const mozaik = new Mozaik({
        host: 'test.local',
        port: 5000
    })

    t.deepEqual(mozaik.config, {
        host:             'test.local',
        port:             5000,
        apisPollInterval: 15000,
        appTitle:         'Mozaïk',
        assetsBaseUrl:    '',
        useWssConnection: false
    })
})
