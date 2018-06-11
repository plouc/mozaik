import styled from 'styled-components'

export default styled.div`
    padding-bottom: 30px;
    
    a {
        color: ${props => props.theme.accentTextColor};
        text-decoration: none;
        border-bottom: 1px solid ${props => props.theme.accentTextColor};
        
        &:hover {
            background-color: ${props => props.theme.accentTextColor};
            color: #ffffff;
        }
    }
`