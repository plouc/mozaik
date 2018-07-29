const cache = {}

export default (theme, type = 'default', variant = 'default') => {
    const key = `${theme.name}.${type}.${variant}`

    const cached = cache[key]
    if (cached !== undefined) return cached

    let config = theme.typography[type].default
    if (variant !== 'default') {
        config = {
            ...config,
            ...theme.typography[type][variant],
        }
    }

    const rules = `
        font-family: ${config.fontFamily};
        font-size: ${config.fontSize};
        line-height: ${config.lineHeight};
        font-weight: ${config.fontWeight};
    `

    cache[key] = rules

    return rules
}
