const fs   = require('fs')
const yaml = require('js-yaml')


module.exports = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }

            try {
                const parsed = yaml.safeLoad(data)
                resolve(parsed)
            } catch (err) {
                return reject(err)
            }
        })
    })
}
