jest.dontMock('./../components/UserBadge.jsx');

describe('Github — UserBadge', function () {

    it('display user name', function () {
        var React     = require('react/addons');
        var UserBadge = require('./../components/UserBadge.jsx');
        var TestUtils = React.addons.TestUtils;

        var user = 'plouc';

        var userBadge = TestUtils.renderIntoDocument(
            <UserBadge user={user} />
        );
    });
});