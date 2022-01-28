const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./Develop/lib/Manager");
const Intern = require("./Develop/lib/Intern");
const Engineer = require("./Develop/lib/Engineer");
const newHtml = require("./Develop/util/generateHtml");

let teamLineup = [];

const startTeam = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What's your team manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's their ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's their email?",
            name: "email",
        },
        {
            type: "input",
            message: "What's your their office number?",
            name: "office",
        }
    ])
        .then((input) => {
            const newMember = new Manager(input.name, input.id, input.email, input.office);
            teamLineup.push(newMember);
            addMember();
        }) 
    }

const addMember = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Add an intern or engineer to the team? Or all done?",
            choices: ["Add an intern", "Add an engineer", "All done!"],
            name: "addMore",
        }
    ]) 
        .then((input) => {
            switch(input.addMore) {
                case "Add an intern":
                    addIntern();
                    break;
                case "Add an engineer":
                    addEngineer();
                    break;
                case "All done!":
                    console.log("All done!");
                    finishPage();
                    break;
            }
        });
    }

const addIntern = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What's your intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's their ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's their email?",
            name: "email",
        },
        {
            type: "input",
            message: "What school are you studying at?",
            name: "school",
        }
    ]) 
        .then((input) => {
            const newMember = new Intern(input.name, input.id, input.email, input.school);
            teamLineup.push(newMember);
            addMember();
        })
    }

const addEngineer = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What's their name?",
            name: "name",
        },
        {
            type: "input",
            message: "What's their ID?",
            name: "id",
        },
        {
            type: "input",
            message: "What's their email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your github username?",
            name: "github",
        }
    ]) 
        .then((input) => {
            const newMember = new Engineer(input.name, input.id, input.email, input.github);
            teamLineup.push(newMember);
            addMember();
        })
    }

const finishPage = () => {
    fs.writeFile('./index.html', newHtml(teamLineup), (err) =>
    err ? console.error(err) : console.log('Success!'));
}

startTeam();