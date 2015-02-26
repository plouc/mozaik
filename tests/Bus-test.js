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
    });
});