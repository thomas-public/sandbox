"use strict";

const { readFileSync } = require( 'fs' );
const { JWK, JWT, JWE } = require( "jose" );

// client use
const client_pub_key = JWK.asKey( readFileSync( "../../../certs/keys/ecc.client.pub.pem" ) );
const server_pri_key = JWK.asKey( readFileSync( "../../../certs/keys/ecc.server.pri.pem" ) );

console.log( "client_pub_key:", client_pub_key );
console.log( "server_pri_key:", server_pri_key );

module.exports.decryptJWE = secret =>
{
	const clear = JWE.decrypt( secret, server_pri_key ).toString( "utf-8" );
	console.log( "clear:", clear );
	return clear;
};

module.exports.verifyJWT = jwt =>
{
	const valid = JWT.verify( jwt, client_pub_key );
	console.log( "valid:", valid );
	return valid;
};
