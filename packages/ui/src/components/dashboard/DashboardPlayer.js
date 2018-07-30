import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MorphIcon, PlayButton as PlayIcon } from 'react-svg-buttons'
import styled, { withTheme } from 'styled-components'
import typography from '../../theming/typography'

const Container = styled.div`
    margin-right: 6vmin;
    display: flex;
    align-items: center;
    height: 100%;
    ${props => typography(props.theme)};
`

const Button = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
    padding: 0 0.6vmin;
`

const PlayButton = Button.extend`
    margin-left: 0.6vmin;
`

const Page = styled.span`
    display: inline-block;
    width: 2vmin;
    text-align: center;
`

const Slash = styled.span`
    font-size: ${props => props.theme.dashboard.player.slash.fontSize};
    color: ${props => props.theme.dashboard.player.slash.color};
    margin: ${props => props.theme.dashboard.player.slash.margin};
    ${props => props.theme.dashboard.player.slash.extend.trim()};
`

class DashboardPlayer extends Component {
    static propTypes = {
        currentDashboardIndex: PropTypes.number.isRequired,
        dashboards: PropTypes.array.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        previous: PropTypes.func.isRequired,
        next: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const {
            dashboards,
            currentDashboardIndex,
            isPlaying,
            play,
            pause,
            previous,
            next,
            theme,
        } = this.props

        const iconColor = theme.colors.icon

        let icon
        let handler
        if (isPlaying) {
            icon = 'plus'
            handler = pause
        } else {
            icon = 'plusSparks'
            handler = play
        }

        return (
            <Container>
                <Button onClick={previous}>
                    <MorphIcon type="arrowLeft" size={32} color={iconColor} />
                </Button>
                <Page>{currentDashboardIndex + 1}</Page>
                <Slash>/</Slash>
                <Page>{dashboards.length}</Page>
                <PlayButton onClick={handler}>
                    <PlayIcon type={icon} size={32} isPlaying={isPlaying} color={iconColor} />
                </PlayButton>
                <Button onClick={next}>
                    <MorphIcon type="arrowRight" size={32} color={iconColor} />
                </Button>
            </Container>
        )
    }
}

export default withTheme(DashboardPlayer)
