
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

import { NativeCrypto } from '@questnetwork/quest-crypto-js';



export class TimeManager {

    constructor() {
      this.key = {}
      this.selectSub = new Subject();
      this.selected;
      this.dev = false;

    }

    async start(config){

      this.version = config['version'];
      this.jsonSwarm = config['ipfs']['swarm'];
      this.electron = config['dependencies']['electronService'];
      this.bee = config['dependencies']['bee'];
      this.dolphin = config['dependencies']['dolphin'];
      this.crypto = new NativeCrypto();
      this.request = config['dependencies']['request'];
      if(typeof config['dev'] != 'undefined'){
        this.dev = config['dev'];
      }

      return true;
    }


}
