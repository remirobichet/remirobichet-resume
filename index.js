#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./data.json");

// add response color
const whiteBgBlue = chalk.bold.white.bgBlue;
const blue = chalk.bold.blue;
const green = chalk.bold.green;
const green_ = chalk.bold.underline.green;
const grey = chalk.bold.grey;

const resumeOptions = {
    type: "list",
    name: "resumeOptions",
    message: "What do you want to know",
    choices: [...Object.keys(data), "Exit"]
};

function showResume() {
    console.log(grey(new inquirer.Separator()));
    console.log();
    console.log(green("Hey! I'm ") + green_("Rémi Robichet") + green(", 23 years old front developer 🎉"));
    console.log(green("Passionate about the web and internet culture 💻"));
    console.log(green("Also love hiking and nature 🏔️"));
    console.log();
    console.log(grey(new inquirer.Separator()));
    handleResume();
}

function handleResume() {
    inquirer.prompt(resumeOptions).then(answer => {
        if (answer.resumeOptions === "Exit") {
            console.log(green("Bye bye 👋"));
            return;
        };

        const options = data[`${answer.resumeOptions}`]
        if (options) {
            console.log(grey(new inquirer.Separator()));
            console.log();
            if (answer.resumeOptions === 'Education & Experience') {
                options.forEach(info => {
                    console.log(whiteBgBlue(info.date));
                    console.log(blue(info.mission));
                    console.log();
                });
            } else {
                options.forEach(info => {
                    console.log(blue(info));
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
                return;
            }
        });
    }).catch(err => console.log('Ooops,', err))
}

showResume();
