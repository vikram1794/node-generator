const { prompt } = require('inquirer');
const fs = require('fs');
const Promise= require('bluebird');
const chalk = require('chalk');

const modelQuestions = [
    {
        type: 'input',
        name: 'propertyName',
        message: 'Property name: '
    },
    {
        type: 'list',
        name: 'propertyType',
        message: 'Property type: ',
        choices: ['String', 'Number', 'Boolean', 'Date']
    },
    {
        type: 'confirm',
        name: 'propertyRequired',
        message: 'Required: '
    }
]

const propertyArray = [];

function addProperty() {
    return prompt({
        type: 'confirm',
        name: 'addProperty',
        message: 'Want to add property'
    }).then((result) => {
        if (result.addProperty) {
            return prompt(modelQuestions).then((answers) => {
                propertyArray.push(answers);
                return addProperty();
            })
        }
        else {
            return propertyArray;

        }
    })
}

function createModelFile(modelName, properties) {
    return new Promise((resolve, reject) => {
        let modelString =
            `const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ${modelName}Schema = new Schema({
`;
        for (i = 0; i < properties.length; i++) {
            modelString +=
                `   ${properties[i].propertyName}: {
        type: ${properties[i].propertyType},
        required: ${properties[i].propertyRequired}
    }${i < properties.length - 1 ? ',' : ''}
`;
        }
        modelString +=
            `});

module.exports = mongoose.model('${modelName}', ${modelName}Schema);
`

        fs.appendFile(process.cwd() + '/model/' + modelName + '.model.js', modelString, function (err) {
            if (err) reject(chalk.red(err));
            resolve(chalk.green(modelName + ' model created successfully!'));
        });
    })

}

const createModel = {
    addProperty: addProperty,
    createModelFile: createModelFile
}

module.exports = createModel;