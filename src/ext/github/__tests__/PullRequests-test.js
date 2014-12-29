jest.dontMock('./../components/PullRequests.jsx');

var React, TestUtils, PullRequests, pullRequests;

describe('Github — PullRequests', function () {

    beforeEach(function () {
        React        = require('react/addons');
        TestUtils    = React.addons.TestUtils;
        PullRequests = require('./../components/PullRequests.jsx');
        pullRequests = TestUtils.renderIntoDocument(<PullRequests repository="plouc/mozaik" />);
    });


    it('should return correct api request', function () {
        expect(pullRequests.getApiRequest()).toEqual({
            id: 'github.pullRequests.plouc/mozaik',
            params: {
                repository: 'plouc/mozaik'
            }
        });
    });


    it('should display 0 count by default', function () {
        var count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('0');
    });


    it('will update with given array of pull requests', function () {
        pullRequests.setState({
            pullRequests: [
                {
                    id: 0,
                    title: 'PR-0',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 1,
                    title: 'PR-1',
                    user: {
                        avatar_url: 0
                    }
                },
                {
                    id: 2,
                    title: 'PR-2',
                    user: {
                        avatar_url: 0
                    }
                }
            ]
        });

        var count = TestUtils.findRenderedDOMComponentWithClass(pullRequests, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('3');
    });
});