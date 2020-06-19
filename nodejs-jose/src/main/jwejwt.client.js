"use strict";

const { readFileSync } = require( 'fs' );
const { JWK, JWT, JWE } = require( "jose" );

const client_pri_key = JWK.asKey( readFileSync( "../../../certs/keys/ecc.client.pri.pem" ) );
const server_pub_key = JWK.asKey( readFileSync( "../../../certs/keys/ecc.server.pub.pem" ), { alg: "ECDH-ES+A256KW", enc: "A256CBC-HS512" } );
// const server_pub_key = JWK.asKey( readFileSync( "../../../certs/keys/ecc.server.pub.pem" ), { alg: "A256CBC-HS512" } );

console.log( "client_pri_key:", client_pri_key );
console.log( "server_pub_key:", server_pub_key );

module.exports.signJWT = payload =>
{
	const jwt = JWT.sign( payload, client_pri_key );
	console.log( "jwt:", jwt );
	return jwt;
};

module.exports.encryptJWE = clear =>
{
	const jwe = JWE.encrypt( clear, server_pub_key );
	console.log( "jwe:", jwe );
	return jwe;
};
