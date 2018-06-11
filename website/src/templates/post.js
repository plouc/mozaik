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

const PostPage = props => {
    const {
        data: {
            markdownRemark: {
                frontmatter,
                html
            }
        },
        pathContext: {
            allPosts
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
                    navigation={[...allPosts].reverse()}
                />
            </Wrapper>
            <SecondaryNav items={allPosts}/>
        </div>
    )
}

export default PostPage

export const pageQuery = graphql`
    query PostPageByDate($date: String!) {
        markdownRemark(frontmatter: { date: { glob: $date } }) {
            html
            frontmatter {
                title
                description
            }
        }
    }
`