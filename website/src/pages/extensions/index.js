import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import SubHeader from '../../components/SubHeader'
import Extensions from '../../components/Extensions'

const Root = styled(Container)`
    padding: 30px 0;
    background: ${props => props.theme.contentBackgroundColor};
`

const Intro = styled.div`
    text-align: left;
    font-weight: 700;
    padding-left: 20px;
    border-left: 3px solid #71cff2;
`

const ExtensionsPage = ({ data }) => {
    const extensions = data.allExtensionsYaml.edges.map(({ node }) => node)

    return (
        <div>
            <SubHeader
                title="Extensions"
                description="Extend Mozaïk with custom extensions"
            />
            <Root size="large">
                <Intro>
                    <strong>Mozaïk</strong> widgets are maintained as separate modules,
                    available as <code>mozaik-ext-EXT_NAME</code> npm packages.
                </Intro>
                <Extensions extensions={extensions}/>
            </Root>
        </div>
    )
}

export default ExtensionsPage

export const query = graphql`
    query ExtensionsQuery {
        allExtensionsYaml {
            edges {
                node {
                    name
                    description
                    link
                    demo
                    travis
                    compat
                    tags
                }
            }
        }
    }
`
