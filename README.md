Dashcore P2P
=======

[![NPM Package](https://img.shields.io/npm/v/@dashevo/dashcore-p2p.svg?style=flat-square)](https://www.npmjs.org/package/@dashevo/dashcore-p2p)
[![Build Status](https://img.shields.io/travis/dashevo/dashcore-p2p.svg?branch=master&style=flat-square)](https://travis-ci.org/dashevo/dashcore-p2p)
[![Coverage Status](https://img.shields.io/coveralls/dashevo/dashcore-p2p.svg?style=flat-square)](https://coveralls.io/r/dashevo/dashcore-p2p?branch=master)

`dashcore-p2p` adds Dash protocol support for Dashcore.

See [the main Dashcore repo](https://github.com/dashevo/dashcore) for more information.

## Getting Started

```sh
npm install @dashevo/dashcore-p2p
```
In order to connect to the Dash network, you'll need to know the IP address of at least one node of the network, or use [Pool](/docs/pool.md) to discover peers using a DNS seed.

```javascript
var Peer = require('@dashevo/dashcore-p2p').Peer;

var peer = new Peer({host: '127.0.0.1'});

peer.on('ready', function() {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function() {
  console.log('connection closed');
});
peer.connect();
```

Then, you can get information from other peers by using:

```javascript
// handle events
peer.on('inv', function(message) {
  // message.inventory[]
});
peer.on('tx', function(message) {
  // message.transaction
});
```

Take a look at the [bitcore guide](http://bitcore.io/guide/peer.html) on the usage of the `Peer` class.

## Contributing

See [CONTRIBUTING.md](https://github.com/dashevo/dashcore/blob/master/CONTRIBUTING.md) on the main Dashcore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/dachevo/dashcore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
