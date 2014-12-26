var _components = {};

var ComponentRegistry = {
    add: function (type, component) {
        _components[type] = component;

        return ComponentRegistry;
    },

    get: function (type) {
        return _components[type];
    }
};

module.exports = ComponentRegistry;