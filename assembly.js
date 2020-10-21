
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';

import { NativeCrypto } from '@questnetwork/quest-crypto-js';



export class AssemblyManager {

    constructor() {
      this.key = {}
      this.selectSub = new Subject();
      this.selected;
      this.dev = false;
      this.stopwatch = 0;
      this.timeAssembly = {};
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

    async create(path, config = {} ){
      this.stopwatch = new Date().getTime();
      //join a path

      this.publishCreate(path);

      let timeQuorumResolved = false;
      let i = 0;
      while(!timeQuorumResolved && i<(120000/5000)){
        if(!(typeof config['channel'] == 'undefined' && this.timeAssembly[path].length < 6) && !(typeof config['channel'] != 'undefined' && this.timeAssembly[path].length < (this.dolphin.getOnlineParticipants(config['channel'].length/4*3)))){

          //we know the time now?

          for(let e of this.timeAssembly[path]){
            //compare times and group different times
          }

          if(e == 1){
            timeQuorumResolved = true;
          }

        }

        await this.utilities.delay(5000);
        i++;
      }

      if(!timeQuorumResolved){
        throw('time');
      }

      this.ask(path, time);

      let quorumResolved = false;
      let winner = {};

      i = 0;
      while(!timeQuorumResolved && i<(120000/5000)){
        if(!(typeof config['channel'] == 'undefined' && this.quorumResults[path].length < 6) && !(typeof config['channel'] != 'undefined' && this.quorumResults[path].length < (this.dolphin.getOnlineParticipants(config['channel'].length/4*3)))){

          //we know the time now?

          for(let e of this.quorumResults[path]){
            //compare times and group different times
          }

          if(e == 1){
            quorumResolved = true;
            winner = {};
          }

        }

        await this.utilities.delay(5000);
        i++;
      }


      return { resolved: quorumResolved, result: winner }
      //don't terminate until result is known or timeout
    }

    resolveChannelsFromPath(path){
      let channels = [];
      if(path.indexOf('/messages/channel/') == 0){
        channels.push(path.split('/messages/channel/')[1]);
      }
      return channels;
    }

    publishCreate(){

      let channels = this.resolveChannelsFromPath(path);

      for(let channel of channels){
        //listen for QUORUM_ASSEMBLY_JOIN on our path
        //call addPeer for valid contenders

        this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_CREATE" })
        //create the new assemblu
      }


    }

    async ask(path, time){
      //resolve channels from path
      let channels = this.resolveChannelsFromPath(path);

      for(let channel of channels){
        //listen for QUORUM_ASSEMBLY_RESPONSE on our path and only pick results from peers in the timequorum
        //add valid results to this.quorumResults[path] for path

        this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_ASK", message: time })
        //ask the peers for the relevant piece of information
      }

    }

    async response(path,object){
      let channels = this.resolveChannelsFromPath(path);

      for(let channel of channels){
        //listen on the result and only pick results from peers in the timequorum
        //add valid results to this.quorumResults[path] for path

        this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_RESPONSE", message: object })
        //ask the peers for the relevant piece of information
      }
    }


    async join(time, path, toChPubKey){
      // SEND QUORUM_ASSEMBLY_JOIN
    }


    async addPeer(time, path, chPubKey){
      //add time, path and chPubKey to results
    }



}
