import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { NativeCrypto } from '@questnetwork/quest-crypto-js';
import { AssemblyManager } from './assembly.js';
import { TimeManager } from './time.js';
import { ConnectionManager } from './connection.js';

export class QuestQuorum {

  constructor() {
    this.key = {}
    this.time = new TimeManager();
    this.assembly = new AssemblyManager();
    this.connection = new ConnectionManager();
  }

  async start(config){

    this.version = config['version'];
    this.jsonSwarm = config['ipfs']['swarm'];
    this.electron = config['dependencies']['electronService'];
    this.bee = config['dependencies']['bee'];
    this.dolphin = config['dependencies']['dolphin'];
    this.crypto = new NativeCrypto();
    this.request = config['dependencies']['request'];
    // await this.algo.start(config);
    await this.connection.start(config);
    config['dependencies']['quorum-core'] = {};
    config['dependencies']['quorum-core']['connection'] = this.connection;

    await this.time.start(config);
    config['dependencies']['quorum-core'] = {};
    config['dependencies']['quorum-core']['time'] = this.time;

    await this.assembly.start(config);
    config['dependencies']['quorum-core'] = {};
    config['dependencies']['quorum-core']['assembly'] = this.assembly;

    return true;
  }



}
