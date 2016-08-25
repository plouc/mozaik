const test     = require('ava')
const path     = require('path')
const yaml     = require('js-yaml')
const loadYaml = require('../../src/server/loadYaml')

test('should reject when file does not exist', t => {
    t.throws(loadYaml('invalid'), err => {
        t.true(err instanceof Error)
        t.is(err.code, 'ENOENT')
        return true
    })
})

test('should reject when file is not a valid yaml', t => {
    t.throws(loadYaml(path.join(__dirname, '..', 'files', 'invalid-yaml.yml')), err => {
        t.true(err instanceof yaml.YAMLException)
        return true
    })
})

test('should return parsed yaml', t => {
    return loadYaml(path.join(__dirname, '..', 'files', 'valid-yaml.yml')).then(parsed => {
        t.is(parsed, `I'm an valid yaml file for testing purpose`)
        return true
    })
})
