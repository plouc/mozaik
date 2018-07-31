declare var jest, it, expect

import * as path from 'path'
import loadYaml from '../src/load_yaml'

it('should reject when file does not exist', () => {
    expect.assertions(1)

    return loadYaml('noent.yml').catch(err =>
        expect(err.message).toEqual(`ENOENT: no such file or directory, open 'noent.yml'`)
    )
})

it('should reject when file is not a valid yaml', () => {
    expect.assertions(1)

    return loadYaml(path.join(__dirname, 'fixtures', 'config', 'invalid.yml')).catch(err =>
        expect(err.message).toContain(
            `end of the stream or a document separator is expected at line 2, column 2`
        )
    )
})

it('should return parsed yaml', () => {
    expect.assertions(1)

    return loadYaml(path.join(__dirname, 'fixtures', 'config', 'valid.yml')).then(data => {
        expect(data).toEqual(`I'm an valid yaml file for testing purpose`)
    })
})
