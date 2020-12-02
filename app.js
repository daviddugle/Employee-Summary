const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamMake = [];

const whatNext = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to add next",
            choices: ["Engineer", "Intern", "Completed"],
            name: "next",
        }

    ])
        .then(({ next }) => {
            if (next === "Engineer") {
                buildEngineer()
            }
            else if (next === "Intern") {
                buildIntern();
            }
            else {
                buildTeam();
            }
        })
}

const buildManager = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is your id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
        },
    ])
        .then(({ name, id, email, officeNumber }) => {
            const newMgr = new Manager(name, id, email, officeNumber)
            console.log(newMgr);
            teamMake.push(newMgr);
            whatNext();
        })
}
buildManager();

const buildEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is your id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your Github name?",
            name: "github",
        },
    ])
        .then(({ name, id, email, github }) => {
            const newEngineer = new Engineer(name, id, email, github)
            console.log(newEngineer);
            teamMake.push(newEngineer);
            whatNext();
        })
};
const buildIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",

        },
        {
            type: "input",
            message: "What is your id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your School Name",
            name: "school",
        },
    ])
        .then(({ name, id, email, school }) => {
            const newIntern = new Intern(name, id, email, school)
            console.log(newIntern);
            teamMake.push(newIntern);
            whatNext();
        })
};


const buildTeam = () =>{
   
    if (!fs.existsSync(OUTPUT_DIR)) {
        
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, render(teamMake), (err) =>
  err ? console.error(err) : console.log('Success!')
);



};