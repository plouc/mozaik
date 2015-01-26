jest.dontMock('./../components/View.jsx');
jest.dontMock('./../components/ViewJobs.jsx');
jest.dontMock('./../components/ViewJob.jsx');
jest.dontMock('./../components/ViewJobBuildDuration.jsx');
jest.dontMock('./../components/ViewJobBuildStatus.jsx');
jest.dontMock('./../components/ViewJobBuildTime.jsx');
jest.dontMock('./../components/ViewJobHealthReport.jsx');

var React, TestUtils, View, view, ViewJobBuildDuration, ViewJobBuildStatus, ViewJobBuildTime, ViewJobHealthReport;

var sampleView = {
    name: 'sample view',
    jobs: [
        {
            name: 'sample-job-0',
            displayName: 'sample-job-0',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        },
        {
            name: 'sample-job-1',
            displayName: 'sample-job-1',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        },
        {
            name: 'sample-job-2',
            displayName: 'sample-job-2',
            healthReport: [
                {
                    description: 'Build stability: No recent builds failed.'
                }
            ],
            lastBuild: {
                result: 'SUCCESS'
            }
        }
    ]
};

describe('Jenkins — View', function () {

    beforeEach(function () {
        React                = require('react/addons');
        TestUtils            = React.addons.TestUtils;
        ViewJobBuildDuration = require('./../components/ViewJobBuildDuration.jsx');
        ViewJobBuildStatus   = require('./../components/ViewJobBuildStatus.jsx');
        ViewJobBuildTime     = require('./../components/ViewJobBuildTime.jsx');
        ViewJobHealthReport  = require('./../components/ViewJobHealthReport.jsx');
        View                 = require('./../components/View.jsx');
    });


    it('should return correct api request', function () {
        view = TestUtils.renderIntoDocument(<View view="sample-view" />);
        expect(view.getApiRequest()).toEqual({
            id: 'jenkins.view.sample-view',
            params: {
                view: 'sample-view'
            }
        });
    });


    it ('should display title containing view name', function () {
        view = TestUtils.renderIntoDocument(<View view="sample-view" />);
        var header = TestUtils.findRenderedDOMComponentWithClass(view, 'widget__header');
        expect(header.getDOMNode().textContent).toEqual('Jenkins sample-view view');
    });


    it ('should display title override when specified', function () {
        view = TestUtils.renderIntoDocument(<View view="sample-view" title="override" />);
        var header = TestUtils.findRenderedDOMComponentWithClass(view, 'widget__header');
        expect(header.getDOMNode().textContent).toEqual('override');
    });


    it ('should display job builds detail', function () {
        view  = TestUtils.renderIntoDocument(<View view="sample-view" title="override" />);

        view.setState({
            view: sampleView
        });

        var jobs = TestUtils.scryRenderedDOMComponentsWithClass(view, 'table__row');
        expect(jobs.length).toEqual(4);

        var job0Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[1], 'td');
        expect(job0Cells.length).toEqual(6);
        expect(job0Cells[1].getDOMNode().textContent).toEqual('sample-job-0');
        expect(job0Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');

        var job1Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[2], 'td');
        expect(job1Cells.length).toEqual(6);
        expect(job1Cells[1].getDOMNode().textContent).toEqual('sample-job-1');
        expect(job1Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');

        var job2Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[3], 'td');
        expect(job2Cells.length).toEqual(6);
        expect(job2Cells[1].getDOMNode().textContent).toEqual('sample-job-2');
        expect(job2Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');
    });
});