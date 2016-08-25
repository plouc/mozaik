/**
 * @param {Bus} bus
 */
const CoreApi = bus => () => {
    const methods = {
        inspector() {
            return Promise.resolve({
                apis:        bus.listApis(),
                clientCount: bus.clientCount(),
                uptime:      process.uptime(),
            })
        },
    }

    return methods
}


module.exports = CoreApi
