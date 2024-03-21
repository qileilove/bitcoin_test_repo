const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { ECPairFactory } = require("ecpair");
const fs = require('fs');
const ecurve = require('ecurve')
const secp256k1 = ecurve.getCurveByName('secp256k1')
const schnorr = require('bip-schnorr')
const bech32 = require('bech32').bech32
const bech32m = require('bech32').bech32m
const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet;
const keyPair = ECPair.makeRandom();
const p2wpkh = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network,
});

console.log("p2wpkh Address: ", p2wpkh.address);
const privateKey = keyPair.toWIF();
console.log("private key:",privateKey)
// const p2sh = bitcoin.payments.p2sh({
//   redeem: p2wpkh,
  
//   network,
// });

// console.log("p2sh-p2wpkh Address: ", p2sh.address);
// P2PKH 地址
const p2pkh_keyPair = ECPair.makeRandom({ network: network });
const { address: p2pkhAddress } = bitcoin.payments.p2pkh({
  pubkey: p2pkh_keyPair.publicKey,
  network,
});

console.log('P2PKH Address:', p2pkhAddress);

const { address: bech32Address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network,
});


console.log('Bech32 Address:', bech32Address);


const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

console.log("公网 p2pkh:"+address)

function getP2TRAddress(keyPair) {
  const pubKey = ecurve.Point.decodeFrom(secp256k1, keyPair.publicKey)
  const taprootPubkey = schnorr.taproot.taprootConstruct(pubKey)
  const words = bech32.toWords(taprootPubkey)
  words.unshift(1)
  return bech32m.encode('bc',words)
}
console.log( "p2tr:"+getP2TRAddress(keyPair))

const keyPair1 = ECPairFactory(ecc).makeRandom({ network });
const keyPair2 = ECPairFactory(ecc).makeRandom({ network });
const keyPair3 = ECPairFactory(ecc).makeRandom({ network });

const pubkey1 = keyPair1.publicKey;
const pubkey2 = keyPair2.publicKey;
const pubkey3 = keyPair3.publicKey;

const redeemScript = bitcoin.payments.p2ms({
  m: 1, // 2 signatures required
  pubkeys: [pubkey1],
  network: network,
}).output;
const p2shtest = bitcoin.payments.p2sh({
  redeem: { output: redeemScript, network },
  network: network,
});
console.log("P2SH Address:", p2shtest.address);


const redeemScriptProd = bitcoin.payments.p2ms({
  m: 1, // 2 signatures required
  pubkeys: [pubkey1],
}).output;
const p2shprod = bitcoin.payments.p2sh({
  redeem: { output: redeemScript },
});
console.log("P2SH 公网 Address:", p2shprod.address);



// async function createP2PKHwallet() {
//     try {
//         const keyPair = ECPair.makeRandom({ network: network });
//         const { address } = bitcoin.payments.p2pkh({
//           pubkey: keyPair.publicKey,
//           network: network,
//         });
//         const privateKey = keyPair.toWIF()

//         console.log(`| Public Address | ${address} |`)
//         console.log(`| Private Key | ${privateKey} |`)

//         const wallet = {
//             address: address,
//             privateKey: privateKey
//         };

//         const walletJSON = JSON.stringify(wallet, null, 4);

//         fs.writeFileSync('wallet.json', walletJSON);

//         console.log(`Wallet created and saved to wallet.json`);
//     } catch (error) {
//         console.log(error)
//     }
// }

// createP2PKHwallet();




