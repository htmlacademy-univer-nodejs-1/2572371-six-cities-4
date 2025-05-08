import convict, {Config} from 'convict';
import {ipaddress, url, email} from 'convict-format-with-validator';
import dotenv from 'dotenv';

convict.addFormats({
  ipaddress,
  url,
  email
});

export type AppConfig = {
  PORT: number,
  DB_HOST: string,
  SALT: string,
  UPLOAD_DIRECTORY_PATH: string
}

export function createConfig(): Config<AppConfig> {
  // Load environment variables from .env
  dotenv.config();

  const config: Config<AppConfig> = convict({
    PORT: {
      format: 'port',
      default: 4000,
      env: 'PORT'
    },
    SALT: {
      format: String,
      default: 'salt',
      env: 'SALT'
    },
    DB_HOST: {
      format: String,
      default: 'localhost',
      env: 'DB_HOST'
    },
    UPLOAD_DIRECTORY_PATH: {
      format: String,
      default: 'uploads',
      env: 'UPLOAD_DIRECTORY_PATH'
    }
  });

  config.validate({allowed: 'strict'});
  return config;
}

// Export a singleton instance of the config
export const config = createConfig();
