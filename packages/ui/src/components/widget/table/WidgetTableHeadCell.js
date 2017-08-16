import React, { Component } from 'react'
import styled from 'styled-components'

const HeadCell = styled.th`
    padding: 1vmin 2vmin;
    text-align: left;
    font-weight: normal;
`

const WidgetTableHeadCell = ({ children }) => <HeadCell>{children}</HeadCell>

export default WidgetTableHeadCell
