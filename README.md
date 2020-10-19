# Quest Quorum JS
> Core Module for the Quest Network Quorum Consensus.

## Lead Maintainer

[StationedInTheField](https://github.com/StationedInTheField)

## Description

The Quorum Core module for the [Quest Network Operating System](https://github.com/QuestNetwork/quest-os-js) interacts with [Quest Coral JS](https://github.com/QuestNetwork/quest-coral-js), [Quest Social JS](https://github.com/QuestNetwork/quest-social-js) and [Quest Dolphin JS](https://github.com/QuestNetwork/quest-dolphin-js) and can be loaded from [Quest OS](https://github.com/QuestNetwork/quest-os-js).

It synchronizes time and data resiliantly between peers. Uses elliptic curve cryptography in [Quest PubSub JS](https://github.com/QuestNetwork/quest-pubsub-js).

[Quest OS](https://github.com/QuestNetwork/quest-os-js) makes use of the [Interplanetary Filesystem](https://ipfs.io), [IPFS GossipSub](https://blog.ipfs.io/2020-05-20-gossipsub-v1.1/) and [IPFS DAGs](https://docs.ipfs.io/concepts/merkle-dag/).

When a peer quorum is used, Quest Quorum votes on a current time when assemblies are being created. It subsequently compares the responses and broadcasts of the participating peers.

**Default Consensus:**
In a valid assembly at least 71% of peers have to return the same result for the response to be accepted.

**Add-Ons:**
You can write add-ons for Quest Quorum that responses are piped through. There is an official [Quest Quorum Favorites](https://github.com/QuestNetwork/quest-quorum-fav-js) consensus scheme that is used by [qD Social](https://github.com/QuestNetwork/qd-social-ts) and [qD Messages](https://github.com/QuestNetwork/qd-messages-ts).

# Roadmap

**0.9.5**
- Basic functionality

## License

GNU AGPLv3
