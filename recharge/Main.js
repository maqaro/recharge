var readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question("What's your name?", function (name) {
    console.log("Hi ".concat(name, "!"));
    readline.close();
});
