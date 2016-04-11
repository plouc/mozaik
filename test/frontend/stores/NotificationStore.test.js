/* global describe it */
import _                     from 'lodash';
import expect                from 'expect';
import sinon                 from 'sinon';
import { expectTriggers }    from '../../helpers/storeHelper';
import { getFakeTimerCount } from '../../helpers/timersHelper';


let clock;
let triggerSpy;
let NotificationsStore;


describe('Mozaïk | NotificationsStore', () => {
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        NotificationsStore = require('../../../src/browser/stores/NotificationsStore').default;
        triggerSpy = sinon.spy();
        NotificationsStore.trigger = triggerSpy;
        NotificationsStore.reset();
    });

    afterEach(() => {
        clock.restore();
    });

    describe('notify()', () => {
        it('should add a notification to the current list of notifications', () => {
            NotificationsStore.notify({});

            expectTriggers(triggerSpy, [
                (notifications) => {
                    expect(notifications.length).toEqual(1);
                }
            ]);
        });

        it('should generate a unique notification id if none given', () => {
            NotificationsStore.notify({});
            NotificationsStore.notify({});

            expectTriggers(triggerSpy, [
                'skip',
                (notifications) => {
                    expect(notifications.length).toEqual(2);
                    expect(_.uniqBy(notifications, 'id').length).toEqual(2);
                }
            ]);
        });

        it(`should set a default 'ttl' if none given`, () => {
            NotificationsStore.notify({});

            expectTriggers(triggerSpy, [[{ id: 0, ttl: 5000 }]]);
        });

        it(`should allow to define a custom 'ttl'`, () => {
            NotificationsStore.notify({ ttl: 1000 });

            expectTriggers(triggerSpy, [[{ id: 0, ttl: 1000 }]]);
        });

        it(`should remove notification after given 'ttl'`, () => {
            NotificationsStore.notify({});

            expectTriggers(triggerSpy, [[{ id: 0, ttl: 5000 }]]);

            clock.tick(5000);

            expectTriggers(triggerSpy, ['skip', []]);
        });

        it(`should not remove notification if 'ttl' is -1`, () => {
            NotificationsStore.notify({ ttl: -1 });
            clock.tick(5000);

            expectTriggers(triggerSpy, [[{ id: 0, ttl: -1 }]]);
        });

        it(`should replace existing notification if there's already one having given id`, () => {
            NotificationsStore.notify({ id: 1, message: 'foo' });
            NotificationsStore.notify({ id: 1, message: 'bar' });

            expectTriggers(triggerSpy, [
                [{ id: 1, message: 'foo', ttl: 5000 }],
                [{ id: 1, message: 'bar', ttl: 5000 }]
            ]);
        });

        it(`should clear existing timer if there's already a notification having given id`, () => {
            NotificationsStore.notify({ id: 1, message: 'foo' });
            NotificationsStore.notify({ id: 1, message: 'bar' });

            expect(getFakeTimerCount(clock)).toEqual(1);
        });
    });

    describe('update()', () => {
        it('should update status for notification matching given id', () => {
            NotificationsStore.notify({ id: 1, status: 'warning' });
            NotificationsStore.update(1, { status: 'error' });

            expectTriggers(triggerSpy, [
                [{ id: 1, status: 'warning', ttl: 5000 }],
                [{ id: 1, status: 'error',   ttl: 5000 }]
            ]);
        });
    });

    describe('close()', () => {
        it('should remove notification matching given id', () => {
            NotificationsStore.notify({ id: 1 });
            NotificationsStore.close(1);

            expectTriggers(triggerSpy, [[{ id: 1, ttl: 5000 }], []]);
        });

        it(`should delay notification removal if 'delay' is not 0`, () => {
            NotificationsStore.notify({ id: 1 });
            NotificationsStore.close(1, 1000);

            expectTriggers(triggerSpy, [[{ id: 1, ttl: 5000 }]]);

            triggerSpy.reset();
            clock.tick(1000);

            expectTriggers(triggerSpy, [[]]);
        });

        it(`should clear previous timer if called twice for the same notification id`, () => {
            NotificationsStore.notify({ id: 1 });
            NotificationsStore.close(1, 1000);
            NotificationsStore.close(1, 1000);

            expect(getFakeTimerCount(clock)).toEqual(1);
        });
    });
});
