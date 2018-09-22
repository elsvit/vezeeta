const chalk = require('chalk');
const sys = require('util');
const { spawn } = require('child_process');

const NO_COMPRESS = '--no-compress';
const VERSION = '--version';
const UPDATE_PACKAGES = '--update-packages';

// Environments constants
const LOCAL = 'local';
const STAGING = 'staging';
const PRELIVE = 'prelive';
const NODE_ONE = 'node-one';
const NODE_TWO = 'node-two';
const PRODUCTION = 'production';
const ALL_ENVIRONMENTS = '--env-all';

// Vezeeta packages
const WEB_COMPONENTS = 'web-components';
const ENTERPRISE_LAYOUT = 'enterprise-layout';
const WEB_UTILS = 'web-utils';
const ALL_PACKAGES = '--packages-all';

const ENVIRONMENTS = [LOCAL, STAGING, PRELIVE, NODE_ONE, NODE_TWO, PRODUCTION];
const VEZEETA_PACKAGES = [WEB_COMPONENTS, ENTERPRISE_LAYOUT, WEB_UTILS];

const COMPRESS_COMMAND =
  'zip -r ${REACT_APP_ENV}-$npm_package_version.zip build';

const packageJson = require('../package.json');

const projectName = packageJson.name;
const version = packageJson.version;
const args = process.argv.slice(2);

let shouldCompress = true;
let shouldUpdateVersion = false;
let shouldUpdatePackages = false;

const environments = [];
const packages = [];

args.forEach(arg => {
  if (ENVIRONMENTS.indexOf(arg) !== -1) {
    // Add each arg to the env array if it matches any of ENVIRONMENTS array
    environments.push(arg);
  } else if (ALL_ENVIRONMENTS.match(arg)) {
    environments.push(ENVIRONMENTS);
  }

  if (VEZEETA_PACKAGES.indexOf(arg) !== -1) {
    // Add each packages to packages array
    packages.push(arg);
  } else if (ALL_PACKAGES.match(arg)) {
    packages.push(arg);
  }

  switch (arg) {
    case NO_COMPRESS:
      shouldCompress = false;
      break;
    case VERSION:
      shouldUpdateVersion = true;
      break;
    case UPDATE_PACKAGES:
      shouldUpdatePackages = true;
      break;
    default:
      break;
  }
});

const updatePackages = () => {
  return new Promise((fulfill, reject) => {
    // Checking if updating package flag === true
    // Then create a command for each entered package
    if (shouldUpdatePackages) {
      // Add @vezeeta scope to each package in packages array
      const scopedPackages = Array.from(
        packages,
        package => `@vezeeta/${package}`,
      );
      const packagesUpdateCommand = `yarn upgrade ${scopedPackages.join(
        ' ',
      )} --latest`;

      console.log(
        chalk.default('Updating packages: ') +
          chalk.blue(scopedPackages.join(', ') + '\n'),
      );

      spawn(packagesUpdateCommand, {
        stdio: 'inherit',
        shell: true,
      })
        .on('error', error => {
          console.log(chalk.red(error));
        })
        .on('exit', code => {
          if (code === 0) {
            console.log(chalk.green('\nPackages updated\n'));
            fulfill();
          } else {
            console.log(chalk.red('\nUpdating packages failed\n'));
            reject();
          }
        });
    } else {
      fulfill();
    }
  });
};

const updateVersion = () => {
  return new Promise((fulfill, reject) => {
    if (shouldUpdateVersion) {
      const UPDATE_VERSION = 'yarn version && git push --tags';
      spawn(UPDATE_VERSION, {
        stdio: 'inherit',
        shell: true,
      })
        .on('error', error => {
          console.log(chalk.red(error));
        })
        .on('exit', code => {
          if (code === 0) {
            fulfill();
          } else {
            reject();
          }
        });
    } else {
      fulfill();
    }
  });
};

const generateBuild = () => {
  return new Promise((fulfill, reject) => {
    console.log(chalk.default('Build number: ') + chalk.blue(version));
    console.log(
      chalk.default('Environments: ') + chalk.green(environments.join(',')),
    );

    var commands = [];
    // Checking if updating package flag === true
    // Then create a command for each entered environments
    environments.forEach(env => {
      let command = '';
      command += `node -r dotenv/config scripts/build.js dotenv_config_path=env/.env.${env}`;

      if (env === PRODUCTION) {
        command += ' && yarn delete-maps';
      }

      if (shouldCompress) {
        command += ` && zip -r ${projectName}[${env}-v${version}].zip build/`;
      }
      commands.push(command);
    });

    // Creating the final command by concatenating all commands array
    const finalCommand = commands.join(' && ');
    spawn(finalCommand, {
      stdio: 'inherit',
      shell: true,
    })
      .on('error', error => {
        console.log(chalk.red(error));
      })
      .on('exit', code => {
        if (code === 0) {
          console.log(chalk.green('\nBuild generated\n'));
          fulfill();
        } else {
          console.log(chalk.red('\nBuild failed\n'));
          reject();
        }
      });
  });
};

updatePackages().then(() => {
  updateVersion().then(() => {
    generateBuild();
  });
});
