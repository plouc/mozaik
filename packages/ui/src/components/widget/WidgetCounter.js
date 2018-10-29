import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import typography from '../../theming/typography'

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`

const Count = styled.span`
    flex: 1;
    display: flex;
    justify-content: ${props =>
        props.align === 'center' ? 'center' : props.align === 'left' ? 'flex-start' : 'flex-end'};
    align-items: center;
`

const CountInner = styled.span`
    white-space: pre;
`

const CountText = styled.span`
    color: ${props => props.theme.colors.textHighlight};
    ${props => typography(props.theme, 'display')} font-size: 9vmin;
`

const Unit = styled.span`
    display: inline-block;
    margin-left: 1vmin;
    ${props => typography(props.theme, 'display')} font-size: 5vmin;
`

const PreLabel = styled.div`
    margin-bottom: 2vmin;
    text-align: ${props =>
        props.align === 'center' ? 'center' : props.align === 'left' ? 'left' : 'right'};
    ${props => typography(props.theme)};
`

const PostLabel = styled.div`
    margin-top: 2vmin;
    text-align: ${props =>
        props.align === 'center' ? 'center' : props.align === 'left' ? 'left' : 'right'};
    ${props => typography(props.theme)};
`

export default class WidgetCounter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        unit: PropTypes.string,
        preLabel: PropTypes.node,
        postLabel: PropTypes.node,
        align: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    }

    static defaultProps = {
        align: 'center',
    }

    render() {
        const { count, unit, preLabel, postLabel, align } = this.props

        return (
            <Container>
                {preLabel && <PreLabel align={align}>{preLabel}</PreLabel>}
                <Count align={align}>
                    <CountInner>
                        <CountText>{count}</CountText>
                        {unit && <Unit>{unit}</Unit>}
                    </CountInner>
                </Count>
                {postLabel && <PostLabel align={align}>{postLabel}</PostLabel>}
            </Container>
        )
    }
}
