"use strict";

const forge = require("node-forge");
const { readFileSync } = require( 'fs' );

const pubkey = forge.pki.publicKeyFromPem( readFileSync("/Volumes/encHD/tsbx/acrosome/thomas.sandbox/certs/keys/client.pub.pem", "utf-8"));
const fp = forge.pki.getPublicKeyFingerprint(pubkey, { "encoding": "binary" } );
// console.log("fp:", forge.util.encode64(fp));
// console.log(pubkey.n.data);
const rsapubkey = forge.pki.publicKeyToRSAPublicKey(pubkey);
console.log(rsapubkey);
