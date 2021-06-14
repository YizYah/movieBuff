import test from 'ava'

const neo4j = require('neo4j-driver');
import {getSession} from '../src/getSession'

test('getSession with database', async t => {
    const session = await getSession()
    // const expectedSession = driver.session({database: databaseInfo.DATABASE})
    t.is(session._database, 'movies')
})

// test('getSession without database', async t => {
//     const session = await getSession(databaseInfoNoDatabase)
//     // const expectedSession = driver.session({database: databaseInfo.DATABASE})
//     t.is(session._database, '')
// })
