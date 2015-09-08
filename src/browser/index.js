import ComponentRegistry from './component-registry';
import ApiConsumerMixin  from './mixins/ApiConsumerMixin';
import ApiStore          from './stores/ApiStore';
import ApiActions        from './actions/ApiActions';
import ConfigActions     from './actions/ConfigActions';
import MozaikComponent   from './components/Mozaik.jsx';
import PieComponent      from './components/charts/Pie.jsx';
import GaugeComponent    from './components/charts/Gauge.jsx';
import TreemapComponent  from './components/charts/Treemap.jsx';
import BarChartComponent from './components/charts/BarChart.jsx';


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
        Mozaik:   MozaikComponent,
        Pie:      PieComponent,
        Gauge:    GaugeComponent,
        Treemap:  TreemapComponent,
        BarChart: BarChartComponent
    }
};
