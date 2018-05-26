const fs = require('fs');
const functionUtil = require('./util/functions.util');
const Promise = require('bluebird');
const chalk = require('chalk');

function createApiRoute(name, type, routeName, pathName) {
    return new Promise((resolve, reject) => {
        fs.exists(process.cwd() + `/service/${routeName}.service.js`, (exists) => {
            if (!exists) {
                reject(new Error("Route doesn't exist"));
            }
            else {
                fs.readFile(process.cwd() + '/routes/routes.js', function read(err, data) {
                    if (err) {
                        reject(chalk.red(err));
                    }
                    var file_content = data.toString();
                    functionUtil.appendingData(file_content.indexOf("{") + 1, process.cwd() + '/routes/routes.js',
                        `
    app.${type}('/${pathName}', ${routeName}Controller.${name});
        `)
                });
                resolve(chalk.green('Not undefined'));
            }
        });

    }).then(() => {
        let filePath = process.cwd() + `/service/${routeName}.service.js`;
        return creatingConst(filePath, name, type, routeName)
    }).then(() => {
        let filePath = process.cwd() + `/service/${routeName}.service.js`;
        return creatingFunctionInService(filePath, name, type, routeName)
    }).then(() => {
        let filePath = process.cwd() + `/controller/${routeName}.controller.js`;
        return creatingConst(filePath, name, type, routeName)
    }).then(() => {
        let filePath = process.cwd() + `/controller/${routeName}.controller.js`;
        return creatingFunctionInController(filePath, name, type, routeName)
    }).then(() => {
        updatingNogerJsonFile(pathName, name, type, routeName);
    }).then(() => {
        return chalk.green("Function created Successfully");
    }).catch((err) => {
        return chalk.red(err);
    });
}

function creatingConst(filePath, name, type, routeName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function read(err, data) {
            if (err) {
                reject(err);
            }
            var file_content = data.toString();

            let appendingData = '';
            if (file_content.lastIndexOf(`}`) - file_content.lastIndexOf(`{`) > 4) {
                appendingData +=
                    `   
    ${name}: ${name},`;
            }
            else {
                appendingData +=
                    ` 
    ${name}: ${name}`;
            }
            resolve(functionUtil.appendingData(file_content.lastIndexOf(`{`) + 1, filePath, appendingData));
        });

    });
}

function creatingFunctionInService(filePath, name, type, routeName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function read(err, data) {
            if (err) {
                reject(chalk.red(err));
            }
            var file_content = data.toString();
            resolve(functionUtil.appendingData(file_content.lastIndexOf(`const`) - 1, filePath,
                `
function ${name} (data) {
    return new Promise((resolve, reject) => {

    });
}
`));
        });
    })
}

function creatingFunctionInController(filePath, name, type, routeName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function read(err, data) {
            if (err) {
                reject(chalk.red(err));
            }
            var file_content = data.toString();
            resolve(functionUtil.appendingData(file_content.lastIndexOf(`const`) - 1, filePath,
                `
function ${name} (req, res, next) {
    ${routeName}Service.${name}(req).then((response) => {
        res.statusCode = 200;
        res.json(response)
    }).catch((err) => {
        res.statusCode = 500;
        res.json(err);
    });
}
`));
        });
    })
}

function updatingNogerJsonFile(pathName, name, type, routeName) {
    return new Promise((resolve, reject) => {
        const nogerFile = require(process.cwd() + `/noger.json`);

        nogerFile.route.push(routeName);
        nogerFile.path.push(pathName);
        nogerFile.type.push(type);
        nogerFile.name.push(name);
        fs.writeFile(process.cwd() + '/noger.json', JSON.stringify(nogerFile, undefined, 4), (err) => {
            if (err) reject(chalk.red(err));
            else resolve(chalk.green('SUCCESS'));
        })
    });
}

const createApi = {
    createApiRoute: createApiRoute
}

module.exports = createApi;