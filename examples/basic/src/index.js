import React from 'react'
import ReactDOM from 'react-dom'
import Mozaik, { Registry } from '@mozaik/ui'
import github from '@mozaik/ext-github'
import travis from '@mozaik/ext-travis'

Registry.addExtensions({
    github,
    travis,
})

ReactDOM.render(<Mozaik />, document.getElementById('root'))

/*
//import solarizedDark from 'mozaik-themes/themes/solarized-dark'
//import nightBlue     from 'mozaik-themes/themes/night-blue'
//import sunny         from 'mozaik-themes/themes/sunny'
//import wine          from 'mozaik-themes/themes/wine'
//import snow          from 'mozaik-themes/themes/snow'
//import mini          from 'mozaik-themes/themes/mini'
//import miniKuro      from 'mozaik-themes/themes/mini-kuro'
//
//import 'mozaik-themes/themes/solarized-dark.css'
//import 'mozaik-themes/themes/night-blue.css'
//import 'mozaik-themes/themes/sunny.css'
//import 'mozaik-themes/themes/wine.css'
//import 'mozaik-themes/themes/snow.css'
//import 'mozaik-themes/themes/mini.css'
//import 'mozaik-themes/themes/mini-kuro.css'
//
//ThemeManager.add(solarizedDark)
//ThemeManager.add(nightBlue)
//ThemeManager.add(sunny)
//ThemeManager.add(wine)
//ThemeManager.add(snow)
//ThemeManager.add(mini)
//ThemeManager.add(miniKuro)
//
//ThemeManager.defaultTheme = nightBlue.name
*/
