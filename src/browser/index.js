var ComponentRegistry = require('./component-registry');


module.exports = {
    add:            ComponentRegistry.add,
    addExtensions:  ComponentRegistry.addExtensions,
    addExtension:   ComponentRegistry.addExtension,
    get:            ComponentRegistry.get,
    list:           ComponentRegistry.list,
    Mixin:     {
        ApiConsumer: require('./mixins/ApiConsumerMixin')
    },
    Store:     {
        Api: require('./stores/ApiStore')
    },
    Actions:   {
        Api:    require('./actions/ApiActions'),
        Config: require('./actions/ConfigActions')
    },
    Component: {
        Mozaik:  require('./components/Mozaik.jsx'),
        Pie:     require('./components/charts/Pie.jsx'),
        Treemap: require('./components/charts/Treemap.jsx')
    }
};