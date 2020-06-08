const fetch = require('node-fetch');
const inquirer = require('inquirer');

const list = () => {
    fetch('https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json')
    .then((res) => res.json())
    .then((data) => {
        let tempEmojis = data.gitmojis;
        let emojis = [];
        tempEmojis.forEach((el) => {
            emojis.push({
                "name" : `${el.emoji} - ${el.description}`
            })
        });

        inquirer
        .prompt(
            [
                {
                    type: 'list',
                    name: 'chooseEmoji',
                    message: 'Choose any emoji from below:',
                    choices: emojis
                }
            ]
        ).then((answers) => {
            console.log(answers);
        })
    })
}

module.exports = {
    list
}