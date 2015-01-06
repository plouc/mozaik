var _components = {};

var ComponentRegistry = {
    add(type, component) {
        _components[type] = component;

        return ComponentRegistry;
    },

    get(type) {
        if (!_components[type]) {
            throw new Error('No component defined for type "' + type + '"');
        }

        return _components[type];
    }
};

module.exports = ComponentRegistry;