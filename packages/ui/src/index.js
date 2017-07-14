import Registry from './WidgetsRegistry'
import ThemeManager from './lib/ThemeManager'
import Mozaik from './app'
import Inspector from './components/Inspector'
import TrapApiError from './components/TrapApiError'
import Widget from './components/widget/Widget'
import WidgetHeader from './components/widget/WidgetHeader'
import WidgetBody from './components/widget/WidgetBody'
import WidgetLoader from './components/widget/WidgetLoader'
import WidgetListItem from './components/widget/list/WidgetListItem'
import WidgetLabel from './components/widget/WidgetLabel'
import WidgetTable from './components/widget/table/WidgetTable'
import WidgetTableCell from './components/widget/table/WidgetTableCell'
import WidgetTableHeadCell from './components/widget/table/WidgetTableHeadCell'
import WidgetAvatar from './components/widget/WidgetAvatar'
import WidgetStatusChip from './components/widget/status/WidgetStatusChip'
import WidgetStatusBadge from './components/widget/status/WidgetStatusBadge'

Registry.add('mozaik', 'Inspector', Inspector)

export default Mozaik
export {
    Registry,
    ThemeManager,
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetListItem,
    WidgetLabel,
    WidgetTable,
    WidgetTableCell,
    WidgetTableHeadCell,
    WidgetAvatar,
    WidgetStatusChip,
    WidgetStatusBadge,
}
