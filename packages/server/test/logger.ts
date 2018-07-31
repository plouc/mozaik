declare var jest

import { LeveledLogMethod } from 'winston'

export default () => ({
    info: jest.fn() as LeveledLogMethod,
    warn: jest.fn() as LeveledLogMethod,
    error: jest.fn() as LeveledLogMethod,
    debug: jest.fn() as LeveledLogMethod,
})
