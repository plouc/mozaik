import React from 'react'
import styled from 'styled-components'
import ExtensionsItem from './ExtensionsItem'
import media from '../styles/media'

const Root = styled.div`
    margin: 30px 0;
    display: grid;
    grid-column-gap: 30px;
    
    ${media.mobile`
        grid-template-columns: 1fr;
    `}
    
    ${media.tablet`
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
    `}
    
    ${media.desktop`
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 30px;
    `}
`

const Extensions = ({ extensions }) => (
    <Root>
        {extensions.map(extension => (
            <ExtensionsItem
                key={extension.name}
                {...extension}
            />
        ))}
    </Root>
)

export default Extensions

