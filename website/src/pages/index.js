import React from 'react'
import HomeBanner from '../components/HomeBanner'
import Share from '../components/Share'
import Features from '../components/Features'
import References from '../components/References'
import ExternalPosts from '../components/ExternalPosts'

const IndexPage = props => {
    const references = props.data.allReferencesYaml.edges.map(({ node }) => node)
    const refImages = props.data.refImages.edges.map(({ node }) => node)
    const externalPosts = props.data.allUseCasesYaml.edges.map(({ node }) => node)

    return (
        <div>
            <HomeBanner/>
            <Share/>
            <Features/>
            <References references={references} images={refImages}/>
            <ExternalPosts posts={externalPosts}/>
        </div>
    )
}

export default IndexPage

export const query = graphql`
    query IndexQuery {
        allReferencesYaml {
            edges {
                node {
                    image
                    label
                    link
                }
            }
        }
        
        allUseCasesYaml {
            edges {
                node {
                    title
                    link
                }
            }
        }
        
        refImages: allFile(filter: { relativePath: { regex: "/assets/refs/*/" } }) {
            edges {
                node {
                    base
                    publicURL
                }
            }
        }
    }
`