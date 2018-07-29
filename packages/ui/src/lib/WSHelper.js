export const guessWSURL = (config = {}) => {
    if (!window || !window.document || !window.document.location) {
        throw new Error(
            `Unable to guess websocket URL because 'window.document.location' is not defined`
        )
    }

    let proto = 'ws'
    if (config.useWssConnection === true || window.document.location.protocol === 'https:') {
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
