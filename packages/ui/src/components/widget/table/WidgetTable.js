import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.6vmin;
`

const WidgetTable = ({ children }) => <Table>{children}</Table>

export default WidgetTable
