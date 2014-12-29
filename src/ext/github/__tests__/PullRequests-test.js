jest.dontMock('./../components/PullRequests.jsx');

describe('Github — PullRequests', function () {

    it('will update with given array of pull requests', function () {
        var React        = require('react/addons');
        var PullRequests = require('./../components/PullRequests.jsx');
        var TestUtils    = React.addons.TestUtils;

        var pullRequests = TestUtils.renderIntoDocument(
            <PullRequests />
        );

        var count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('0');
    });
});