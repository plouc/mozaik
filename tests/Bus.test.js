import should  from 'should';
import sinon   from 'sinon';
import mockery from 'mockery';

const sandbox = sinon.sandbox.create();
var mockedMozaik;
var Bus, bus;


describe('Bus', () => {
    before(() => {
        mockery.enable();
    });

    beforeEach(() => {
        mockedMozaik = {
            logger: {
                info:  sinon.spy(),
                error: sinon.spy()
            }
        };

        mockery.registerAllowables([
            'lodash',
            '../src/Bus',
            './chalk-mock'
        ]);
        mockery.registerMock('chalk', require('./chalk-mock'));
        Bus = require('../src/Bus');
        bus = new Bus(mockedMozaik);
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
        mockery.deregisterAll();
    });

    after(() => {
        mockery.disable();
    });


    describe('.registerApi()', () => {

        it('should make the API available', () => {
            bus.registerApi('test_api', () => { });
            bus.listApis().should.eql(['test_api']);

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('registered API "test_api"');
        });

        it('should throw if the API was already registered', () => {
            bus.registerApi('test', () => { });

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('registered API "test"');

            (function () {
                bus.registerApi('test', () => { });
            }).should.throw();

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('API "test" already registered');
        });
    });


    describe('.addClient()', function () {
        it('should add a client to the current list', () => {
            bus.addClient({}, 'test_client');

            bus.clients.should.have.property('test_client');

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Client #test_client connected');
        });

        it('should throw if a client with the same id already exists', () => {
            bus.addClient({}, 'test_client');
            (() => {
                bus.addClient({}, 'test_client');
            }).should.throw('Client with id "test_client" already exists');
        });
    });


    describe('.removeClient()', () => {
        it('should remove a registered client from the current list', () => {
            bus.addClient({}, 'test_client');
            bus.clients.should.have.property('test_client');

            bus.removeClient('test_client');
            bus.clients.should.not.have.property('test_client');

            mockedMozaik.logger.info.calledTwice.should.be.eql(true, 'should have called logger.info() twice');
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Client #test_client connected');
            mockedMozaik.logger.info.getCall(1).args[0].should.eql('Client #test_client disconnected');
        });

        it('should cleanup subscription and remove interval', () => {

        });
    });


    describe('.clientSubscription()', () => {
        var apiSpy;

        it('should log an error if there is no existing client having given id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.clientSubscription('test_client');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find a client with id "test_client"');
        });

        it('should throw and log an error if the request id is invalid', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            (() => {
                bus.clientSubscription('test_client', { id: 'test_api' });
            }).should.throw('Invalid request id "test_api", should be something like \'api_id.method\'');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Invalid request id "test_api", should be something like \'api_id.method\'');
        });

        it('should throw and log an error if there is no existing api for given request id', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            (() => {
                bus.clientSubscription('test_client', { id: 'invalid_api.invalid_method' });
            }).should.throw('Unable to find API matching id "invalid_api"');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find API matching id "invalid_api"');
        });

        it('should throw and log an error if the api method does not exists', () => {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', () => apiSpy);

            bus.addClient({}, 'test_client');

            (() => {
                bus.clientSubscription('test_client', { id: 'test_api.invalid_method' });
            }).should.throw('Unable to find API method matching "invalid_method"');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find API method matching "invalid_method"');
        });
    });


    describe('.processApiCall()', () => {
        var api_stub;
        var then_stub, catch_stub;
        var api_params;

        it('should log api call', () => {
            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            bus.processApiCall('test_api.test_method', api_stub);

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Calling "test_api.test_method"');
        });

        it('should call api', () => {
            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            api_params = { api_param: 'api_param' };

            bus.processApiCall('test_api.test_method', api_stub, api_params);

            api_stub.calledOnce.should.eql(true, 'should have called the given api method');
            api_stub.getCall(0).args[0].should.eql(api_params);
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

            bus.subscriptions['test_api.test_method'].should.have.property('cached');
            bus.subscriptions['test_api.test_method'].cached.should.eql({
                id:   'test_api.test_method',
                body: 'sample_data'
            });
        });

        it('should log error when the api call result in an error', () => {

        });
    });
});