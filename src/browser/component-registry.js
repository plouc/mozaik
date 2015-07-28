import _ from 'lodash';

var _components = {};

const ComponentRegistry = {
    /**
     * Register multiple extensions components.
     *
     * @param {Object} extensions
     */
    addExtensions(extensions) {
        _.forOwn(extensions, (components, extensionId) => {
            ComponentRegistry.addExtension(extensionId, components)
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
        _components[type] = component;

        return ComponentRegistry;
    },

    get(type) {
        if (!_components[type]) {
            throw new Error('No component defined for type "' + type + '"');
        }

        return _components[type];
    },

    list() {
        return _components;
    }
};

export default ComponentRegistry;