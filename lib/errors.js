'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on dashcore-p2p Module {0}'
};

module.exports = require('@dashevo/dashcore-lib').errors.extend(spec);
