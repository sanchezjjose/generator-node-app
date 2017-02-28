"use strict";

const Base = require('yeoman-generator').Base;
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const GithubApi = require('github');

const github = new GithubApi({
    version: "3.0.0"
});

const QUESTIONS = [
    {
        type: 'input',
        name: 'app:name',
        message: 'Node Application Name (no spaces)'
    },
    {   
        type: 'input',
        name: 'app:description',
        message: 'Node Application Description'
    },
    {
        type: 'input',
        name: 'github:user',
        message: 'GitHub Username'
    },
    {   
        type: 'confirm',
        name: 'repository:create',
        message: 'Create repository in GitHub?'
    }
];

module.exports = class AppGenerator extends Base {
    prompting() {
        const done = this.async();
 
        this.log(yosay('Welcome to the exciting node application module generator!'));
        
        this.prompt(QUESTIONS, answers => {
            this.answers = answers;

            const moduleName = answers['app:name'];
            const moduleDir = path.join(process.cwd(), moduleName);
            
            mkdirp(moduleName);
            process.chdir(moduleDir);

            this.log(chalk.bold.green(`Created a ${moduleName} directory for your module.`));

            done();
        });
    }

    writing() {
        this.directory('bin', 'bin');
        this.directory('clients', 'clients');
        this.directory('config', 'config');
        this.directory('dist', 'dist');
        this.directory('helpers', 'helpers');
        this.directory('models', 'models');
        this.directory('public', 'public');
        this.directory('routes', 'routes');
        this.directory('src', 'src');
        this.directory('test', 'test');
        this.directory('views', 'views');
        this.copy('.babelrc', '.babelrc');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('.eslintrc.json', '.eslintrc.json');
        this.copy('.gitignore', '.gitignore');
        this.copy('app.js', 'app.js');        
        this.copy('nodemon.json', 'nodemon.json');
        this.copy('_package.json', 'package.json');
        this.copy('README.md', 'README.md');
        this.copy('webpack.config.js', 'webpack.config.js');
    
        this.log(chalk.bold.green('Added files and folders to your module.'));
    }

    install() {
        this.log(chalk.bold.blue('running npm install'));

        this.npmInstall();
    }

    end() {
        const createRepo = this.answers['repository:create'];
        const githubUser = this.answers['github:user'];
        const repoName = this.answers['app:name'];
        const repoDescription = this.answers['app:description'];
        const repoUrl = `https://github.com/${githubUser}/${repoName}.git`
        const simpleGit = require('simple-git')('./');
        
        if (createRepo) {

            github.authenticate({
                type: 'oauth',
                token: process.env.GITHUB_ACCESS_TOKEN
            });

            github.repos.create({
                name: repoName,
                description: repoDescription

            }, (err, res) => {
                this.log(chalk.bold.green(`Github repo ${repoName} created for user ${githubUser}.`)); 

                simpleGit
                    .init()
                    .add('./*')
                    .commit('Initial commit')
                    .addRemote('origin', repoUrl)
                    .push('origin', 'master', (err, done) => {
                        this.log(chalk.bold.green(`Pushed changes to ${repoUrl}`));
                    });
            });
        }

        this.log(chalk.bold.green('Repository created successfully'));
    }
};

