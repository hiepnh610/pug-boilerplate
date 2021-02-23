import arg from 'arg';
import inquirer from 'inquirer';

import {createProject} from './main';

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      '--yes': Boolean,
      '-y': '--yes',
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    skipPrompts: args['--yes'] || false,
  };
};

const promptForMissingOptions = async (options) => {
  const defaultTemplate = 'CSS';

  if (options.skipPrompts) {
    return {
      ...options,
      template: defaultTemplate,
    };
  }

  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project CSS template to use',
      choices: ['CSS', 'SCSS'],
      default: defaultTemplate,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
  };
};

export async function cli (arg) {
  let options = parseArgumentsIntoOptions(arg);
  options = await promptForMissingOptions(options);

  createProject(options);
};
