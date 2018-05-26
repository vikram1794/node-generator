# Noger

Noger is a CLI tool that can generate NodeJS directory structure with express framework. Noger generates project structure based on standard service side development, for more details on how to use Noger follow the [link](https://github.com/vikram1794/noger/blob/master/readme.md). Noger also provides functionality to **Add Rotes, Models, Api's, Functions** from CLI itself. So no overhead of writing basic code everytime you add a new functionality to your project.

## Installation
  
 To use Noger you must have [**nodejs**](https://nodejs.org/) and [**npm**](https://nodejs.org/) preinstalled in your system. To install Noger globally use 

   `npm install -g noger`

This will install Noger globally so that it can be used from anywhere in the system.

## How to use

 - To create a new NodeJS project with express, type in console  

    `ngr create <your project name>`        `or`        `ngr c <your project name>`

 - To add a new route into existing project

    `ngr route <your route name>`       `or`        `ngr r <your route name>`

 - To add a new route but not create a new model 

    `ngr route <your route name> --model false`       `or`        `ngr r <your route name> -m false`

 - To add a model into existing project use

    `ngr model <your model name>`        `or`        `ngr m <your model name>`

 - To add a api to existing project 

    `ngr api --path <Api path> --name <name of the function> --type <can be method type GET,POST,PUT,DELETE> --route <name of route> `

    `or`

    `ngr api -p <Api path> -n <name of the function> -t <can be method type GET,POST,PUT,DELETE> -r <name of route> `

In the new upadate we have intoduced new npm module noger-ui, which can be used to test the api's without using 3rd party tools/software. The module is still in beta and you can find it at this [link](https://www.npmjs.com/package/noger-ui).By default it is given in the project which will be created using noger.

- You can also install it using the following command:
    `npm install noger-ui`

## License

Apache 2.0
