jest.dontMock('./../components/Repository.jsx');

var React, TestUtils, Repository, repository;

describe('Travis — Repository', function () {

    beforeEach(function () {
        React      = require('react/addons');
        TestUtils  = React.addons.TestUtils;
        Repository = require('./../components/Repository.jsx');
        repository = TestUtils.renderIntoDocument(<Repository owner="plouc" repository="mozaik" />);
    });


    it('should display repository info', function () {
        var header = TestUtils.findRenderedDOMComponentWithClass(repository, 'widget__header');
        expect(header.getDOMNode().textContent).toEqual('');

        repository.setState({
            repository: {
                id:                     3637580,
                slug:                   'plouc/mozaik',
                description:            'Mozaïk is a tool based on nodejs / reactjs to easily build beautiful dashboards',
                last_build_id:          45344564,
                last_build_number:      '6',
                last_build_state:       'passed',
                last_build_duration:    53,
                last_build_language:    null,
                last_build_started_at:  '2014-12-29T11:33:09Z',
                last_build_finished_at: '2014-12-29T11:34:02Z',
                github_language:        'JavaScript'
            }
        });

        expect(header.getDOMNode().textContent).toEqual('plouc/mozaik');
    });
});