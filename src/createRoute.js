const fs = require('fs');
const Promise= require('bluebird');
const chalk = require('chalk');

const functionsUtil = require('./util/functions.util');
const createModel = require('./createModel');

function createRouteFile(projectName) {
    return new Promise((resolve, reject) => {
        fs.writeFile(process.cwd() + `/${projectName}/routes/` + 'routes.js',
            `
const express = require('express');
const router = express.Router();
function setUp(app, router) { 
    //define your routes here 
    //router.get('/test',controllerName.functionName); 
}

module.exports.setUp = setUp`, function (err) {
                if (err) reject(chalk.red(err));
                else {
                   
                    resolve(chalk.green('Project created successfully!'));
                }
            });
    });
}

function createRoutes(routeName, modelStatus) {
    return new Promise((resolve, reject) => {
        if (modelStatus) {
            createModel.addProperty().then((properties) => {
                createModel.createModelFile(routeName, properties)
                    .then((result) => {
                        resolve(chalk.green(result));
                    })
            });
        }else{
            resolve(chalk.green('Model is not created'));
        }
    }).then((result) => {
        let appendingData = '';
        if (modelStatus) {
            appendingData += `const ${routeName.charAt(0).toUpperCase() + routeName.substr(1)} = require('../model/${routeName}.model');\n`;
        }
        appendingData +=
            ` 
const ${routeName}Service = {

} 

module.exports = ${routeName}Service;`;

        fs.appendFile(process.cwd() + '/service/' + routeName + '.service.js', appendingData, function (err) {
            if (err) throw err;
            else result += '\n' + routeName + ' service created successfully!';
        });
        return chalk.green(result);
    }).then((result) => {
        let appendingData =
            `
const ${routeName}Service = require('../service/${routeName}.service');\n

const ${routeName}Controller = {

} 
    
module.exports = ${routeName}Controller;`;

        fs.appendFile(process.cwd() + '/controller/' + routeName + '.controller.js', appendingData, function (err) {
            if (err) throw (err);
            else chalk.green(result += '\n' + routeName + ' controller created successfully!');
        });
        return result;
    }).then((result) => {
        functionsUtil.appendingData(0, process.cwd() + '/routes/routes.js', `const ${routeName}Controller = require('../controller/${routeName}.controller');\n`);

        // result += '\n' + 'routes are created successfully But not updated the routes.js file';
        return result;
    }).catch((err) => console.log(chalk.red(err)));
}

const createRoute = {
    createRouteFile: createRouteFile,
    createRoutes: createRoutes
}

module.exports = createRoute;