/**
 * Used to remove chalk formatting to be able
 * to make proper comparison in tests.
 */
const chalkMock = {
    yellow(log) {
        return log;
    },
    red(log) {
        return log;
    }
};


export default chalkMock;
