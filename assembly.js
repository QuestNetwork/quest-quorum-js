
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
      this.podSub = {}

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



    resolveChannelsFromPath(path){
      let channels = [];
      if(path.indexOf('/messages/channel/') == 0){
        channels.push(path.split('/messages/channel/')[1]);
      }
      return channels;
    }

    async ask(path, config = {} ){
      this.stopwatch = new Date().getTime();
      //join a path
      let assembly = await this.publishCreate(path);

      let results = this.publishAsk(assembly,path);

      if(results.length > 0){
        return { resolved: true, result: results[0], results: results }
      }
      else{
        return { resolved: false }
      }
      //don't terminate until result is known or timeout
    }


    publishCreate(path){
      return new Promise( async(resolve) => {
            let channels = this.resolveChannelsFromPath(path);
            let peers = [];
            for(let channel of channels){
              if(typeof this.timeAssembly[channel] == 'undefined'){
                this.timeAssembly[channel] = {};
              }
              if(typeof this.timeAssembly[channel][path] == 'undefined'){
                this.timeAssembly[channel][path] = [];
              }
              this.timeAssembly[channel][path] = await this.broadcastCreate(channel,path)
              resolve(this.timeAssembly[channel][path]);
              //create the new assemblu
            }

            setTimeout( () => {
                resolve('abort');
            },240000)

        });

    }


    broadcastCreate(channel,path){
      return new Promise( (resolve) => {

        if(typeof this.timeAssembly[channel] == 'undefined'){
          this.timeAssembly[channel] = {};
        }

        if(typeof this.timeAssembly[channel][path] == 'undefined'){
          this.timeAssembly[channel][path] = {}
        }

      if(typeof this.timeAssembly[channel][path]['requests'] == 'undefined'){
        this.timeAssembly[channel][path]['requests'] = [];
      }


            if(typeof this.timeAssembly[channel][path]['resolved'] == 'undefined'){
              this.timeAssembly[channel][path]['resolved'] = [];
            }

      let broadcastLock = false;

      if(typeof  this.podSub[channel] == 'undefined'){
        this.podSub[channel] = {};
      }

      this.podSub[channel][path] = this.dolphin.pod.listen(channel).subscribe( (message) => {

        if(message['type'] == 'QUORUM_ASSEMBLY_JOIN' && toChannelPubKey == this.channel.getChannelPubKey(channel)  && this.timeAssembly[channel][path]['requests'].length < (this.dolphin.getOnlineParticipants(channel.length/4*3)){
         this.timeAssembly[channel][path]['requests'].push(message);
        }
        else if(!broadcastLock && message['type'] == 'QUORUM_ASSEMBLY_JOIN' && toChannelPubKey == this.channel.getChannelPubKey(channel) ){
          this.timeAssembly[channel][path]['requests'].push(message);

           broadcastLock = true;
            //we know the time now?
            let timeQuorumResolved = false;
            for(let e of this.timeAssembly[channel][path]['requests']){
              //compare times and group different times

            }

            if(timeQuorumResolved){
              this.timeAssembly[channel][path]['resolved'].push(e);
              this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_ACCEPTED", time: acceptedTime })
              timeQuorumResolved = true;
              setTimeout( () => {
                this.podSub[channel][path].unsubscribe();
              },5000);
              resolve(this.timeAssembly[channel][path]['resolved']);
            }
        }
      });

      this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_CREATE" })

      setTimeout( () => {
        resolve([]);
      },120000);
    });
  }


//TODO::::
    async publishAsk(assembly, time){


      return new Promise( (resolve) => {



            if(typeof this.participants[channel] == 'undefined'){
              this.responseAssembly[channel] = {};
            }


            if(typeof this.participants[channel][path] == 'undefined'){
              this.responseAssembly[channel][path] = {}
            }

            if(typeof this.participants[channel][path] == 'undefined'){
              this.responseAssembly[channel][path]['requests'] = [];
            }

            if(typeof this.participants[channel][path] == 'undefined'){
              this.responseAssembly[channel][path]['resolved'] = [];
            }


            if(typeof  this.podAskSub[channel] == 'undefined'){
              this.podAskSub[channel] = {};
            }
            let broadcastLock = false;
            this.podAskSub[channel][path] = this.dolphin.pod.listen(channel).subscribe( (message) => {

              if(message['type'] == 'QUORUM_ASSEMBLY_RESPONSE' && toChannelPubKey == this.channel.getChannelPubKey(channel)  && this.timeAssembly[channel][path]['requests'].length < (this.dolphin.getOnlineParticipants(channel.length/4*3)){
               this.responseAssembly[channel][path]['requests'].push(message);
              }
              else if(!broadcastLock && message['type'] == 'QUORUM_ASSEMBLY_RESPONSE' && toChannelPubKey == this.channel.getChannelPubKey(channel) ){
                broadcastLock = true;
                this.responseAssembly[channel][path]['requests'].push(message);
                  //we know the data now?
                  let quorumResolved = false;
                  for(let e of this.timeAssembly[channel][path]['requests']){
                    //compare data and group different data
                  }

                  if(quorumResolved){
                    this.responseAssembly[channel][path]['resolved'].push(e);
                    this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_ACCEPTED", time: acceptedTime })
                    timeQuorumResolved = true;
                    setTimeout( () => {
                      this.podAskSub[channel][path].unsubscribe();
                    },5000);
                    resolve(this.responseAssembly[channel][path]['resolved']);
                  }
              }
            });

            this.dolphin.publish({ channel: channel, type: "QUORUM_ASSEMBLY_ASK", message: time })

            setTimeout( () => {
              resolve([]);
            },120000);
      });


  }

    // async response(path,object){
      // QUORUM_ASSEMBLY_RESPONSE IMPLEMENTED IN PUBSUB
    // }


    // async join(time, path, toChPubKey){
      // QUORUM_ASSEMBLY_JOIN IMPLEMENTED IN PUBSUB
    // }



}
