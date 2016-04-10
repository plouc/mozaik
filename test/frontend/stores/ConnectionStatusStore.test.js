/* global describe it */
import _                     from 'lodash';
import expect                from 'expect';
import sinon                 from 'sinon';
import { expectTriggers }    from '../../helpers/storeHelper';
import { getFakeTimerCount } from '../../helpers/timersHelper';


let clock;
let triggerSpy;
let ConnectionStatusStore;


describe('Mozaïk | ConnectionStatusStore', () => {
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        ConnectionStatusStore = require('../../../src/browser/stores/ConnectionStatusStore').default;
        triggerSpy = sinon.spy();
        ConnectionStatusStore.trigger = triggerSpy;
        ConnectionStatusStore.reset();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('setStatus()', () => {
        it('should trigger with given status', () => {
            ConnectionStatusStore.setStatus('foo');

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('foo');
                }
            ]);
        });

        it('should clear existing countdown', () => {
            ConnectionStatusStore.delaying(0, 5);

            expect(getFakeTimerCount(clock)).toEqual(1);

            ConnectionStatusStore.setStatus('bar');

            expect(getFakeTimerCount(clock)).toEqual(0);
        });
    });

    describe('connecting()', () => {
        it(`should trigger with a 'connecting' status`, () => {
            ConnectionStatusStore.connecting();

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('connecting');
                }
            ]);
        });
    });

    describe('connected()', () => {
        it(`should trigger with a 'connected' status`, () => {
            ConnectionStatusStore.connected();

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('connected');
                }
            ]);
        });
    });

    describe('disconnected()', () => {
        it(`should trigger with a 'disconnected' status`, () => {
            ConnectionStatusStore.disconnected();

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('disconnected');
                }
            ]);
        });
    });

    describe('delaying()', () => {
        it(`should trigger with a 'delaying' status`, () => {
            ConnectionStatusStore.delaying();

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('delaying');
                }
            ]);
        });

        it(`should trigger with a 'retry' and 'countdown'`, () => {
            ConnectionStatusStore.delaying(2, 3);

            expectTriggers(triggerSpy, [
                ({ retry, countdown }) => {
                    expect(retry).toEqual(2);
                    expect(countdown).toEqual(3);
                }
            ]);
        });

        it(`should create a 'countdown' interval`, () => {
            ConnectionStatusStore.delaying(2, 3);

            expectTriggers(triggerSpy, ['skip']);
            expect(getFakeTimerCount(clock)).toEqual(1);

            clock.tick(1000);

            expectTriggers(triggerSpy, [
                'skip',
                ({ countdown }) => {
                    expect(countdown).toEqual(2);
                }
            ]);
        });

        it(`should not create a 'countdown' interval if delay is 0`, () => {
            ConnectionStatusStore.delaying(2, 0);

            expectTriggers(triggerSpy, ['skip']);
            expect(getFakeTimerCount(clock)).toEqual(0);
        });
    });

    describe('failed()', () => {
        it(`should trigger with a 'failed' status`, () => {
            ConnectionStatusStore.failed();

            expectTriggers(triggerSpy, [
                ({ status }) => {
                    expect(status).toEqual('failed');
                }
            ]);
        });

        it('should trigger with the number of connection attempts', () => {
            ConnectionStatusStore.failed(3);

            expectTriggers(triggerSpy, [
                ({ retry }) => {
                    expect(retry).toEqual(3);
                }
            ]);
        });
    });
});