import Registry from './WidgetsRegistry'
import ThemeManager from './theming/ThemeManager'
import defaultTheme from './theming/defaultTheme'
import Mozaik from './App'
import Inspector from './components/Inspector'
import TrapApiError from './components/TrapApiError'
import Text from './components/Text'
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
import WidgetCounter from './components/widget/WidgetCounter'

Registry.add('mozaik', 'Inspector', Inspector)

export default Mozaik
export {
    Registry,
    ThemeManager,
    defaultTheme,
    TrapApiError,
    Text,
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
    WidgetCounter,
}
