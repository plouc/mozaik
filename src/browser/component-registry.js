import _ from 'lodash';

const registry = {};

const ComponentRegistry = {
    /**
     * Register multiple extensions components.
     *
     * @param {Object} extensions
     */
    addExtensions(extensions) {
        _.forOwn(extensions, (components, extensionId) => {
            ComponentRegistry.addExtension(extensionId, components);
        });
    },

    /**
     * Register an extension components.
     *
     * @param {String} extensionId
     * @param {Object} components
     */
    addExtension(extensionId, components) {
        _.forOwn(components, (component, id) => {
            ComponentRegistry.add(`${ extensionId }.${ _.snakeCase(id) }`, component);
        });
    },

    add(type, component) {
        registry[type] = component;

        return ComponentRegistry;
    },

    get(type) {
        if (!registry[type]) {
            throw new Error(`No component defined for type "${type}"`);
        }

        return registry[type];
    },

    list() {
        return registry;
    }
};


export default ComponentRegistry;
