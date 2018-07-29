import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Cell = styled.td`
    padding: 1vmin 2vmin;
`

const WidgetTableCell = ({ children }) => <Cell>{children}</Cell>

WidgetTableCell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default WidgetTableCell
