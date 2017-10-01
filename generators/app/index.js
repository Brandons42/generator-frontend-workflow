'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {

    super(args, opts);

    this.props = {
      template: 'Pug, formerly known as Jade',
      preprocessor: 'Sass',
      js: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
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

    this.promptingJS = function() {

      return this.prompt({
        type: 'list',
        name: 'js',
        message: 'Which version or alternative of Javascript do you prefer?',
        choices: [
          'CoffeeScript',
          'ECMAScript 5 (ES5), what you probably know as vanilla JS',
          'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)',
          'ECMAScript 2016 (ES2016)',
          'ECMAScript 2017 (ES2017)',
          'Opal, compiles Ruby to JS',
          'TypeScript'
        ],
        default: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
      }).then(props => {

        this.props.js = props.js;
        this.prompting();

      });

    }

    /*this.customize = function() {
      return this.prompt({
        type: 'list',
        name: 'customize',
        message: 'Would you like to stick with the defaults, or make this project yours?',
        choices: [
          'Customize',
          'Defaults'
        ],
        default: 'Defaults'
      }).then(props => {
        this.props.customize = props.customize;
      });
    };*/



    //this.promptLoop = promptLoop;

    /*this.template = function() {
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
      });
    };

    this.preprocessor = function() {
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
      });
    };

    this.js = function() {
      return this.prompt({
        type: 'list',
        name: 'js',
        message: 'Which version or alternative of Javascript do you prefer?',
        choices: [
          'CoffeeScript',
          'ECMAScript 5 (ES5), what you probably know as vanilla JS',
          'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)',
          'ECMAScript 2016 (ES2016)',
          'ECMAScript 2017 (ES2017)',
          'Opal, compiles Ruby to JS',
          'TypeScript'
        ],
        default: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
      }).then(props => {
        this.props.js = props.js;
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
    const short = {
      //Template engines
      'EJS': chalk.red('EJS') + ' as a',
      'Handlebars': chalk.red('Handlebars') + ' as a',
      'Mustache': chalk.red('Mustache') + ' as a',
      'Plain old HTML': chalk.red('no'),
      'Pug, formerly known as Jade': chalk.red('Pug'),
      //Pre-processors
      'Less': chalk.red('Less') + ' as a',
      'Plain old CSS': chalk.red('no'),
      'Sass': chalk.red('Sass') + ' as a',
      'SCSS, Sass with more CSS-like syntax': chalk.red('SCSS') + ' as a',
      'Stylus': chalk.red('Stylus') + ' as a',
      //JS versions/alternatives
      'CoffeeScript': chalk.red('CoffeeScript') + alt,
      'ECMAScript 5 (ES5), what you probably know as vanilla JS': chalk.red('vanilla Javascript'),
      'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)': chalk.red('ES2015') + v,
      'ECMAScript 2016 (ES2016)': chalk.red('ES2016') + v,
      'ECMAScript 2017 (ES2017)': chalk.red('ES2017') + v,
      'Opal, compiles Ruby to JS': chalk.red('Opal') + alt,
      'TypeScript': chalk.red('TypeScript') + alt
    }

    return this.prompt({
      type: 'list',
      name: 'settings',
      message: 'Are you alright with your current settings? Select what applies to you.',
      choices: [
        'I\'m ready to generate!',
        `I wouldn\'t like to use ${short[this.props.template]} template engine`,
        `I wouldn\'t like to use ${short[this.props.preprocessor]} pre-processor`,
        `I wouldn\'t like to use ${short[this.props.js]}`
      ],
      default: 'I\'m ready to generate!'
    }).then(props => {
      if (props.settings.endsWith('engine')) {
        this.promptingTemplates();
      }
      else if (props.settings.endsWith('pre-processor')) {
        this.promptingPreprocessors();
      }
      else if (props.settings.endsWith('Javascript')) {
        this.promptingJS();
      }
      else {
        done();
      }
    });

    /*this.log("HI");
    //this.customize();
    if (this.props.customize == 'Customize') {

      while (this.props.settings != 'I\'m ready to generate!') {

        //this.settings();
        if (this.props.settings.endsWith('engine')) {
          //this.template();
        }
        else if (this.props.settings.endsWith('pre-processor')) {
          //this.preprocessor();
        }
        else if (this.props.settings.endsWith('Javascript')) {
          //this.js();
        }

      }

    }
    return this.settings({
      type: 'list',
      name: 'settings',
      message: 'Are you alright with your current settings? If not, select what you\'d like to change.',
      choices: [
        'I\'m ready to generate!',
        `I wouldn\'t like to use ${short[this.props.template]} template engine`,
        `I wouldn\'t like to use ${short[this.props.preprocessor]} pre-processor`,
        `I wouldn\'t like to use ${short[this.props.js]}`
      ],
      default: 'I\'m ready to generate!'
    }).then(function(props) {

    });

    this.template = function() {
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
      });
    };

    this.preprocessor = function() {
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
      });
    };

    this.js = function() {
      return this.prompt({
        type: 'list',
        name: 'js',
        message: 'Which version or alternative of Javascript do you prefer?',
        choices: [
          'CoffeeScript',
          'ECMAScript 5 (ES5), what you probably know as vanilla JS',
          'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)',
          'ECMAScript 2016 (ES2016)',
          'ECMAScript 2017 (ES2017)',
          'Opal, compiles Ruby to JS',
          'TypeScript'
        ],
        default: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
      }).then(props => {
        this.props.js = props.js;
      });
    };*/

    //return this.promptLoop(this.prompts[0]);

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
