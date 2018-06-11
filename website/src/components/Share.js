import React from 'react'
import styled from 'styled-components'

/*
@media only screen and (min-width: 769px) {
    .Share {
        display: block;
    }
}
 */

const Root = styled.section`
    background: #fff;
    display: none;
    text-align: center;
    border-bottom: 1px solid #ddd;
`

const Inner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 0;
    height: 44px;
`

const Share = () => (
    <Root>
        <Inner>
            {/* GitHub stars */}
            <iframe
                src="https://ghbtns.com/github-btn.html?user=plouc&repo=mozaik&type=star&count=true"
                frameBorder="0"
                scrolling="0"
                width="100px"
                height="20px"
            />
            {/* GitHub forks */}
            <iframe
                src="https://ghbtns.com/github-btn.html?user=plouc&repo=mozaik&type=fork&count=true"
                frameBorder="0"
                scrolling="0"
                width="100px"
                height="20px"
            />
        </Inner>
    </Root>
)

export default Share
