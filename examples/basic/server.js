'use strict'

require('dotenv').load({ silent: true })

const path = require('path')
const Mozaik = require('@mozaik/server')

let configFile = process.argv[2] || 'conf/config.yml'

console.log(`using config file: ${configFile}\n`)

Mozaik.configureFromFile(path.join(__dirname, configFile))
    .then(config => {
        console.log(config)
        Mozaik.registerApi('github', require('@mozaik/ext-github/client'))
        Mozaik.registerApi('travis', require('@mozaik/ext-travis/client'))
        //Mozaik.registerApi('gitlab',    require('mozaik-ext-gitlab/client'))
        //Mozaik.registerApi('analytics', require('mozaik-ext-analytics/client'))

        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })
