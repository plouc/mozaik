/* global describe it */
import expect  from 'expect';
import sinon   from 'sinon';
import mockery from 'mockery';

const sandbox = sinon.sandbox.create();
let mockedMozaik;
let Bus, bus;


describe('Mozaïk | Bus', () => {
    before(() => {
        mockery.enable({
            warnOnReplace:      false,
            warnOnUnregistered: false
        });
    });

    beforeEach(() => {
        mockery.registerMock('chalk', require('./chalk-mock'));

        mockedMozaik = {
            logger: {
                info:  sinon.spy(),
                error: sinon.spy()
            }
        };

        Bus = require('../../src/Bus').default;
        bus = new Bus(mockedMozaik);
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
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
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('registered API "test_api"');
        });

        it('should throw if the API was already registered', () => {
            bus.registerApi('test', () => { });

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('registered API "test"');

            expect(() => {
                bus.registerApi('test', () => { });
            }).toThrow('API "test" already registered');

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('API "test" already registered');
        });
    });


    describe('addClient()',  () => {
        it('should add a client to the current list', () => {
            bus.addClient({}, 'test_client');

            expect(bus.clients['test_client']).toExist(`'test_client' has not been added to the client list`);

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('Client #test_client connected');
        });

        it('should throw if a client with the same id already exists', () => {
            bus.addClient({}, 'test_client');

            expect(() => {
                bus.addClient({}, 'test_client');
            }).toThrow('Client with id "test_client" already exists');

            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('Client with id "test_client" already exists');
        });
    });


    describe('removeClient()', () => {
        it('should remove a registered client from the current list', () => {
            bus.addClient({}, 'test_client');
            expect(bus.clients['test_client']).toExist();

            bus.removeClient('test_client');
            expect(bus.clients['test_client']).toNotExist();

            expect(mockedMozaik.logger.info.calledTwice).toEqual(true, 'logger.info() have not been called  twice');
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('Client #test_client connected');
            expect(mockedMozaik.logger.info.getCall(1).args[0]).toEqual('Client #test_client disconnected');
        });

        it('should cleanup subscription and remove interval', () => {

        });
    });


    describe('clientSubscription()', () => {
        let apiSpy;

        it('should log an error if there is no existing client having given id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.clientSubscription('test_client');

            expect(apiSpy.fetch.called).toEqual(false);
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('Unable to find a client with id "test_client"');
        });

        it('should throw and log an error if the request id is invalid', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            expect(() => {
                bus.clientSubscription('test_client', { id: 'test_api' });
            }).toThrow(`Invalid request id "test_api", should be something like 'api_id.method'`);

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('Invalid request id "test_api", should be something like \'api_id.method\'');
        });

        it('should throw and log an error if there is no existing api for given request id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            expect(() => {
                bus.clientSubscription('test_client', { id: 'invalid_api.invalid_method' });
            }).toThrow('Unable to find API matching id "invalid_api"');

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('Unable to find API matching id "invalid_api"');
        });

        it('should throw and log an error if the api method does not exists', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            expect(() => {
                bus.clientSubscription('test_client', { id: 'test_api.invalid_method' });
            }).toThrow('Unable to find API method matching "invalid_method"');

            expect(apiSpy.fetch.called).toEqual(false, 'Api method should not be called');
            expect(mockedMozaik.logger.error.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.error.getCall(0).args[0]).toEqual('Unable to find API method matching "invalid_method"');
        });
    });


    describe('processApiCall()', () => {
        let api_stub;
        let then_stub, catch_stub;
        let api_params;

        it('should log api call', () => {
            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            bus.processApiCall('test_api.test_method', api_stub);

            expect(mockedMozaik.logger.info.calledOnce).toEqual(true);
            expect(mockedMozaik.logger.info.getCall(0).args[0]).toEqual('Calling "test_api.test_method"');
        });

        it('should call api', () => {
            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            api_params = { api_param: 'api_param' };

            bus.processApiCall('test_api.test_method', api_stub, api_params);

            expect(api_stub.calledOnce).toEqual(true, 'should have called the given api method');
            expect(api_stub.getCall(0).args[0]).toEqual(api_params);
        });

        it('should cache result', () => {
            bus.subscriptions['test_api.test_method'] = {
                clients: []
            };

            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.yields('sample_data').returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            bus.processApiCall('test_api.test_method', api_stub);

            expect(bus.subscriptions['test_api.test_method'].cached).toExist;
            expect(bus.subscriptions['test_api.test_method'].cached).toEqual({
                id:   'test_api.test_method',
                body: 'sample_data'
            });
        });

        it('should log error when the api call result in an error', () => {

        });
    });
});