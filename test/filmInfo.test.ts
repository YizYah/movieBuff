import test from 'ava'

import {
    mockSessionFromQuerySet,
    QuerySpec
} from 'neo-forgery'
import {filmInfo} from '../src/filmInfo'

const {filmQuery} = require('../src/filmQuery')
const {expectedOutput} = require('./data/expectedOutput')
const title = 'Hoffa'

const querySet: QuerySpec[] = [{
    name: 'requestByTitle',
    query: filmQuery,
    params: {title},
    output: expectedOutput
}]

import {FilmFacts} from '../src/FilmFacts'
const filmFacts:FilmFacts = {
    tagline: "He didn't want law. He wanted justice.",
    year: 1992,
}

test('filmInfo main', async t => {
    const session = mockSessionFromQuerySet(querySet)
    const output = await filmInfo(title, session)
    t.deepEqual(output,filmFacts)
})

function mockRunForTypeError(){
    const e = new Error('not found')
    e.name = 'TypeError'
    throw e
}

test('filmInfo NonExistent Film', async t => {
    const emptyFilmFacts: FilmFacts = {year: 0, tagline: ''}
    const session = mockSessionFromQuerySet(querySet)
    session.run = mockRunForTypeError
    const output = await filmInfo('nonExistent', session)
    t.deepEqual(output, emptyFilmFacts)
})


test('filmInfo General Error', async t => {
    const emptyFilmFacts: FilmFacts = {year: 0, tagline: ''}
    const session = mockSessionFromQuerySet(querySet)
    session.run = ()=>{throw new Error('bogus error')}

    const error = await t.throwsAsync(async () => {
        const output = await filmInfo('title should not matter', session)
    })
    t.regex(error.message, /error getting film info/)
})
