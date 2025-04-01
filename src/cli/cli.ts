#!/usr/bin/env node

import { Command } from 'commander';
import { showHelp } from './commands/help.js';
import { showVersion } from './commands/version.js';
import { importData } from './commands/import.js';
import {generateData, saveDataToFile} from './commands/generate.js';

const program = new Command();

program
  .name('six-cities')
  .description('CLI for Six Cities application')
  .version(showVersion(), '--version', 'output the current version');


program
  .command('help')
  .description('Display help information')
  .action(showHelp);

program
  .command('import <filepath>')
  .description('Import data from a TSV file')
  .action((filepath) => {
    importData(filepath);
  });

program
  .command('generate <count> <url> <output>')
  .description('Generate data and save to TSV file')
  .action(async (count, url, output) => {
    console.log(`Generating ${count} entries from ${url}...`);
    try {
      const data = await generateData(Number(count), url);
      saveDataToFile(data, output);
      console.log(`Generated data saved to ${output}`);
    } catch (error) {
      console.error('Error generating data:', error);
    }
  });

// If no arguments, show help by default
if (process.argv.length <= 2) {
  showHelp();
}

program.parse(process.argv);
