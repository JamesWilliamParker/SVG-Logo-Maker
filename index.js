const fs = require('fs');
const inquirer = require('inquirer').default; // Import Inquirer for user input
const { Triangle, Circle, Square } = require('./lib/shapes'); // Import shape classes

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: input => input.length <= 3 || 'Text must be 3 characters or less.'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color for the text (color keyword or hex):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Triangle', 'Circle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color for the shape (color keyword or hex):',
  },
];

inquirer.prompt(questions).then(answers => {
  let shape;
  switch (answers.shape) {
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Circle':
      shape = new Circle();
      break;
    case 'Square':
      shape = new Square();
      break;
  }
  shape.setColor(answers.shapeColor);

  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
</svg>`;

  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
});
