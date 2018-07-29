import _ from 'lodash'

const registry = {}

const WidgetsRegistry = {
    /**
     * Register multiple extensions components.
     *
     * @param {Object} extensions
     */
    addExtensions(extensions) {
        _.forOwn(extensions, (components, extensionId) => {
            WidgetsRegistry.addExtension(extensionId, components)
        })

        return WidgetsRegistry
    },

    /**
     * Register an extension components.
     *
     * @param {String} extensionId
     * @param {Object} components
     * @returns {WidgetsRegistry}
     */
    addExtension(extension, components) {
        _.forOwn(components, (component, widget) => {
            WidgetsRegistry.add(extension, widget, component)
        })

        return WidgetsRegistry
    },

    /**
     *
     * @param {string}   extension
     * @param {string}   widget
     * @param {Function} component
     * @returns {WidgetsRegistry}
     */
    add(extension, widget, component) {
        if (!registry.hasOwnProperty(extension)) {
            registry[extension] = {}
        }
        registry[extension][widget] = component

        return WidgetsRegistry
    },

    /**
     *
     * @param {string} extension
     * @param {string} widget
     * @return {boolean}
     */
    has(extension, widget) {
        return registry.hasOwnProperty(extension) && registry[extension].hasOwnProperty(widget)
    },

    /**
     * @param {string} extension
     * @param {string} widget
     * @return {Function}
     */
    getComponent(extension, widget) {
        if (!WidgetsRegistry.has(extension, widget)) {
            throw new Error(`No widget "${widget}" defined for extension "${extension}"`)
        }

        return registry[extension][widget]
    },

    widgetsCount() {
        let count = 0
        for (let ext in registry) {
            count += Object.keys(registry[ext]).length
        }

        return count
    },

    /**
     * @return {Object}
     */
    list() {
        return registry
    },
}

export default WidgetsRegistry
