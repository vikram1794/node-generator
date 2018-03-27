#!/usr/bin/env node

const commander = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const functions = require('./src/createProject');
const createModel = require('./src/createModel');
const createRoute = require('./src/createRoute');
const createApi = require('./src/createApi');
const figlet = require('figlet');

const questions = [
    {
        type: 'input',
        name: 'author',
        message: 'author:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'description'
    }
]

commander
    .version('1.0.0')
    .option('-v, --version ', 'version')
    .description('Node Generator framework');





commander.command('create <name>')
    .alias('c')
    .action((name) => {
        functions.createProject(name).then((data) => {
            // global.projectName = name;
            prompt(questions).then(answers => {
                functions.createPackageJson(name, answers.author, answers.description).then((result) => {
                    createRoute.createRouteFile(name).then((result) => {
                        console.log(result);
                    });
                });
            });
        });
    });

commander.command('genrate route <routeName>')
    .alias('gr')
    .option('-m, --model <value>', 'Model needed or not', "true")
    .action((routeName, cmd) => {
        var modelStatus = (cmd.model === "true");
        createRoute.createRoutes(routeName, modelStatus).then((result) => console.log(result));
    });

commander.command('generate model <modelName>')
    .alias('gm')
    .action((modelName) => {
        createModel.addProperty().then((properties) => {
            createModel.createModelFile(modelName, properties)
                .then((result) => {
                    console.log(result);
                })
        });
    });

commander.command('generate api')
    .alias('gapi')
    .option('-n --name <name>', 'API fuction Name')
    .option('-t --type <type>', 'Function type')
    .option('-r --route <route>', 'Route Name')
    .option('-p --path <path>', 'API Name')
    .action((cmd) => {
        createApi.createApiRoute(cmd.name, cmd.type, cmd.route, cmd.path).then((result => {
            console.log(result);
        }));
    });
    
commander.parse(process.argv);