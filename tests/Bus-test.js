var should  = require('should');
var sinon   = require('sinon');
var mockery = require('mockery');

var sandbox = sinon.sandbox.create();
var mockedMozaik;
var Bus, bus;


describe('Bus', function () {

    before(function () {
        mockery.enable();
    });

    beforeEach(function () {
        mockedMozaik = {
            logger: {
                info:  sinon.spy(),
                error: sinon.spy()
            }
        };

        mockery.registerAllowables([
            'lodash',
            '../lib/Bus',
            './chalk-mock'
        ]);
        mockery.registerMock('chalk', require('./chalk-mock'));
        Bus = require('../lib/Bus');
        bus = new Bus(mockedMozaik);
    });

    afterEach(function () {
        sandbox.verifyAndRestore();
        mockery.deregisterAll();
    });

    after(function () {
        mockery.disable();
    });


    describe('.registerApi()', function () {

        it('should make the API available', function () {
            bus.registerApi('test_api', function () { });
            bus.listApis().should.eql(['test_api']);

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('registered API "test_api"');
        });

        it('should throw if the API was already registered', function () {
            bus.registerApi('test', function () { });

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('registered API "test"');

            (function () {
                bus.registerApi('test', function () { });
            }).should.throw();

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('API "test" already registered');
        });
    });


    describe('.addClient()', function () {
        it('should add a client to the current list', function () {
            bus.addClient({}, 'test_client');

            bus.clients.should.have.property('test_client');

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Client #test_client connected');
        });

        it('should throw if a client with the same id already exists', function () {
            bus.addClient({}, 'test_client');
            (function () {
                bus.addClient({}, 'test_client');
            }).should.throw('Client with id "test_client" already exists');
        });
    });


    describe('.removeClient()', function () {
        it('should remove a registered client from the current list', function () {
            bus.addClient({}, 'test_client');
            bus.clients.should.have.property('test_client');

            bus.removeClient('test_client');
            bus.clients.should.not.have.property('test_client');

            mockedMozaik.logger.info.calledTwice.should.be.eql(true, 'should have called logger.info() twice');
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Client #test_client connected');
            mockedMozaik.logger.info.getCall(1).args[0].should.eql('Client #test_client disconnected');
        });

        it('should cleanup subscription and remove interval', function () {

        });
    });


    describe('.clientSubscription()', function () {
        var apiSpy;

        it('should log an error if there is no existing client having given id', function () {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', function () { return apiSpy });

            bus.clientSubscription('test_client');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find a client with id "test_client"');
        });

        it('should throw and log an error if the request id is invalid', function () {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', function () { return apiSpy });

            bus.addClient({}, 'test_client');

            (function () {
                bus.clientSubscription('test_client', { id: 'test_api' });
            }).should.throw('Invalid request id "test_api", should be something like \'api_id.method\'');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Invalid request id "test_api", should be something like \'api_id.method\'');
        });

        it('should throw and log an error if there is no existing api for given request id', function () {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', function () { return apiSpy });

            bus.addClient({}, 'test_client');

            (function () {
                bus.clientSubscription('test_client', { id: 'invalid_api.invalid_method' });
            }).should.throw('Unable to find API matching id "invalid_api"');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find API matching id "invalid_api"');
        });

        it('should throw and log an error if the api method does not exists', function () {
            apiSpy = { fetch: sinon.spy() };
            bus.registerApi('test_api', function () { return apiSpy });

            bus.addClient({}, 'test_client');

            (function () {
                bus.clientSubscription('test_client', { id: 'test_api.invalid_method' });
            }).should.throw('Unable to find API method matching "invalid_method"');

            apiSpy.fetch.notCalled.should.eql(true, 'Api method should not be called');

            mockedMozaik.logger.error.calledOnce.should.be.true;
            mockedMozaik.logger.error.getCall(0).args[0].should.eql('Unable to find API method matching "invalid_method"');
        });
    });


    describe('.processApiCall()', function () {
        var api_stub;
        var then_stub, catch_stub;
        var api_params;

        it('should log api call', function () {
            api_stub   = sinon.stub();
            then_stub  = sinon.stub();
            catch_stub = sinon.stub();

            then_stub.returns({ 'catch': catch_stub });
            api_stub.returns({ then: then_stub });

            bus.processApiCall('test_api.test_method', api_stub);

            mockedMozaik.logger.info.calledOnce.should.be.true;
            mockedMozaik.logger.info.getCall(0).args[0].should.eql('Calling "test_api.test_method"');
        });

        it('should call api', function () {
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

        it('should cache result', function () {
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

        it('should log error when the api call result in an error', function () {

        });
    });
});