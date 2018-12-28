Dashcore P2P
=======

[![NPM Package](https://img.shields.io/npm/v/@dashevo/dashcore-p2p.svg?style=flat-square)](https://www.npmjs.org/package/@dashevo/dashcore-p2p)
[![Build Status](https://img.shields.io/travis/dashevo/dashcore-p2p.svg?branch=master&style=flat-square)](https://travis-ci.org/dashevo/dashcore-p2p)
[![Coverage Status](https://img.shields.io/coveralls/dashevo/dashcore-p2p.svg?style=flat-square)](https://coveralls.io/r/dashevo/dashcore-p2p?branch=master)

`dashcore-p2p` adds Dash protocol support for Dashcore.

See [the main dashcore-lib repo](https://github.com/dashevo/dashcore-lib) for more information.

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

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/dashevo/dashcore-p2p/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/dashevo/dashcore/blob/master/LICENSE).

Copyright 2013-2017 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.  
Copyright 2016-2017 The Dash Foundation, Inc.  
Copyright 2017-2018 Dash Core Group, Inc.  
