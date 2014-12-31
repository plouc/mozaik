jest.dontMock('./../components/UserBadge.jsx');

var React, TestUtils, UserBadge, userBadge;

describe('Github — UserBadge', function () {

    beforeEach(function () {
        React        = require('react/addons');
        TestUtils    = React.addons.TestUtils;
        UserBadge = require('./../components/UserBadge.jsx');
        userBadge = TestUtils.renderIntoDocument(<UserBadge user="plouc" />);
    });


    it('should return correct api request', function () {
        expect(userBadge.getApiRequest()).toEqual({
            id: 'github.user.plouc',
            params: {
                user: 'plouc'
            }
        });
    });


    it('display user name', function () {
        var username = TestUtils.findRenderedDOMComponentWithClass(userBadge, 'widget__header');
        expect(username.getDOMNode().textContent).toEqual('plouc github user');
    });
});