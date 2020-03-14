#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const bent = require("bent");
const getJSON = bent('json');
let data = {};

// add response color
const whiteBgBlue = chalk.bold.white.bgBlue;
const blue = chalk.bold.blue;
const green = chalk.bold.green;
const green_ = chalk.bold.underline.green;
const grey = chalk.bold.grey;

const getHttpData = async () => {
    data = await getJSON('http://functions.remirobichet.fr/.netlify/functions/api/me?lang=en');
    showResume()
};

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const showResume = () => {
    console.log(grey(new inquirer.Separator()));
    console.log();
    console.log(green("Hey! I'm ") + green_("Rémi Robichet") + green(", 23 years old front developer 🎉"));
    console.log(green("Passionate about the web and internet culture 💻"));
    console.log(green("Also love hiking and nature 🏔️"));
    console.log();
    console.log(grey(new inquirer.Separator()));
    handleResume();
};

function handleResume() {
    const options = {
        type: "list",
        name: "resumeOptions",
        message: "What do you want to know",
        choices: [...Object.keys(data), "exit"].map(x => capitalize(x))
    };
    inquirer.prompt(options).then(answer => {
        if (answer.resumeOptions === "Exit") {
            console.log(green("Bye bye 👋"));
            return;
        }
        const options = data[`${answer.resumeOptions}`.toLowerCase()];
        if (options) {
            console.log(grey(new inquirer.Separator()));
            console.log();
            if (answer.resumeOptions === 'Career') {
                options.forEach(info => {
                    console.log(whiteBgBlue(info.date));
                    console.log(blue(info.mission));
                    console.log();
                });
            } else if (answer.resumeOptions === 'Skills') {
                let buffer = '';
                options.forEach((info, it) => {
                    buffer += whiteBgBlue(info) + ' ';
                    if ((it + 1) % 3 === 0) {
                        console.log(buffer);
                        console.log();
                        buffer = '';
                    }
                    if (it + 1 === options.length) {
                        console.log(buffer);
                        console.log();
                    }
                });
            } else if (answer.resumeOptions === 'Contact') {
                options.forEach(info => {
                    console.log(info.icon + '  ' + blue(info.data));
                    console.log();
                });
            }
            console.log(grey(new inquirer.Separator()));
        }

        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            }).then(choice => {
            if (choice.exitBack === "Back") {
                handleResume();
            } else {
                console.log(green("Bye bye 👋"));
            }
        });
    }).catch(err => console.log('Ooops, ', err))
}

getHttpData();
