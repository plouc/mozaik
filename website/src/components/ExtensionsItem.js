import React from 'react'
import styled from 'styled-components'

const Extension = styled.div`
    background: ${props => props.theme.contentBackgroundHighlightColor};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
`

const Header = styled.header`
    background: #fafafa;
    display: flex;
    padding: 13px 20px;
    align-items: center;
    justify-content: space-between;
`

const Link = styled.a`
    color: #444;
    font-size: 18px;
    text-decoration: none;
    font-weight: 700;
    flex-grow: 1;

    &:hover {
        color: #000;
    }
`

const NpmBadge = styled.a`
    display: inline-block;
    
    img {
        display: block;
        margin: 0;
    }
`

const DemoLink = styled.a`
    display: block;
    text-decoration: none;
    background-color: ${props => props.theme.accentTextColor};
    color: white;
    line-height: 1em;
    padding: 4px 7px;
    font-size: 0.75rem;
    font-weight: 700;
    margin-left: 7px;
`

const Description = styled.div`
    line-height: 1.8em;
    padding: 12px 20px;
`

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px 7px 20px;
    border-top: 1px solid rgba(0, 0, 0, .08);
    font-size: 0.9em;
`

const Tags = styled.div`
    display: flex;
    align-items: center;
`

const TagsItem = styled.span`
    color: #999;
    text-decoration: none;
    display: block;
    margin-right: 10px;
    cursor: pointer;
    
    &:hover {
        color: #555;
    }

    &:before {
        content: "#";
    }
`

const Compat = styled.div`
    display: flex;
`

const CompatItem = styled.span`
    font-weight: 700;
    margin-left: 7px;
`

const ExtensionsItem = ({ name, link, description, demo, tags, compat }) => (
    <Extension>
        <Header>
            <Link href={link} target="_blank">
                {name}
            </Link>
            <NpmBadge
                href={`https://www.npmjs.com/package/${name}`}
                target="_blank"
            >
                <img
                    alt={`${name} NPM version`}
                    src={`https://img.shields.io/npm/v/${name}.svg?style=flat-square`}
                />
            </NpmBadge>
            {demo && <DemoLink href={demo} target="_blank">demo</DemoLink>}
        </Header>
        <Description>
            {description}
        </Description>
        <Footer>
            <Tags>
                {tags.map(tag => <TagsItem key={tag}>{tag}</TagsItem>)}
            </Tags>
            <Compat>
                compatibility:
                {compat.map(version => (
                    <CompatItem key={version}>v{version}</CompatItem>
                ))}
            </Compat>
        </Footer>
    </Extension>
)

export default ExtensionsItem
