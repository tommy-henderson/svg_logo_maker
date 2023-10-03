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
            }
        ])
        .then((answers) => {
            // Error handling for text prompt (user must enter 3 characters or less for logo to generate)
            if (answers.text.length > 3) {
              console.log("Must enter a value of no more than 3 characters");
              promptUser();
            } else {
              // Calling write file function to generate SVG file
              writeToFile("logo.svg", answers);
            }
          });
}
function writeToFile(fileName, answers) {
    // File starts as an empty string
    let svgData = "";
    // Sets width and height of logo container
    svgData =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> tag so that user font input layers on top of polygon -> not behind
    svgData += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgData += `${answers.shape}`;
  
    // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === "Triangle") {
      shapeChoice = new Triangle();
      svgData += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
      shapeChoice = new Square();
      svgData += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      shapeChoice = new Circle();
      svgData += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
  
    // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
    svgData += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgData += "</g>";
    // Closing </svg> tag
    svgData += "</svg>";
  
    // Using file system module to generate svg file, takes in file name given in the promptUser function, the svg string, and a ternary operator which handles logging any errors, or a "Generated logo.svg" message to the console  
    fs.writeFile(fileName, svgData, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
  }
  
  promptUser();