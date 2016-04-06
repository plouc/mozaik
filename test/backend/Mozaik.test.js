/* global describe it */
import expect  from 'expect';
import mockery from 'mockery';


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

        Mozaik = require('../../src/Mozaik').default;
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