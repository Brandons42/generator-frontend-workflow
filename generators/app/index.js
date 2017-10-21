'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Separator = require('inquirer/lib/objects/separator.js');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {

    super(args, opts);

    const alt = ' as an alternative to Javascript';
    const ldr = '-loader\'';
    const suf = ' as my';
    const v = ' as a version of Javascript';
    this.map = {
      //Pre-processors
      'Less': {
        abrv: 'Less',
        ext: 'less',
        loader: ', \'less' + ldr,
        short: chalk.red('Less') + suf
      },
      'Plain old CSS': {
        abrv: 'CSS',
        ext: 'css',
        loader: '',
        short: chalk.red('no')
      },
      'Sass': {
        abrv: 'Sass',
        ext: 'sass',
        loader: ', \'sass' + ldr,
        short: chalk.red('Sass') + suf
      },
      'SCSS, Sass with more CSS-like syntax': {
        abrv: 'SCSS',
        ext: 'scss',
        loader: ', \'sass' + ldr,
        short: chalk.red('SCSS') + suf
      },
      'Stylus': {
        abrv: 'Stylus',
        ext: 'styl',
        loader: ', \'stylus' + ldr,
        short: chalk.red('Stylus') + suf
      },
      //JS versions/alternatives
      'CoffeeScript': {
        abrv: 'CoffeeScript',
        ext: 'coffee',
        short: chalk.red('CoffeeScript') + alt
      },
      'ECMAScript 5 (ES5), what you probably know as vanilla JS': {
        abrv: 'Vanilla Javascript',
        ext: 'js',
        loader: '',
        short: chalk.red('vanilla Javascript')
      },
      'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)': {
        abrv: 'ES2015',
        ext: 'js',
        short: chalk.red('ES2015') + v
      },
      'ECMAScript 2016 (ES2016)': {
        abrv: 'ES2016',
        ext: 'js',
        short: chalk.red('ES2016') + v
      },
      'ECMAScript 2017 (ES2017)': {
        abrv: 'ES2017',
        ext: 'js',
        short: chalk.red('ES2017') + v
      },
      'Elm': {
        abrv: 'Elm',
        ext: 'elm',
        short: chalk.red('Elm') + alt
      },
      'LiveScript': {
        abrv: 'LiveScript',
        ext: 'ls',
        short: chalk.red('LiveScript') + alt
      },
      'oj': {
        abrv: 'oj',
        ext: 'oj',
        short: chalk.red('oj') + alt
      },
      'PureScript': {
        abrv: 'PureScript',
        ext: 'purs',
        short: chalk.red('PureScript') + alt
      },
      'TypeScript': {
        abrv: 'TypeScript',
        ext: 'ts',
        short: chalk.red('TypeScript') + alt
      }
    };

    this.config.defaults({
      'dep': 'Yarn',
      'data': 'JSON',
      'pp': 'Sass',
      'pst': false,
      'psts': {
        'mainstream': {
          dep: 'Yarn',
          data: 'JSON',
          pp: 'Sass',
          script: 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
        },
        'simple': {
          dep: 'NPM',
          data: 'JSON',
          pp: 'Plain old CSS',
          script: 'ECMAScript 5 (ES5), what you probably know as vanilla JS'
        }
      },
      'script': 'ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)'
    });

    this.done = false;
    this.skip = false;

    this.promptingData = function() {

      return this.prompt({
        choices: [
          new Separator(),
          'JSON',
          'YAML'
        ],
        default: this.config.get('data'),
        message: 'When there\'s a choice, which data-exchange format do you prefer?',
        name: 'data',
        type: 'list'
      }).then(props => {
        this.config.set({'data': props.data});
        this.promptingOpts();
      });

    };

    this.promptingDel = function() {

      const p = this.config.get('psts');
      const prsts = Object.keys(p);
      prsts.sort();
      for (let q = 0; q < prsts.length; q++) {
        prsts[q] += `: ${p[prsts[q]].data}, ${p[prsts[q]].dep}, ${this.map[p[prsts[q]].pp].abrv}, ${this.map[p[prsts[q]].script].abrv}`;
      }
      prsts.unshift(new Separator());
      return this.prompt({
        choices: prsts,
        default: 0,
        message: 'Which preset would you like to delete?',
        name: 'del',
        type: 'list'
      }).then(props => {
        delete p[(props.del).slice(0, (props.del).lastIndexOf(':'))];
        this.config.set({'psts': p});
        this.done = true;
        this.skip = true;
        this.prompting();
      });

    };

    this.promptingDeps = function() {

      return this.prompt({
        choices: [
          new Separator(),
          'NPM',
          'Yarn'
        ],
        default: this.config.get('dep'),
        message: 'Which option would you like to use for dependency management?',
        name: 'dep',
        type: 'list'
      }).then(props => {
        this.config.set({'dep': props.dep});
        this.promptingOpts();
      });

    };

    this.promptingOpts = function() {

      const str = 'I wouldn\'t like to use ';
      return this.prompt({
        choices: [
          new Separator(),
          'I\'m ready to generate!',
          new Separator(),
          str + chalk.red(this.config.get('dep')) + ' for dependency management',
          str + chalk.red(this.config.get('data')) + ' as my preferred data-exchange format',
          str + this.map[this.config.get('pp')].short + ' pre-processor',
          str + this.map[this.config.get('script')].short
        ],
        default: 'I\'m ready to generate!',
        message: 'Are you alright with your current settings? Select what applies to you.',
        name: 'settings',
        type: 'list'
      }).then(props => {
        if (props.settings.endsWith('management')) {
          this.promptingDeps();
        }
        else if (props.settings.endsWith('format')) {
          this.promptingData();
        }
        else if (props.settings.endsWith('pre-processor')) {
          this.promptingPps();
        }
        else if (!props.settings.endsWith('generate!')) {
          this.promptingScripts();
        }
        else {
          this.promptingPst();
        }
      });

    };

    this.promptingOW = function(name, psts) {

      return this.prompt({
        default: false,
        message: 'A preset named "' + name + '" already exists. Would you like to overwrite it?',
        name: 'ow',
        type: 'confirm'
      }).then(props => {
        if (props.ow) {
          psts[name] = {
            dep: this.config.get('dep'),
            data: this.config.get('data'),
            pp: this.config.get('pp'),
            script: this.config.get('script')
          };
          this.config.set({'psts': psts});
          this.done = true;
          this.prompting();
        }
        else {
          this.promptingPsts();
        }
      });

    };

    this.promptingPps = function() {

      return this.prompt({
        choices: [
          new Separator(),
          'Less',
          'Plain old CSS',
          'Sass',
          'SCSS, Sass with more CSS-like syntax',
          'Stylus'
        ],
        default: this.config.get('pp'),
        message: 'Which CSS pre-processor, if any, would you like to use?',
        name: 'pp',
        type: 'list'
      }).then(props => {
        this.config.set({'pp': props.pp});
        this.promptingOpts();
      });

    };

    this.promptingPst = function() {

      return this.prompt({
        default: this.config.get('pst'),
        message: 'Would you like to make these settings into your own preset?',
        name: 'pst',
        type: 'confirm'
      }).then(props => {
        this.config.set({'pst': props.pst});
        if (props.pst) {
          let stop = false;
          const presets = this.config.get('psts');
          for (let key in presets) {
            if (presets[key].dep == this.config.get('dep') && presets[key].data == this.config.get('data') && presets[key].pp == this.config.get('pp') && presets[key].script == this.config.get('script')) {
              stop = key;
              break;
            }
          }
          if (!stop) {
            this.promptingPsts();
          }
          else {
            this.promptingRN(stop, presets);
          }
        }
        else {
          this.done = true;
          this.prompting();
        }
      });

    };

    this.promptingPsts = function() {

      const np = 'new-preset';
      const psts = this.config.get('psts');
      const keys = Object.keys(psts);
      this.name = '';
      if (keys.includes(np)) {
        for (let q = 2; this.name == ''; q++) {
          if (!keys.includes(np + q)) {
            this.name = np + q;
          }
        }
      }
      else {
        this.name = np;
      }

      return this.prompt({
        default: this.name,
        message: 'What would you like to name this new preset?',
        name: 'psts',
        type: 'input'
      }).then(props => {
        if (typeof psts[props.psts] === 'object') {
          this.promptingOW(props.psts, psts);
        }
        else {
          psts[props.psts] = {
            dep: this.config.get('dep'),
            data: this.config.get('data'),
            pp: this.config.get('pp'),
            script: this.config.get('script')
          };
          this.config.set({'psts': psts});
          this.done = true;
          this.prompting();
        }
      });

    };

    this.promptingRN = function(name, psts) {

      return this.prompt({
        default: false,
        message: 'Another preset named "' + name + '" already has the same settings. Would you like to rename it?',
        name: 'rn',
        type: 'confirm'
      }).then(props => {
        if (props.rn) {
          delete psts[name];
          this.config.set({'psts': psts});
          this.promptingPsts();
        }
        else {
          this.done = true;
          this.prompting();
        }
      });

    };

    this.promptingScripts = function() {

      return this.prompt({
        choices: [
          new Separator(),
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
        default: this.config.get('script'),
        message: 'Which version or alternative of Javascript do you prefer?',
        name: 'script',
        type: 'list'
      }).then(props => {
        this.config.set({'script': props.script});
        this.promptingOpts();
      });

    };

  }

  initializing() {

    this.log(yosay(
      'Welcome to the funkadelic ' + chalk.red('Simple Frontend') + ' Yeoman generator!'
    ));

  }

  prompting() {

    const done = this.async();

    const del = "I'd like to delete a preset";
    const no = 'No thanks, I\'d like to customize my project';
    const ps = this.config.get('psts');
    const choices = Object.keys(ps);
    choices.sort();
    for (let q = 0; q < choices.length; q++) {
      choices[q] += `: ${ps[choices[q]].data}, ${ps[choices[q]].dep}, ${this.map[ps[choices[q]].pp].abrv}, ${this.map[ps[choices[q]].script].abrv}`;
    }
    choices.unshift(new Separator(), no, del, new Separator());
    return this.prompt({
      choices: choices,
      message: 'Would you like to use a preset? If so, which one? Alternatively, would you like to delete one?',
      name: 'preset',
      type: 'list',
      when: !this.done
    }).then(props => {
      if (this.done) {
        done();
      }
      else if (props.preset == no) {
        this.promptingOpts();
      }
      else if (props.preset == del) {
        this.promptingDel();
      }
      else {

      }
    });

  }

  writing() {

    if (!this.skip) {
      const pp = this.config.get('pp');
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'), {
          ppExt: this.map[pp].ext,
          ppLoader: this.map[pp].loader,
          scriptExt: this.map[this.config.get('script')].ext
        }
      );
    }

  }

  install() {

    //this.installDependencies();

  }

};
