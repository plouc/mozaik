import React from 'react'
import styled from 'styled-components'

const Cell = styled.td`padding: 1vmin 2vmin;`

const WidgetTableCell = ({ children }) =>
    <Cell>
        {children}
    </Cell>

export default WidgetTableCell
