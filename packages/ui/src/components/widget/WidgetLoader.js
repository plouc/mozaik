import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const WidgetLoader = ({ color }) => (
    <SpinnerContainer>
        <StyledSpinner viewBox="0 0 50 50" color={color}>
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
        </StyledSpinner>
    </SpinnerContainer>
)

WidgetLoader.propTypes = {
    color: PropTypes.string,
}

const SpinnerContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
`

const StyledSpinner = styled.svg`
    animation: rotate 2s linear infinite;
    height: 50px;

    & .path {
        stroke: ${props => props.color};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`

export default WidgetLoader
