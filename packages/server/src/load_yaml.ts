import * as fs from 'fs'
import * as yaml from 'js-yaml'

/**
 * Loads and parse a yaml file.
 */
export default (path: string): any =>
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
