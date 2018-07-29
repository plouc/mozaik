import Registry from './WidgetsRegistry'
import Inspector from './components/Inspector'
import Mozaik from './App'

Registry.add('mozaik', 'Inspector', Inspector)

export { Registry }
export { default as ThemeManager } from './theming/ThemeManager'
export { default as defaultTheme } from './theming/defaultTheme'
export { default as typography } from './theming/typography'
export { default as TrapApiError } from './components/TrapApiError'
export { default as Text } from './components/Text'
export { default as Widget } from './components/widget/Widget'
export { default as WidgetHeader } from './components/widget/WidgetHeader'
export { default as WidgetBody } from './components/widget/WidgetBody'
export { default as WidgetLoader } from './components/widget/WidgetLoader'
export { default as WidgetListItem } from './components/widget/list/WidgetListItem'
export { default as WidgetLabel } from './components/widget/WidgetLabel'
export { default as WidgetTable } from './components/widget/table/WidgetTable'
export { default as WidgetTableCell } from './components/widget/table/WidgetTableCell'
export { default as WidgetTableHeadCell } from './components/widget/table/WidgetTableHeadCell'
export { default as WidgetAvatar } from './components/widget/WidgetAvatar'
export { default as WidgetStatusChip } from './components/widget/status/WidgetStatusChip'
export { default as WidgetStatusBadge } from './components/widget/status/WidgetStatusBadge'
export { default as WidgetCounter } from './components/widget/WidgetCounter'
export { default as ExternalLink } from './components/ExternalLink'
export * from './components/icons'

export default Mozaik
