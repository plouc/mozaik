import _      from 'lodash';
import expect from 'expect';


export const getFakeTimerCount = (clock) => {
    return _.reduce(clock.timers, (count, timer) => {
        if (timer !== undefined) {
            count++;
        }
        return count;
    }, 0);
};
