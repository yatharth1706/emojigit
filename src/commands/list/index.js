const fetch = require('node-fetch');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const emojisSpinner = ora({
    text: "Loading Emojis!!"
});

const list = () => {
    emojisSpinner.start();
    fetch('https://raw.githubusercontent.com/yatharth1706/emojigit/master/src/data/emojis.json')
    .then((res) => res.json())
    .then((data) => {
        emojisSpinner.succeed(chalk.magenta("Successfully Loaded!!"));
        let tempEmojis = data.gitmojis;
        let emojis = [];
        tempEmojis.forEach((el) => {
            emojis.push({
                "name" : `${el.emoji} - ${el.description} - ${el.code}`
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
            console.log(chalk.yellow.inverse("Github Code for chosen emoji is:"),answers.chooseEmoji.split("-")[2]);
        })
    })
}

module.exports = {
    list
}