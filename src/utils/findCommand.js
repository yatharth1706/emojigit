// We need to match the flag with the options and call the required function
function findCommand(cli, options){
    const flags = cli.flags;

    // match the flags input with the options and call necessary function
    const matchedInput = Object.keys(flags).map((flag) => flags[flag] && flag).filter((flag) => options[flag]);

    return options[matchedInput] 
    ? options[matchedInput]()
    : cli.showHelp()
}

module.exports = {
    findCommand
}