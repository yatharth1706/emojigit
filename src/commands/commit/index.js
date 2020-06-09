const execa = require('execa');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fetch = require('node-fetch');

function commit() {
    try{
        // first ask questions about what is the commit message and then ask which emoji you want to use
        fetch('https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json')
        .then((res) => res.json())
        .then((data) => {
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
                    },
                    {
                        type: 'input',
                        name: 'commitMessage',
                        message: 'Type Commit Message:'
                    }
                ]
            ).then((answers) => {
                try{
                    ( async () => {
                        const {stdout} = await execa('git', ['commit','-m',`${answers.chooseEmoji.split("-")[2]} - ${answers.commitMessage}`]);
                        console.log(chalk.cyan(stdout));
                        const {stdoutt} = await execa('git', ['push', '-u', 'origin', 'master']);
                        console.log(chalk.green("Pushed Successfully to your github repo!!"));   
                    })();
                
                }catch(error){
                    console.log(error);
                }
                        
            })
        })   

    }catch(error){
        console.log(error);
    }
}

module.exports = {
    commit
}