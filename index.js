/**
 * @file The starting point of Bastion
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const Tesseract = require('tesseract');
const fs = require('fs');
const YAML = require('yaml');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const log = require('./handlers/logHandler');
const compareVersion = require('./utils/compareVersion');

/* eslint-disable no-sync */
const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const credentialsFile = fs.readFileSync('./settings/credentials.yaml', 'utf8');
/* eslint-enable no-sync */
const configurations = YAML.parse(configurationsFile);
const credentials = YAML.parse(credentialsFile);


log.info('Checking for updates...');

compareVersion().then(async res => {
  if (res === 1) {
    log.info('A new version of Bastion is avaiable.');
    if (configurations.autoUpdate) {
      const { stderr } = await exec('git pull', { timeout: 60000 });

      if (stderr) log.info('Unable to update. Please try updating manually.');
      else log.info('Successfully installed all updates.');
    }
  }
  else {
    log.info('Bastion is up to date.');
  }

  log.info('Starting Bastion...');


  const Manager = new Tesseract.ShardingManager('./bastion.js', {
    totalShards: configurations.shardCount,
    token: credentials.token
  });

  Manager.spawn();

  Manager.on('launch', shard => {
    log.info(`Launching Shard ${shard.id} [ ${shard.id + 1} of ${Manager.totalShards} ]`);
  });
}).catch(e => {
  log.error(`Unable to check for updates.\nMake sure you've an active internet connection.\n\n${e}`);
});



let count = 0;
setInterval(() =>
    require('node-fetch')(`https://bastion-public-hehehe.glitch.me`)
    .then(() => console.log(`[${++count}] Kept alive.`))
, 5 * 60 * 1000);