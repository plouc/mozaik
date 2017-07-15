export const guessWSURL = (config = {}) => {
    let proto = 'ws'
    if (config.useWssConnection === true) {
        proto = 'wss'
    }

    let port = window.document.location.port
    if (config.wsPort !== undefined) {
        port = config.wsPort
    }

    let wsUrl = `${proto}://${window.document.location.hostname}`
    if (port && port !== '') {
        wsUrl = `${wsUrl}:${port}`
    }

    return wsUrl
}
