'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

/**
 * Loads and parse a yaml file.
 *
 * @param {string} path - Path to yaml file
 * @return {Object|string} Parsed yaml data
 */
module.exports = path =>
    new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err)

            try {
                const parsed = yaml.safeLoad(data)
                resolve(parsed)
            } catch (err) {
                return reject(err)
            }
        })
    })
