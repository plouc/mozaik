var _components = {};

var ComponentRegistry = {
    add: function (type, component) {
        _components[type] = component;

        return ComponentRegistry;
    },

    get: function (type) {
        if (!_components[type]) {
            throw new Error('No component defined for type "' + type + '"');
        }
        return _components[type];
    }
};

module.exports = ComponentRegistry;