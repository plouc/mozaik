import Registry  from './componentRegistry'
import Mozaik    from './app'
import Pie       from './components/charts/Pie'
import Gauge     from './components/charts/Gauge'
import Treemap   from './components/charts/Treemap'
import BarChart  from './components/charts/BarChart'
import Inspector from './components/Inspector'


Registry.add('mozaik.inspector', Inspector)

export default {
    Mozaik,
    Registry,
    Pie,
    Gauge,
    Treemap,
    BarChart,
}
