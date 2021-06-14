import test, {afterEach, beforeEach} from 'ava'
import {Session} from "neo4j-driver";
import {FilmFacts} from "../src/FilmFacts";
import exp = require("constants");
const proxyquire =  require('proxyquire')
const {stdout} = require('stdout-stderr')

const expectedFilmData: FilmFacts = {
    tagline: 'myTest',
    year: 1999,
}

const emptyFilmData: FilmFacts = {
    tagline: '',
    year: 0,
}

async function mockGetFilmName(): Promise<string> {
    return 'Hoffa'
}

async function mockGetFilmNameNonExistent(): Promise<string> {
    return 'NonExistent'
}


async function mockFilmInfo(title: string, session: Session):
    Promise<FilmFacts> {
    if (title==='Hoffa') return  expectedFilmData
    return emptyFilmData
}

const filmInfoStub: any = {}

async function mockFilmInfoEmpty(title: string, session: Session):
    Promise<FilmFacts> {
    return  emptyFilmData
}

const getFileNameStub: any = {}
const {interactiveGetFilmInfo} = proxyquire('../src/interactiveGetFilmInfo', {
    './getFilmName': getFileNameStub,
    './filmInfo': {'filmInfo': mockFilmInfo},
})

beforeEach(t => {
    stdout.start()
})

test.serial('interactiveGetFilmInfo basic', async t => {
    getFileNameStub.getFilmName = mockGetFilmName
    await interactiveGetFilmInfo()
    stdout.stop();
    t.regex(stdout.output, /info about the film 'Hoffa'/)
});

test.serial('interactiveGetFilmInfo not found', async t => {
    getFileNameStub.getFilmName = mockGetFilmNameNonExistent
    await interactiveGetFilmInfo()
    stdout.stop();
    t.regex(stdout.output, /info is stored about the film/)
});

afterEach(t => {

})
