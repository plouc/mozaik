import React from 'react'
import { Provider } from 'react-redux'
import Mozaik from './containers/MozaikContainer'
import configureStore from './configureStore'
import ThemeProvider from './components/ThemeProvider'
import ThemeManager from './theming/ThemeManager'

const MozaikWrapper = () => {
    const store = configureStore({
        themes: {
            themes: ThemeManager.listThemes(),
            current: ThemeManager.defaultTheme,
        },
    })

    return (
        <Provider store={store}>
            <ThemeProvider themes={ThemeManager.listThemes()}>
                <Mozaik />
            </ThemeProvider>
        </Provider>
    )
}

export default MozaikWrapper
