/* global describe it */
const expect  = require('expect')
const mockery = require('mockery')


let Mozaik;


describe('Mozaïk | Mozaik', () => {
    before(() => {
        mockery.enable({
            warnOnReplace:      false,
            warnOnUnregistered: false
        });
    });

    beforeEach(() => {
        mockery.registerMock('chalk',   require('./chalk-mock'));
        mockery.registerMock('winston', {
            info() {}
        });

        Mozaik = require('../../src/server/Mozaik');
    });

    afterEach(() => {
        mockery.deregisterAll();
    });

    after(() => {
        mockery.disable();
    });

    describe('constructor()', () => {
        it('should fill config defaults', () => {
            const mozaik = new Mozaik({
                host: 'test.local',
                port: 5000
            });

            expect(mozaik.config).toEqual({
                host:             'test.local',
                port:             5000,
                apisPollInterval: 15000,
                appTitle:         'Mozaïk',
                assetsBaseUrl:    '',
                useWssConnection: false
            });
        });
    });
});