import ComponentRegistry from './component-registry';
import ApiConsumerMixin  from './mixins/ApiConsumerMixin';
import ApiStore          from './stores/ApiStore';
import ApiActions        from './actions/ApiActions';
import ConfigActions     from './actions/ConfigActions';
import MozaikComponent   from './components/Mozaik.jsx';
import PieComponent      from './components/charts/Pie.jsx';
import TreemapComponent  from './components/charts/Treemap.jsx';


export default {
    Registry: ComponentRegistry,
    Mixin: {
        ApiConsumer: ApiConsumerMixin
    },
    Store: {
        Api: ApiStore
    },
    Actions:   {
        Api:    ApiActions,
        Config: ConfigActions
    },
    Component: {
        Mozaik:  MozaikComponent,
        Pie:     PieComponent,
        Treemap: TreemapComponent
    }
};