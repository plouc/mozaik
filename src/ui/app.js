import './styl/mozaik.styl'
//import 'font-awesome/css/font-awesome.css'

import React          from 'react'
import { Provider }   from 'react-redux'
import Mozaik         from './containers/MozaikContainer'
import configureStore from './configureStore'


const MozaikWrapper = () => {
    const store = configureStore({})

    return (
        <Provider store={store}>
            <Mozaik/>
        </Provider>
    )
}

export default MozaikWrapper
