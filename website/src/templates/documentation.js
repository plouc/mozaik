import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import SubHeader from '../components/SubHeader'
import SecondaryNav from '../components/SecondaryNav'
import Pager from '../components/Pager'
import Container from '../components/Container'
import GeneratedContent from '../components/GeneratedContent'

const Wrapper = styled.div`
    padding-left: ${props => props.theme.sidebarWidth}px;
`

const Background = styled(Container)`
    background: ${props => props.theme.contentBackgroundColor};
    display: flex;
`

const DocumentationPage = props => {
    const {
        data: {
            markdownRemark: {
                frontmatter,
                html
            }
        },
        pathContext: {
            navigation
        },
        pageResources: {
            page
        }
    } = props

    return (
        <div>
            <Helmet
                title={frontmatter.title}
                meta={[
                    {
                        name: 'description',
                        content: frontmatter.description
                    },
                ]}
            />
            <Wrapper>
                <SubHeader
                    title={frontmatter.title}
                    description={frontmatter.description}
                    isDocPage={true}
                />
                <Background>
                    <GeneratedContent
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </Background>
                <Pager
                    currentPath={page.path}
                    navigation={navigation}
                />
            </Wrapper>
            <SecondaryNav items={navigation}/>
        </div>
    )
}

export default DocumentationPage

export const pageQuery = graphql`
    query DocumentationPageByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                title
                description
            }
        }
    }
`