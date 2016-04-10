import _      from 'lodash';
import expect from 'expect';


export const expectTriggers = (spy, expectedCalls) => {
    expect(spy.callCount).toEqual(expectedCalls.length);

    expectedCalls.forEach((expectedCall, i) => {
        if (expectedCall !== 'skip') {
            const state = spy.getCall(i).args[0];

            if (_.isFunction(expectedCall)) {
                expectedCall(state);
            } else {
                expect(state).toEqual(expectedCall);
            }
        }
    });
};
