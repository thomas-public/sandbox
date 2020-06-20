const fs = require( "fs" );
const forge = require( "node-forge" );
const subject = [ { "value": "TW", "shortName": "C" }, { "value": "TEST", "shortName": "O" }, { "value": "TEST UNIT", "shortName": "OU" }, { "value": "TEST CLIENT", "shortName": "CN" } ];

const rootcaCrt = forge.pki.certificateFromPem( fs.readFileSync( "../../../certs/certs/rootca.crt.pem", 'utf-8' ) );
const rootcaPriKey = forge.pki.privateKeyFromPem( fs.readFileSync( "../../../certs/keys/rootca.pri.pem", 'utf-8' ) );

// generate client key pair and csr
const clientKeyPair = forge.pki.rsa.generateKeyPair( 2048 );
const csr = forge.pki.createCertificationRequest();
csr.publicKey = clientKeyPair.publicKey;
csr.setSubject( subject );
csr.sign( clientKeyPair.privateKey );
console.log( "csr:\n" + forge.pki.certificationRequestToPem( csr ) );

// signing client csr
const cert = forge.pki.createCertificate();
cert.serialNumber = '00';
const time = Date.now();
cert.validity.notBefore = new Date(time);
cert.validity.notAfter = new Date(time + 36520 * 86400 * 1000);

cert.setSubject( csr.subject.attributes );
cert.setIssuer( rootcaCrt.subject.attributes );
cert.publicKey = csr.publicKey;
cert.sign( rootcaPriKey, forge.md.sha256.create() );
console.log( "crt:\n" + forge.pki.certificateToPem( cert ) );

const passed = rootcaCrt.verify(cert);
console.log("verify passed:", passed);