import * as winston from 'winston'
import { LeveledLogMethod } from 'winston'

export interface Logger {
    error: LeveledLogMethod
    warn: LeveledLogMethod
    info: LeveledLogMethod
    debug: LeveledLogMethod
}

export default winston
