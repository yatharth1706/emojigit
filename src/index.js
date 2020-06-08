#! /usr/bin/env node

const fs = require('fs');
const fetch = require("node-fetch");
const inquirer = require('inquirer');
const meow = require('meow');
const { findCommand }= require('./utils/findCommand');
const { list } = require('./commands/list');

const cli = meow(
    `
    Usage
      $ yv-cli
    Options
      --list, -l      List all the available gitmojis
      --version, -v   Print gitmoji-cli installed version
    Examples
      $ gitmoji -l
      $ gitmoji bug linter -s
  `,
    {
      flags: {
        list: { type: 'boolean', alias: 'l' },
        version: { type: 'boolean', alias: 'v' }
      }
    }
  )

const options = {
    list : () => list()
}

findCommand(cli,options);





