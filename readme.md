# Node Generator

Node Genrator is a CLI tool that can generate NodeJS directory structure with express framework. Node Genrator generates project structure based on standard service side development, for more details on how to use Node Generator follow the [link](https://github.com/vikram1794/node-generator/blob/master/readme.md). Node Genrator also provides functionality to **Add Rotes, Models, Api's, Functions** from CLI itself. So no overhead of writing basic code everytime you add a new functionality to your project. 

## Installation
  
 To use Node Genrator you must have [**nodejs**](https://nodejs.org/) and [**npm**](https://nodejs.org/) preinstalled in your system. To install Node Genrator globally use 

   `npm install -g noger`

This will install Node Genrator globally so that it can be used from anywhere in the system.

## How to use

 - To create a new NodeJS project with express, type in console  

    `ngr create <your project name>`        `or`        `ngr c <your project name>`

 - To add a new route into existing project

    `ngr genrate route <your route name>`       `or`        `ngr gr <your route name>`

 - To add a new route but not create a new model 

    `ngr genrate route <your route name> --model false`       `or`        `ngr gr <your route name> -m false`

 - To add a model into existing project use

    `ngr generate model <your model name>`        `or`        `ngr gm <your model name>`

 - To add a api to existing project 

    `ngr generate api --path <Api path> --name <name of the function> --type <can be method type GET,POST,PUT,DELETE> --route <name of route> `

    `or`

    `ngr gapi -p <Api path> -n <name of the function> -t <can be method type GET,POST,PUT,DELETE> -r <name of route> `


## License

Apache 2.0
