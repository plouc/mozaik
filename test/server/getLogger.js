const sinon = require('sinon')


module.exports = () => ({
    info:  sinon.spy(),
    warn:  sinon.spy(),
    error: sinon.spy(),
})
