import chalk from 'chalk';
import { readFileSync } from 'node:fs';

export const showVersion = () => {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  return chalk.yellow(`Версия: ${packageJson.version}`);
};
