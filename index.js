const fs = require('fs');
const inquirer = require("inquirer");
const { Triangle, Square, Circle } = require('./lib/shapes.js')

function promptUser() {
  inquirer.prompt([
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
    }
  ])
    .then((answers) => {
      if (answers.initials.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}

function writeToFile(fileName, answers) {
  let svgData = "";
  svgData =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgData += "<g>";
  svgData += `${answers.shape}`;

  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgData += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgData += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgData += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
  }

  svgData += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.initials}</text>`;
  svgData += "</g>";
  svgData += "</svg>";

  fs.writeFile(fileName, svgData, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

promptUser()