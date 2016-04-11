/* global describe it */
import _                     from 'lodash';
import expect                from 'expect';
import sinon                 from 'sinon';
import { expectTriggers }    from '../../helpers/storeHelper';
import { getFakeTimerCount } from '../../helpers/timersHelper';


let clock;
let triggerSpy;
let ApiStore;
let wsStub;
let wsStubInstance;


describe('Mozaïk | ApiStore', () => {
    beforeEach(() => {
        clock = sinon.useFakeTimers();

        ApiStore = require('../../../src/browser/stores/ApiStore').default;

        triggerSpy = sinon.spy();
        ApiStore.trigger = triggerSpy;

        global.window = {
            document: {
                location: {
                    port:     '',
                    hostname: 'test.com'
                }
            }
        };

        wsStub = sinon.stub();
        wsStubInstance = {
            close() {},
            send: sinon.spy()
        };
        wsStub.returns(wsStubInstance);
        global.WebSocket = wsStub;

        ApiStore.reset();
    });

    afterEach(() => {
        clock.restore();
        delete global.window;
        delete global.WebSocket;
    });

    describe('initWs()', () => {
        it('should create a new ws connection', () => {
            ApiStore.initWs({});

            expect(wsStub.calledOnce).toEqual(true);
            expect(wsStub.getCall(0).args[0]).toEqual('ws://test.com');
        });

        it(`should create a new wss connection if 'useWssConnection' is true`, () => {
            ApiStore.initWs({ useWssConnection: true });

            expect(wsStub.calledOnce).toEqual(true);
            expect(wsStub.getCall(0).args[0]).toEqual('wss://test.com');
        });

        it(`should create a new ws on custom port if 'wsPort' defined`, () => {
            ApiStore.initWs({ wsPort: 2000 });

            expect(wsStub.calledOnce).toEqual(true);
            expect(wsStub.getCall(0).args[0]).toEqual('ws://test.com:2000');
        });

        it (`should not create a new ws if there's already one created`, () => {
            ApiStore.initWs({});
            ApiStore.initWs({});

            expect(wsStub.calledOnce).toEqual(true);
        });
    });

    describe('on ws message', () => {
        it('should trigger received data', () => {
            ApiStore.initWs({});

            const data = { foo: 'bar' };

            wsStubInstance.onmessage({ data: JSON.stringify(data) });

            expectTriggers(triggerSpy, [data]);
        });

        it('should not trigger if data is an empty string', () => {
            ApiStore.initWs({});

            wsStubInstance.onmessage({ data: '' });

            expect(triggerSpy.called).toEqual(false);
        });
    });

    describe('fetch', () => {
        it('should send request', () => {
            ApiStore.initWs({});
            ApiStore.fetch('foo');

            expect(wsStubInstance.send.calledOnce).toEqual(true);
            expect(wsStubInstance.send.getCall(0).args[0]).toEqual(JSON.stringify({
                id:     'foo',
                params: {}
            }));
        });

        it('should add request to history', () => {
            ApiStore.initWs({});
            ApiStore.fetch('foo');

            expect(ApiStore.getHistory()).toEqual([{
                id:     'foo',
                params: {}
            }]);
        });

        it('should add request to buffer if ws is null', () => {
            ApiStore.fetch('foo');

            expect(ApiStore.getBuffer()).toEqual([{
                id:     'foo',
                params: {}
            }]);
        });

        it('should add request to buffer if ws is not ready', () => {
            ApiStore.initWs({});
            wsStubInstance.readyState = 'not_ready';
            ApiStore.fetch('foo');

            expect(ApiStore.getBuffer()).toEqual([{
                id:     'foo',
                params: {}
            }]);
        });

        it('should not add request to buffer if ws not null and ready', () => {
            ApiStore.initWs({});
            ApiStore.fetch('foo');

            expect(ApiStore.getBuffer()).toEqual([]);
        });
    });

    describe('on ws close', () => {
        it('should try to reconnect 10 times each 15 seconds', () => {
            ApiStore.initWs({});

            for (let i = 0; i < 12; i++) {
                clock.tick(15000);
                wsStubInstance.onclose();
            }

            // 12th call ignored
            expect(wsStub.callCount).toEqual(11);
        });
    });
});
