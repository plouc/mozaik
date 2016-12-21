import Registry            from './WidgetsRegistry'
import ThemeManager        from './themes/ThemeManager'
import SnowTheme           from './themes/snowTheme'
import NightBlueTheme      from './themes/nightBlueTheme'
import WineTheme           from './themes/wineTheme'
import SunnyTheme          from './themes/sunnyTheme'
import SolarizedDarkTheme  from './themes/solarizedDarkTheme'
import ZenBurnTheme        from './themes/zenBurnTheme'
import Mozaik              from './app'
import Inspector           from './components/Inspector'
import TrapApiError        from './components/TrapApiError'
import Widget              from './components/widget/Widget'
import WidgetHeader        from './components/widget/WidgetHeader'
import WidgetBody          from './components/widget/WidgetBody'
import WidgetList          from './components/widget/list/WidgetList'
import WidgetListItem      from './components/widget/list/WidgetListItem'
import WidgetLabel         from './components/widget/WidgetLabel'
import WidgetTable         from './components/widget/table/WidgetTable'
import WidgetTableCell     from './components/widget/table/WidgetTableCell'
import WidgetTableHeadCell from './components/widget/table/WidgetTableHeadCell'
import WidgetAvatar        from './components/widget/WidgetAvatar'
import WidgetStatusChip    from './components/widget/status/WidgetStatusChip'
import WidgetStatusBadge   from './components/widget/status/WidgetStatusBadge'


ThemeManager.loadTheme('snow',           SnowTheme)
ThemeManager.loadTheme('night blue',     NightBlueTheme)
ThemeManager.loadTheme('wine',           WineTheme)
ThemeManager.loadTheme('sunny',          SunnyTheme)
ThemeManager.loadTheme('solarized dark', SolarizedDarkTheme)
ThemeManager.loadTheme('zen burn',       ZenBurnTheme)

Registry.add('mozaik', 'Inspector', Inspector)

export default Mozaik
export {
    Registry,
    ThemeManager,
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetList,
    WidgetListItem,
    WidgetLabel,
    WidgetTable,
    WidgetTableCell,
    WidgetTableHeadCell,
    WidgetAvatar,
    WidgetStatusChip,
    WidgetStatusBadge,
}
