var _ = require('lodash');

var _components = {};

var ComponentRegistry = {
    addBatch(ns, components) {
        _.forOwn(components, function (component, id) {
            ComponentRegistry.add(`${ ns }.${ _.snakeCase(id) }`, component);
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

module.exports = ComponentRegistry;