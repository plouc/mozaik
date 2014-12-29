jest.dontMock('./../components/Stacks.jsx');
jest.dontMock('./../components/Stack.jsx');

var React, TestUtils, Stacks, stacks;

describe('AWS — Stacks', function () {

    beforeEach(function() {
        React     = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Stacks    = require('./../components/Stacks.jsx');
        stacks    = TestUtils.renderIntoDocument(<Stacks />);
    });


    it('should display 0 count by default', function () {
        var count = TestUtils.findRenderedDOMComponentWithClass(stacks, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('0');
    });


    it('should update count when stacks array given', function () {
        stacks.setState({
            stacks: [
                {
                    StackId:     0,
                    StackName:   'stack 0',
                    StackStatus: 'running'
                },
                {
                    StackId:     1,
                    StackName:   'stack 1',
                    StackStatus: 'running'
                },
                {
                    StackId:     2,
                    StackName:   'stack 2',
                    StackStatus: 'running'
                }
            ]
        });

        var count = TestUtils.findRenderedDOMComponentWithClass(stacks, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('3');

        var stackItems = TestUtils.scryRenderedDOMComponentsWithClass(stacks, 'aws__stack');
        expect(stackItems.length).toEqual(3);
    });
});