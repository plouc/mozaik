import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HeadCell = styled.th`
    padding: 1vmin 2vmin;
    text-align: left;
    font-weight: normal;
`

const WidgetTableHeadCell = ({ children }) => <HeadCell>{children}</HeadCell>

WidgetTableHeadCell.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default WidgetTableHeadCell
