import React          from 'react'
import { Provider }   from 'react-redux'
import Mozaik         from './containers/MozaikContainer'
import configureStore from './configureStore'
import ThemeProvider  from './themes/ThemeProvider'


const MozaikWrapper = () => {
    const store = configureStore({})

    return (
        <Provider store={store}>
            <ThemeProvider>
                <Mozaik/>
            </ThemeProvider>
        </Provider>
    )
}

export default MozaikWrapper
