import test from 'ava';

function mockInquirerPrompt(questions: any){
    return {"Film":"sampleFilmName"}
}
const proxyquire =  require('proxyquire')

const {getFilmName} = proxyquire('../src/getFilmName', {
    'inquirer': {prompt: mockInquirerPrompt}
})

test('mockSessionFromQuerySet returns correct output', async t => {
    const expectedOutput = 'sampleFilmName'
    const output = await getFilmName()
    t.deepEqual(output,expectedOutput)
});
