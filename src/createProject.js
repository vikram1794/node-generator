const fs = require('fs');
const Promise= require('bluebird');
const chalk = require('chalk');

const createModel = require('./createModel');

function createProject(name) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync('./' + name)) {
            fs.mkdirSync('./' + name);
        }

        if (!fs.existsSync('./' + name + '/routes')) {
            fs.mkdirSync('./' + name + '/routes');
        }

        if (!fs.existsSync('./' + name + '/service')) {
            fs.mkdirSync('./' + name + '/service');
        }

        if (!fs.existsSync('./' + name + '/controller')) {
            fs.mkdirSync('./' + name + '/controller');
        }

        if (!fs.existsSync('./' + name + '/config')) {
            fs.mkdirSync('./' + name + '/config');
        }

        if (!fs.existsSync('./' + name + '/model')) {
            fs.mkdirSync('./' + name + '/model');
        }

        fs.writeFile('./' + name + '/index.js',
            `const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');        
const app = express();
const router = express.Router();

const database = require('./config/database.config');           //database configuration file
const routes = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json());

//Enter your url here for mongoDb server
const url = database.url;
const port = 3000;                                              // The port at which you want to run your app

const connect = mongoose.connect(url).then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

routes.setUp(app,router);

app.listen(port, () => {
    console.log('Server is up and running on port:' + port)
});
`, function (err) {
                if (err) reject(chalk.red(err));
                else resolve(chalk.green('Project created successfully!'));
            });

        fs.writeFile('./' + name + '/config/database.config.js',
            `module.exports = database = {
    url: 'mongodb://localhost:27017/databaseName'                //Enter your url here for mongoose
}`, function (err) {
                if (err) reject(chalk.red(err));
                else resolve(chalk.green('Project created successfully!'));
            });
    });
}

function createPackageJson(projectName, author, desc) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./' + projectName + '/package.json',
            `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "${desc}",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "${author}",
    "license": "ISC",
    "dependencies": {
        "body-parser": "*",
        "express": "*",
        "cors": "*",
        "mongoose": "*"
    }
}`          , (err) => {
                if (err) reject(chalk.red(err));
                else resolve(chalk.green('SUCCESS'));
            })
    });
}

module.exports = {
    createProject: createProject,
    createPackageJson: createPackageJson
}