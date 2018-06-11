import { css } from 'styled-components'

export default {
    mobile: (...args) => css`
        @media screen and (max-width: 768px) {
            ${css(...args)}
        }
    `,
    tablet: (...args) => css`
        @media screen and (min-width: 480px) {
            ${css(...args)}
        }
    `,
    desktop: (...args) => css`
        @media screen and (min-width: 769px) {
            ${css(...args)}
        }
    `
}