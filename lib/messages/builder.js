'use strict';

var dashcore = require('@dashevo/dashcore-lib');
var Inventory = require('../inventory');

function builder(options) {
  /* jshint maxstatements: 20 */
  /* jshint maxcomplexity: 10 */

  if (!options) {
    options = {};
  }

  if (!options.network) {
    options.network = dashcore.Networks.defaultNetwork;
  }

  options.Block = options.Block || dashcore.Block;
  options.BlockHeader = options.BlockHeader || dashcore.BlockHeader;
  options.Transaction = options.Transaction || dashcore.Transaction;
  options.MerkleBlock = options.MerkleBlock || dashcore.MerkleBlock;
  options.MnListDiff = options.MnListDiff || dashcore.MnListDiff;
  options.protocolVersion = options.protocolVersion || 70215;

  var exported = {
    constructors: {
      Block: options.Block,
      BlockHeader: options.BlockHeader,
      Transaction: options.Transaction,
      MerkleBlock: options.MerkleBlock,
      MnListDiff: options.MnListDiff
    },
    defaults: {
      protocolVersion: options.protocolVersion,
      network: options.network
    },
    inventoryCommands: [
      'getdata',
      'inv',
      'notfound'
    ],
    commandsMap: {
      version: 'Version',
      verack: 'VerAck',
      ping: 'Ping',
      pong: 'Pong',
      block: 'Block',
      tx: 'Transaction',
      getdata: 'GetData',
      getmnlistdiff: 'GetMnListDiff',
      headers: 'Headers',
      notfound: 'NotFound',
      inv: 'Inventory',
      addr: 'Addresses',
      alert: 'Alert',
      reject: 'Reject',
      merkleblock: 'MerkleBlock',
      mnlistdiff: 'MnListDiff',
      filterload: 'FilterLoad',
      filteradd: 'FilterAdd',
      filterclear: 'FilterClear',
      getblocks: 'GetBlocks',
      getheaders: 'GetHeaders',
      mempool: 'MemPool',
      getaddr: 'GetAddr',
      dsq: 'DSQueue',
      ssc: 'SyncStatusCount',
      ix: 'TXLockRequest'
    },
    unsupportedCommands: [
      'qsendrecsigs',
      'senddsq',
      'sendcmpct',
      'sendheaders',
      'txlvote',
      'spork',
      'getsporks',
      'mnw',
      'mnget',
      'mn scan error',
      'mnvs',
      'mvote',
      'mprop',
      'fbs',
      'fbvote',
      'mn quorum',
      'mnb',
      'mnp',
      'dsa',
      'dsi',
      'dsf',
      'dss',
      'dsc',
      'dssu',
      'dstx',
      'dseg',
      'govsync',
      'govobj',
      'govobjvote'
    ],
    commands: {}
  };

  exported.add = function (key, Command) {
    exported.commands[key] = function (obj) {
      return new Command(obj, options);
    };

    exported.commands[key]._constructor = Command;

    exported.commands[key].fromBuffer = function (buffer) {
      var message = exported.commands[key]();
      message.setPayload(buffer);
      return message;
    };
  };

  Object.keys(exported.commandsMap).forEach(function (key) {
    exported.add(key, require('./commands/' + key));
  });

  exported.inventoryCommands.forEach(function (command) {

    // add forTransaction methods
    exported.commands[command].forTransaction = function forTransaction(hash) {
      return new exported.commands[command]([Inventory.forTransaction(hash)]);
    };

    // add forBlock methods
    exported.commands[command].forBlock = function forBlock(hash) {
      return new exported.commands[command]([Inventory.forBlock(hash)]);
    };

    // add forFilteredBlock methods
    exported.commands[command].forFilteredBlock = function forFilteredBlock(hash) {
      return new exported.commands[command]([Inventory.forFilteredBlock(hash)]);
    };

  });

  return exported;

}

module.exports = builder;
