/* global describe it */
import expect  from 'expect';
import sinon   from 'sinon';
import mockery from 'mockery';
import Promise from 'bluebird';

const sandbox = sinon.sandbox.create();
let mockedMozaik;
let Bus, bus;
let clock;
let apiStub;
let thenStub, catchStub;
let apiParams;
let apiSpy;
let clientSpy;


describe('Mozaïk | Bus', () => {
    before(() => {
        mockery.enable({
            warnOnReplace:      false,
            warnOnUnregistered: false
        });
    });

    beforeEach(() => {
        mockery.registerMock('chalk', require('./chalk-mock'));

        clock = sinon.useFakeTimers();

        mockedMozaik = {
            logger: {
                info:  sinon.spy(),
                error: sinon.spy()
            },
            config: {
                apisPollInterval: 15000
            }
        };

        Bus = require('../../src/Bus').default;
        bus = Bus(mockedMozaik);
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
        clock.restore();
        mockery.deregisterAll();
    });

    after(() => {
        mockery.disable();
    });


    describe('registerApi()', () => {
        it('should make the API available', () => {
            bus.registerApi('test_api', () => { });

            expect(bus.listApis()).toEqual(['test_api']);
            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual(`registered API 'test_api' (mode: poll)`);
        });

        it('should throw if the API was already registered', () => {
            bus.registerApi('test_api', () => { });

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual(`registered API 'test_api' (mode: poll)`);

            expect(() => {
                bus.registerApi('test_api', () => { });
            }).toThrow(`API 'test_api' already registered`);

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(`API 'test_api' already registered`);
        });

        it(`should allow to set API mode to 'push'`, () => {
            bus.registerApi('test_api', () => { }, 'push');

            expect(bus.listApis()).toEqual(['test_api']);
            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual(`registered API 'test_api' (mode: push)`);
        });

        it('should throw if we pass an invalid API mode', () => {
            expect(() => {
                bus.registerApi('test_api', () => { }, 'invalid');
            }).toThrow(`API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`);

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(`API mode 'invalid' is not a valid mode, must be one of 'poll' or 'push'`);

        });
    });


    describe('addClient()',  () => {
        it('should add a client to the current list', () => {
            bus.addClient({}, 'test_client');

            expect(bus.listClients()['test_client']).toExist(`'test_client' has not been added to the client list`);

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('Client #test_client connected');
        });

        it('should throw if a client with the same id already exists', () => {
            bus.addClient({}, 'test_client');

            expect(() => {
                bus.addClient({}, 'test_client');
            }).toThrow(`Client with id 'test_client' already exists`);

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(`Client with id 'test_client' already exists`);
        });
    });


    describe('removeClient()', () => {
        it('should remove a registered client from the current list', () => {
            bus.addClient({}, 'test_client');
            expect(bus.listClients()['test_client']).toExist();

            bus.removeClient('test_client');
            expect(bus.listClients()['test_client']).toNotExist();

            expect(mockedMozaik.logger.info.calledTwice).toEqual(true, 'logger.info() have not been called  twice');
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('Client #test_client connected');
            expect(mockedMozaik.logger.info.getCall(1).args[0]).toEqual('Client #test_client disconnected');
        });

        it('should cleanup subscription and remove timer if no clients left', () => {
            bus.addClient({ send() {} }, 'test_client');
            expect(bus.listClients()['test_client']).toExist();

            bus.registerApi('test_api', () => ({ test() {
                return Promise.resolve(true);
            }}));
            expect(bus.listApis()).toEqual(['test_api']);

            bus.clientSubscription('test_client', { id: 'test_api.test' });

            const subscriptions = bus.listSubscriptions();
            expect(subscriptions['test_api.test']).toExist();
            expect(subscriptions['test_api.test'].timer).toExist();
            expect(subscriptions['test_api.test'].clients).toEqual(['test_client']);

            bus.removeClient('test_client');
            expect(subscriptions['test_api.test'].timer).toNotExist();
            expect(subscriptions['test_api.test'].clients).toEqual([]);
        });
    });


    describe('clientSubscription()', () => {
        it('should log an error if there is no existing client having given id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.clientSubscription('test_client');

            const expectedError = `Unable to find a client with id 'test_client'`;

            expect(apiSpy.fetch.called).toEqual(false);
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(expectedError);
        });

        it('should throw and log an error if the request id is invalid', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            const expectedError = `Invalid request id 'test_api', should be something like 'api_id.method'`;

            expect(() => {
                bus.clientSubscription('test_client', { id: 'test_api' });
            }).toThrow(expectedError);

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(expectedError);
        });

        it('should throw and log an error if there is no existing api for given request id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            const expectedError = `Unable to find API matching id 'invalid_api'`;

            expect(() => {
                bus.clientSubscription('test_client', { id: 'invalid_api.invalid_method' });
            }).toThrow(expectedError);

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(expectedError);
        });

        it('should throw and log an error if the api method does not exists', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            const expectedError = `Unable to find API method matching 'invalid_method'`;

            expect(() => {
                bus.clientSubscription('test_client', { id: 'test_api.invalid_method' });
            }).toThrow(expectedError);

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(expectedError);
        });

        it('should throw and log an error if the api method is not a function', () => {
            bus.registerApi('test_api', () => ({ method: false }));

            bus.addClient({}, 'test_client');

            const expectedError = `API method 'test_api.method' MUST be a function`;

            expect(() => {
                bus.clientSubscription('test_client', { id: 'test_api.method' });
            }).toThrow(expectedError);

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual(expectedError);
        });

        it(`should immediately call the api if there's no matching subscription`, () => {
            const apiData = { test: true };

            thenStub  = sinon.stub();
            catchStub = sinon.stub();
            apiStub   = sinon.stub().returns({ then: thenStub });
            thenStub.yields(apiData).returns({ 'catch': catchStub });
            bus.registerApi('test_api', () => ({ fetch: apiStub }));

            clientSpy = { send: sinon.spy() };
            bus.addClient(clientSpy, 'test_client');

            bus.clientSubscription('test_client', { id: 'test_api.fetch' });

            expect(apiStub.calledOnce).toEqual(true, 'API method should have been called');
            expect(clientSpy.send.calledOnce).toEqual(true, 'API data should have been sent to the client');
            expect(clientSpy.send.getCall(0).args[0]).toEqual(JSON.stringify({
                id:   'test_api.fetch',
                body: apiData
            }));
        });

        it(`should create a timer if there's no matching subscription`, () => {
            const apiData = { test: true };

            thenStub  = sinon.stub();
            catchStub = sinon.stub();
            apiStub   = sinon.stub().returns({ then: thenStub });
            thenStub.yields(apiData).returns({ 'catch': catchStub });
            bus.registerApi('test_api', () => ({ fetch: apiStub }));

            clientSpy = { send: sinon.spy() };
            bus.addClient(clientSpy, 'test_client');

            bus.clientSubscription('test_client', { id: 'test_api.fetch' });

            clock.tick(15000);

            expect(apiStub.callCount).toEqual(2, 'API method should have been called');
            expect(clientSpy.send.callCount).toEqual(2, 'API data should have been sent to the client');
            expect(clientSpy.send.alwaysCalledWith(JSON.stringify({
                id:   'test_api.fetch',
                body: apiData
            }))).toEqual(true);

            const subscriptions = bus.listSubscriptions();
            expect(subscriptions['test_api.fetch']).toExist();
            expect(subscriptions['test_api.fetch'].timer).toExist();
        });

        it(`should create a producer if there's no matching subscription and API mode is 'push'`, () => {
            apiSpy = sinon.spy();
            bus.registerApi('test_api', () => ({ push: apiSpy }), 'push');

            clientSpy = { send: sinon.spy() };
            bus.addClient(clientSpy, 'test_client');

            bus.clientSubscription('test_client', { id: 'test_api.push' });

            expect(apiSpy.calledOnce).toEqual(true, 'API method should have been called');

            const subscriptions = bus.listSubscriptions();
            expect(subscriptions['test_api.push']).toExist();
            expect(subscriptions['test_api.push'].timer).toNotExist();
        });

        it('should not add the same client id twice to the subscription client list', () => {
            bus.registerApi('test_api', () => ({ push: () => {} }), 'push');
            bus.addClient({ send: () => {} }, 'test_client');
            bus.clientSubscription('test_client', { id: 'test_api.push' });

            const subscriptions = bus.listSubscriptions();
            expect(subscriptions['test_api.push']).toExist();
            expect(subscriptions['test_api.push'].clients).toEqual(['test_client']);

            bus.clientSubscription('test_client', { id: 'test_api.push' });
            expect(subscriptions['test_api.push'].clients).toEqual(['test_client']);
        });
    });


    describe('clientCount()', () => {
        it('should return the number of connected clients', () => {
            expect(bus.clientCount()).toEqual(0);

            bus.addClient({}, 'client_a');
            bus.addClient({}, 'client_b');
            bus.addClient({}, 'client_c');

            expect(bus.clientCount()).toEqual(3);
        });
    });


    describe('processApiCall()', () => {
        let api_params;

        it('should log api call', () => {
            apiStub   = sinon.stub();
            thenStub  = sinon.stub();
            catchStub = sinon.stub();

            thenStub.returns({ 'catch': catchStub });
            apiStub.returns({ then: thenStub });

            bus.processApiCall('test_api.test_method', apiStub);

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual(`Calling 'test_api.test_method'`);
        });

        it('should call api', () => {
            apiStub   = sinon.stub();
            thenStub  = sinon.stub();
            catchStub = sinon.stub();

            thenStub.returns({ 'catch': catchStub });
            apiStub.returns({ then: thenStub });

            api_params = { api_param: 'api_param' };

            bus.processApiCall('test_api.test_method', apiStub, api_params);

            expect(apiStub.calledOnce).toEqual(true, 'should have called the given api method');
            expect(apiStub.getCall(0).args[0]).toEqual(api_params);
        });

        it('should cache result', () => {
            bus.listSubscriptions()['test_api.test_method'] = {
                clients: []
            };

            apiStub   = sinon.stub();
            thenStub  = sinon.stub();
            catchStub = sinon.stub();

            thenStub.yields('sample_data').returns({ 'catch': catchStub });
            apiStub.returns({ then: thenStub });

            bus.processApiCall('test_api.test_method', apiStub);

            expect(bus.listSubscriptions()['test_api.test_method'].cached).toExist;
            expect(bus.listSubscriptions()['test_api.test_method'].cached).toEqual({
                id:   'test_api.test_method',
                body: 'sample_data'
            });
        });
    });
});