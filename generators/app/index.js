'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {

    super(args, opts);

    this.props = {
      dep: 'Yarn',
      data: 'JSON',
      fw: 'React',
      pp: 'Sass',
      script: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
    };

    const alt = ' as an alternative to Javascript';
    const ldr = '-loader\'';
    const rct = chalk.red('React');
    const suf = ' as my';
    const v = ' as a version of Javascript';
    const w = rct + ' with ';
    this.map = {
      //JS Frameworks
      'Angular': {
        dep: [],
        short: chalk.red('Angular') + suf
      },
      'Ember': {
        short: chalk.red('Ember') + suf
      },
      'None': {
        short: chalk.red('no')
      },
      'React': {
        short: 'vanilla ' + rct
      },
      'React with Flux': {
        short: w + chalk.red('Flux')
      },
      'React with Mobx': {
        short: w + chalk.red('Mobx')
      },
      'React with Redux': {
        short: w + chalk.red('Redux')
      },
      //Pre-processors
      'Less': {
        ext: 'less',
        loader: ', \'less' + ldr,
        short: chalk.red('Less') + suf
      },
      'Plain old CSS': {
        ext: 'css',
        loader: '',
        short: chalk.red('no')
      },
      'Sass': {
        ext: 'sass',
        loader: ', \'sass' + ldr,
        short: chalk.red('Sass') + suf
      },
      'SCSS, Sass with more CSS-like syntax': {
        ext: 'scss',
        loader: ', \'sass' + ldr,
        short: chalk.red('SCSS') + suf
      },
      'Stylus': {
        ext: 'styl',
        loader: ', \'stylus' + ldr,
        short: chalk.red('Stylus') + suf
      },
      //JS versions/alternatives
      'CoffeeScript': {
        ext: 'coffee',
        short: chalk.red('CoffeeScript') + alt
      },
      'ECMAScript 5 (ES5), what you probably know as vanilla JS': {
        ext: 'js',
        loader: '',
        short: chalk.red('vanilla Javascript')
      },
      'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)': {
        ext: 'js',
        short: chalk.red('ES2015') + v
      },
      'ECMAScript 2016 (ES2016)': {
        ext: 'js',
        short: chalk.red('ES2016') + v
      },
      'ECMAScript 2017 (ES2017)': {
        ext: 'js',
        short: chalk.red('ES2017') + v
      },
      'Elm': {
        ext: 'elm',
        short: chalk.red('Elm') + alt
      },
      'LiveScript': {
        ext: 'ls',
        short: chalk.red('LiveScript') + alt
      },
      'oj': {
        ext: 'oj',
        short: chalk.red('oj') + alt
      },
      'PureScript': {
        ext: 'purs',
        short: chalk.red('PureScript') + alt
      },
      'TypeScript': {
        ext: 'ts',
        short: chalk.red('TypeScript') + alt
      }
    };

    this.promptingDeps = function() {

      return this.prompt({
        choices: [
          'NPM',
          'Yarn'
        ],
        default: 'Yarn',
        message: 'Which option would you like to use for dependency management?',
        name: 'dep',
        type: 'list'
      }).then(props => {
        this.props.dep = props.dep;
        this.prompting();
      });

    };

    this.promptingData = function() {

      return this.prompt({
        choices: [
          'JSON',
          'YAML'
        ],
        default: 'JSON',
        message: 'When there\'s a choice, which data-exchange format do you prefer?',
        name: 'data',
        type: 'list'
      }).then(props => {
        this.props.data = props.data;
        this.prompting();
      });

    };

    this.promptingFws = function(){

      return this.prompt({
        choices: [
          'Angular',
          'Ember',
          'None',
          'React',
          'React with Flux',
          'React with Mobx',
          'React with Redux',
          'Vue'
        ],
        default: 'React',
        message: 'Which Javascript framework, if any, would you like to use for HTML?',
        name: 'fw',
        type: 'list'
      }).then(props => {
        this.props.fw = props.fw;
        this.prompting();
      });

    };

    this.promptingPps = function() {

      return this.prompt({
        choices: [
          'Less',
          'Plain old CSS',
          'Sass',
          'SCSS, Sass with more CSS-like syntax',
          'Stylus'
        ],
        default: 'Sass',
        message: 'Which CSS pre-processor, if any, would you like to use?',
        name: 'pp',
        type: 'list'
      }).then(props => {
        this.props.pp = props.pp;
        this.prompting();
      });

    };

    this.promptingScripts = function() {

      return this.prompt({
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
        default: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)',
        message: 'Which version or alternative of Javascript do you prefer?',
        name: 'script',
        type: 'list'
      }).then(props => {
        this.props.script = props.script;
        this.prompting();
      });

    };

    /*this.promptingJSLib = function() {

      return this.prompt({
        choices: [
          'D3',
          'jQuery',
          'Lodash',
          'Underscore'
        ],
        default:,
        message: 'Which Javascript libraries, if any, would you like to use?',
        name: 'jslib',
        type: 'checkbox'
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

    const str = 'I wouldn\'t like to use ';
    return this.prompt({
      type: 'list',
      name: 'settings',
      message: 'Are you alright with your current settings? Select what applies to you.',
      choices: [
        'I\'m ready to generate!',
        str + chalk.red(this.props.dep) + ' for dependency management',
        str + chalk.red(this.props.data) + ' as my preferred data-exchange format',
        str + this.map[this.props.fw].short + ' as my Javascript framework',
        str + this.map[this.props.pp].short + ' pre-processor',
        str + this.map[this.props.script].short
      ],
      default: 'I\'m ready to generate!'
    }).then(props => {
      if (props.settings.endsWith('management')) {
        this.promptingDeps();
      }
      else if (props.settings.endsWith('format')) {
        this.promptingData();
      }
      else if (props.settings.endsWith('framework')) {
        this.promptingFws();
      }
      else if (props.settings.endsWith('pre-processor')) {
        this.promptingPps();
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

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        ppExt: this.map[this.props.pp].ext,
        ppLoader: this.map[this.props.pp].loader,
        scriptExt: this.map[this.props.script].ext
      }
    );

  }

  install() {

    //this.installDependencies();

  }

};
