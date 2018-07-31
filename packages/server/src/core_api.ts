import Bus from './bus'

export default (bus: Bus) => () => ({
    inspector() {
        return Promise.resolve({
            apis: bus.listApis(),
            clientCount: bus.clientCount(),
            uptime: process.uptime(),
        })
    },
})
