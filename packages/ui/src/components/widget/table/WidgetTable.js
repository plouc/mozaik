import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.6vmin;
`

const WidgetTable = ({ children }) => <Table>{children}</Table>

WidgetTable.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default WidgetTable
