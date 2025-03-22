#!/usr/bin/env node

import { showHelp } from './commands/help.js';
import { showVersion } from './commands/version.js';
import { importData } from './commands/import.js';

const args = process.argv.slice(2);

switch (args[0]) {
  case '--help':
    showHelp();
    break;
  case '--version':
    showVersion();
    break;
  case '--import':
    if (!args[1]) {
      console.error('❌ Укажите путь к файлу!');
    } else {
      importData(args[1]);
    }
    break;
  default:
    showHelp();
}
