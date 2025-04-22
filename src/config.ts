import convict from 'convict';
import { ipaddress, url, email } from 'convict-format-with-validator';

// Register individual formats
convict.addFormats({
  ipaddress,
  url,
  email
});

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  dbHost: {
    doc: 'Database host IP address',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_HOST'
  },
  salt: {
    doc: 'Salt for hashing',
    format: String,
    default: '',
    env: 'SALT'
  }
});

config.validate({ allowed: 'strict' });

export default config;
