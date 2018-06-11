import React from 'react'
import styled from 'styled-components'
import FeaturesItem from './FeaturesItem'
import ExtendableIcon from '../assets/features/mozaik-icon-extendable.png'
import ThemableIcon from '../assets/features/mozaik-icon-themes.png'
import GridIcon from '../assets/features/mozaik-icon-positioning.png'
import BackendIcon from '../assets/features/mozaik-icon-backend.png'
import Container from './Container'
import media from '../styles/media'

const Root = styled(Container)`
    padding: 0 0 50px;
    display: flex;
    flex-flow: row wrap;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background: ${props => props.theme.contentBackgroundColor};
`

const Title = styled.h2`
    font-weight: 700;
    font-size: 22px;
    padding-bottom: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    
    ${media.mobile`
        & {
            text-align: center;
            margin: 30px 0 0;
        }
    `}
    
    ${media.tablet`
        & {
            margin: 20px 0 15px;
        }
    `}
    
    ${media.desktop`
        & {
            margin: 30px 0;
        }
    `}
`

const Grid = styled.div`
    display: grid;
    
    ${media.mobile`
        & {
            grid-template-columns: 1fr;
        }
    `}
    
    ${media.tablet`
        & {
            grid-template-columns: 1fr;
        }
    `}
    
    ${media.desktop`
        & {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 40px;
            grid-row-gap: 40px;
        }
    `}
`

const Features = () => (
    <Root size="large">
        <Title>Features</Title>
        <Grid>
            <FeaturesItem
                title="Scalable layout"
                image={ExtendableIcon}
            >
                <p>
                    <strong>Mozaïk</strong> dashboards support multiple devices through adaptive layout.
                    You can either put your dashboard on a big screen in the open space,
                    or consult it on your smartphone.
                </p>
            </FeaturesItem>
            <FeaturesItem
                title="Themes support"
                image={ThemableIcon}
                link="/docs/theming"
            >
                <p>
                    <strong>Mozaïk</strong> dashboard comes with several themes and makes
                    it easy to develop your own theme.
                </p>
            </FeaturesItem>
            <FeaturesItem
                title="Extendable by modules"
                image={ExtendableIcon}
                link="/extensions"
            >
                <p>
                    <strong>Mozaïk</strong> widgets are maintained as separate modules,
                    thus available via mozaik-ext-&lt;name&gt; in npm.js.
                </p>
            </FeaturesItem>
            <FeaturesItem
                title="Grid positioning"
                image={GridIcon}
                link="/docs/grid-system"
            >
                <p>
                    <strong>Mozaïk</strong> provides a simple way to define your dashboard layout using a grid system.
                </p>
            </FeaturesItem>
            <FeaturesItem
                title="Optimized backend communication"
                image={BackendIcon}
                link="/docs/v1/guides/client"
            >
                <p>
                    Most extensions need to communicate with APIs.
                    <strong>Mozaïk</strong> eases this by providing a backend,
                    which handles API calls and pushes data to widgets through websockets.
                </p>
            </FeaturesItem>
            <FeaturesItem
                title="Multi dashboards"
                image={ExtendableIcon}
            >
                <p>
                    Sometimes, a single dashboard is not enough.
                    <strong>Mozaïk</strong> allows multiple dashboards with a smooth transition.
                </p>
            </FeaturesItem>
        </Grid>
    </Root>
)

export default Features
