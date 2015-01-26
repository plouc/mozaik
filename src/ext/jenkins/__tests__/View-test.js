jest.dontMock('./../components/View.jsx');
jest.dontMock('./../components/ViewJob.jsx');
jest.dontMock('./../components/ViewJobs.jsx');

var React, TestUtils, View, view;

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
        React     = require('react/addons');
        TestUtils = React.addons.TestUtils;
        View      = require('./../components/View.jsx');
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
        expect(jobs.length).toEqual(3);

        var job0Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[0], 'td');
        expect(job0Cells.length).toEqual(3);
        expect(job0Cells[1].getDOMNode().textContent).toEqual('sample-job-0');
        expect(job0Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');

        var job1Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[1], 'td');
        expect(job1Cells.length).toEqual(3);
        expect(job1Cells[1].getDOMNode().textContent).toEqual('sample-job-1');
        expect(job1Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');

        var job2Cells = TestUtils.scryRenderedDOMComponentsWithTag(jobs[2], 'td');
        expect(job2Cells.length).toEqual(3);
        expect(job2Cells[1].getDOMNode().textContent).toEqual('sample-job-2');
        expect(job2Cells[2].getDOMNode().textContent).toEqual('Build stability: No recent builds failed.');
    });
});