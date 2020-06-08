#! /usr/bin/env node

const fs = require('fs');
const fetch = require("node-fetch");
const inquirer = require('inquirer');
const ora = require("ora");
const spinner = ora("loading emojis").start();

fetch("https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json").then((res) => {
        return res.json();
    }).then((data) => {
        let emojis = data.gitmojis;
        let newEmojis = [];
        emojis.forEach(element => {
            newEmojis.push({
                name : `${element.name} - ${element.emoji}`
            })
        });
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = 'Loading Emojis';
        }, 1000);
        inquirer.prompt([
                {
                    type: 'list',
                    name: 'listEmoji',
                    message: 'Select emoji that you want to use: ',
                    choices: newEmojis
                },
            ])
            .then((answers) => {
                console.log(answers);
                
            });
    })




