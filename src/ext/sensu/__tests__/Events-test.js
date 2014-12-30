jest.dontMock('./../components/Events.jsx');
jest.dontMock('./../components/Event.jsx');

var React, TestUtils, Events, events;

var sampleEvents = [
    {
        id: 0,
        client: {
            name: 'client 0'
        },
        check: {
            name:     'check 0',
            output:   'check output 0',
            executed: '',
            status:   0
        }
    },
    {
        id: 1,
        client: {
            name: 'client 1'
        },
        check: {
            name:     'check 1',
            output:   'check output 1',
            executed: '',
            status:   1
        }
    },
    {
        id: 2,
        client: {
            name: 'client 2'
        },
        check: {
            name:     'check 2',
            output:   'check output 2',
            executed: '',
            status:   2
        }
    }
];

describe('Sensu — Events', function () {

    beforeEach(function () {
        React     = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Events    = require('./../components/Events.jsx');
        events    = TestUtils.renderIntoDocument(<Events />);
    });


    it('should return correct api request', function () {
        expect(events.getApiRequest()).toEqual({
            id: 'sensu.events'
        });
    });


    it('should display 0 count by default', function () {
        var count = TestUtils.findRenderedDOMComponentWithClass(events, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('0');
    });


    it('will update with given array of pull requests', function () {
        events.setState({
            events: sampleEvents
        });

        var count = TestUtils.findRenderedDOMComponentWithClass(events, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('3');
    });
});