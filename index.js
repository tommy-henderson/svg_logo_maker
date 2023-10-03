const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes.js')

function promptUser() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the initials of your company? (Enter up to 3 characters)",
                name: "initials",
            },
            {
                type: "list",
                message: "What is the shape of your logo?",
                choices: ['Circle', 'Square', 'Triangle'],
                name: "shape",
            },
            {
                type: "input",
                message: "What color would you like the text to be?",
                name: "textColor",
            },
            {
                type: "input",
                message: "What color would you like the shape to be?",
                name: "shapeColor",
            },
        ])
}