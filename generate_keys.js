const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { ECPairFactory } = require("ecpair");

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet;
const keyPair = ECPair.makeRandom();
const p2wpkh = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network,
});
console.log("Address: ", p2wpkh.address);
const privateKey = keyPair.toWIF();
console.log("private key:",privateKey)