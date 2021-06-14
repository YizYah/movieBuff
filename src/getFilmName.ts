const inquirer = require('inquirer')

export async function getFilmName(): Promise<string> {
    const questions = [{
        name: 'Film',
        message: 'What film would you like to know about?',
    }]
    const answers = await inquirer.prompt(questions)
    return answers.Film
}
