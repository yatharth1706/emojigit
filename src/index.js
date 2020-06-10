#! /usr/bin/env node

const fs = require('fs');
const fetch = require("node-fetch");
const inquirer = require('inquirer');
const meow = require('meow');
const { findCommand }= require('./utils/findCommand');
const { list } = require('./commands/list');
const { commit } = require('./commands/commit');

const cli = meow(
    `
    Usage
      $ emojigit
    Options
      --list, -l      List all the available gitmojis
      --commit, -c    Commit to github Repository
      --version, -v   Print gitmoji-cli installed version
    Examples
      $ emojigit -l
      $ emojigit -c
  `,
    {
      flags: {
        list: { type: 'boolean', alias: 'l' },
        commit : { type: 'boolean', alias: 'c'},
        version: { type: 'boolean', alias: 'v' }
      }
    }
  )

const options = {
    list : () => list(),
    commit : () => commit()
}

findCommand(cli,options);





