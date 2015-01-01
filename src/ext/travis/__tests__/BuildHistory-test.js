jest.dontMock('./../components/BuildHistory.jsx');
jest.dontMock('./../components/BuildHistoryItem.jsx');

var React, TestUtils, BuildHistory, buildHistory;

var sampleBuilds = [
    {
        id: 2,
        number: '2',
        state: 'passed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 2'
        }
    },
    {
        id: 1,
        number: '1',
        state: 'passed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 1'
        }
    },
    {
        id: 0,
        number: '0',
        state: 'failed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 0'
        }
    }
];

describe('Travis — BuildHistory', function () {

    beforeEach(function () {
        React        = require('react/addons');
        TestUtils    = React.addons.TestUtils;
        BuildHistory = require('./../components/BuildHistory.jsx');
        buildHistory = TestUtils.renderIntoDocument(<BuildHistory owner="plouc" repository="mozaik" />);
    });


    it('should return correct api request', function () {
        expect(buildHistory.getApiRequest()).toEqual({
            id: 'travis.buildHistory.plouc.mozaik',
            params: {
                owner:      'plouc',
                repository: 'mozaik'
            }
        });
    });


    it('should display repository slug in header', function () {
        var header = TestUtils.findRenderedDOMComponentWithClass(buildHistory, 'widget__header');
        expect(header.getDOMNode().textContent).toEqual('plouc/mozaik build history');
    });


    it('should display builds info', function () {
        buildHistory.setState({
            builds: sampleBuilds
        });

        var builds = TestUtils.scryRenderedDOMComponentsWithClass(buildHistory, 'list__item');

        expect(builds.length).toEqual(3);

        sampleBuilds.forEach(function (build, i) {
            expect(builds[i].getDOMNode().textContent).toContain('#' + build.number + ' ' + build.commit.message);
        });
    });
});