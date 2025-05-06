import chalk from 'chalk';

export const showHelp = () => {
  console.log(chalk.green('Список команд:'));
  console.log(chalk.blue('help'), '— выводит список команд');
  console.log(chalk.blue('version'), '— показывает версию');
  console.log(chalk.blue('import <file>'), '— импортирует данные');
};
