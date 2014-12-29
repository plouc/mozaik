jest.dontMock('./../components/Stacks.jsx');
jest.dontMock('./../components/Stack.jsx');

describe('AWS — Stacks', function () {

    it('changes the text after click', function() {
        var React     = require('react/addons');
        var Stacks    = require('./../components/Stacks.jsx');
        var TestUtils = React.addons.TestUtils;

        var stacks = TestUtils.renderIntoDocument(
            <Stacks />
        );

        var count = TestUtils.findRenderedDOMComponentWithClass(stacks, 'widget__header__count');
        expect(count.getDOMNode().textContent).toEqual('0');

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

        expect(count.getDOMNode().textContent).toEqual('3');

        var stackItems = TestUtils.scryRenderedDOMComponentsWithClass(stacks, 'aws__stack');
    });
});