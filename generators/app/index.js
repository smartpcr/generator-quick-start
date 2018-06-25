'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-react-with-typescript')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const tempalteFiles = [
      '.editorconfig',
      'tsconfig.json',
      'tslint.json',
      'webpack.config.js'
    ];

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );

    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));

    tempalteFiles.forEach(element => {
      this.fs.copy(this.templatePath(element), this.destinationPath(element));
    });
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
