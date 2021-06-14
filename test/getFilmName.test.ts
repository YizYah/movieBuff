import test from 'ava';

import {getFilmName} from "../src/getFilmName";

const {stdout} = require('stdout-stderr')

test('mockSessionFromQuerySet returns correct output', async t => {
    const stdin = require('mock-stdin').stdin();
    const expectedOutput = 'sampleFilmName'
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    process.nextTick(async () => {
        stdin.send(expectedOutput);
        stdin.send(`\n`);
        await delay(10);
    });

    stdout.start()
    const output = await getFilmName()
    stdout.stop()
    t.deepEqual(output,expectedOutput)
});
