'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {

    super(args, opts);

    this.props = {
      manager: 'Yarn',
      data: 'JSON',
      template: 'Pug, formerly known as Jade',
      preprocessor: 'Sass',
      script: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
    };

    this.promptingManagers = function() {

      return this.prompt({
        type: 'list',
        name: 'manager',
        message: 'Which option would you like to use for dependency management?',
        choices: [
          'NPM',
          'Yarn'
        ],
        default: 'Yarn'
      }).then(props => {
        this.props.manager = props.manager;
        this.prompting();
      });

    };

    this.promptingData = function() {

      return this.prompt({
        type: 'list',
        name: 'data',
        message: 'When there\'s a choice, which data-exchange format do you prefer?',
        choices: [
          'JSON',
          'YAML'
        ],
        default: 'JSON'
      }).then(props => {
        this.props.data = props.data;
        this.prompting();
      });

    };

    this.promptingTemplates = function(){

      return this.prompt({
        type: 'list',
        name: 'template',
        message: 'Which template engine, if any, would you like to use for HTML?',
        choices: [
          'EJS',
          'Handlebars',
          'Mustache',
          'Plain old HTML',
          'Pug, formerly known as Jade'
        ],
        default: 'Pug, formerly known as Jade'
      }).then(props => {
        this.props.template = props.template;
        this.prompting();
      });

    };

    this.promptingPreprocessors = function() {

      return this.prompt({
        type: 'list',
        name: 'preprocessor',
        message: 'Which CSS pre-processor, if any, would you like to use?',
        choices: [
          'Less',
          'Plain old CSS',
          'Sass',
          'SCSS, Sass with more CSS-like syntax',
          'Stylus'
        ],
        default: 'Sass'
      }).then(props => {
        this.props.preprocessor = props.preprocessor;
        this.prompting();
      });

    };

    this.promptingScripts = function() {

      return this.prompt({
        type: 'list',
        name: 'script',
        message: 'Which version or alternative of Javascript do you prefer?',
        choices: [
          'CoffeeScript',
          'ECMAScript 5 (ES5), what you probably know as vanilla JS',
          'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)',
          'ECMAScript 2016 (ES2016)',
          'ECMAScript 2017 (ES2017)',
          'Elm',
          'LiveScript',
          'oj',
          'PureScript',
          'TypeScript'
        ],
        default: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
      }).then(props => {
        this.props.script = props.script;
        this.prompting();
      });

    };

    /*this.promptingJSLib = function() {

      return this.prompt({
        type: 'checkbox',
        name: 'jslib',
        message: 'Which Javascript libraries, if any, would you like to use?',
        choices: [
          'D3',
          'jQuery',
          'Lodash',
          'Underscore'
        ],
        default:
      }).then(props => {
        this.props.jslib
      });

    };*/



  }

  initializing() {

    this.log(yosay(
      'Welcome to the funkadelic ' + chalk.red('Simple Frontend') + ' Yeoman generator!'
    ));

  }

  prompting() {

    const done = this.async();
    const alt = ' as an alternative to Javascript';
    const v = ' as a version of Javascript';
    const map = {
      //Template engines
      'EJS': [
        chalk.red('EJS') + ' as a',
        'ejs'
      ],
      'Handlebars': [
        chalk.red('Handlebars') + ' as a'
      ],
      'Mustache': [
        chalk.red('Mustache') + ' as a'
      ],
      'Plain old HTML': [
        chalk.red('no'),
        'html'
      ],
      'Pug, formerly known as Jade': [
        chalk.red('Pug'),
        'pug'
      ],
      //Pre-processors
      'Less': [
        chalk.red('Less') + ' as a'
      ],
      'Plain old CSS': [
        chalk.red('no'),
        'css'
      ],
      'Sass': [
        chalk.red('Sass') + ' as a',
        'sass'
      ],
      'SCSS, Sass with more CSS-like syntax': [
        chalk.red('SCSS') + ' as a',
        'scss'
      ],
      'Stylus': [
        chalk.red('Stylus') + ' as a'
      ],
      //JS versions/alternatives
      'CoffeeScript': [
        chalk.red('CoffeeScript') + alt
      ],
      'ECMAScript 5 (ES5), what you probably know as vanilla JS': [
        chalk.red('vanilla Javascript'),
        'js'
      ],
      'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)': [
        chalk.red('ES2015') + v,
        'js'
      ],
      'ECMAScript 2016 (ES2016)': [
        chalk.red('ES2016') + v,
        'js'
      ],
      'ECMAScript 2017 (ES2017)': [
        chalk.red('ES2017') + v,
        'js'
      ],
      'Elm': [
        chalk.red('Elm') + alt
      ],
      'LiveScript': [
        chalk.red('LiveScript') + alt
      ],
      'oj': [
        chalk.red('oj') + alt
      ],
      'PureScript': [
        chalk.red('PureScript') + alt
      ],
      'TypeScript': [
        chalk.red('TypeScript') + alt
      ]
    }

    return this.prompt({
      type: 'list',
      name: 'settings',
      message: 'Are you alright with your current settings? Select what applies to you.',
      choices: [
        'I\'m ready to generate!',
        `I wouldn\'t like to use ${chalk.red(this.props.manager)} for dependency management`,
        `I wouldn\'t like to use ${chalk.red(this.props.data)} as my preferred data-exchange format`,
        `I wouldn\'t like to use ${map[this.props.template][0]} template engine`,
        `I wouldn\'t like to use ${map[this.props.preprocessor][0]} pre-processor`,
        `I wouldn\'t like to use ${map[this.props.script][0]}`
      ],
      default: 'I\'m ready to generate!'
    }).then(props => {
      if (props.settings.endsWith('management')) {
        this.promptingManagers();
      }
      else if (props.settings.endsWith('format')) {
        this.promptingData();
      }
      else if (props.settings.endsWith('engine')) {
        this.promptingTemplates();
      }
      else if (props.settings.endsWith('pre-processor')) {
        this.promptingPreprocessors();
      }
      else if (props.settings.endsWith('Javascript')) {
        this.promptingScripts();
      }
      else {
        done();
      }
    });

  }

  writing() {

    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );

  }

  install() {

    this.installDependencies();

  }

};
