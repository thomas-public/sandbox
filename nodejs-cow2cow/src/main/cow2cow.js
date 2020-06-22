"use strict";

const { JWK, JWT, JWE } = require( "jose" );

module.exports.loadKey = ( key, options ) =>
{
	return JWK.asKey( key, options );
};

module.exports.signJWT = ( payload, privateKey, options ) =>
{
	const jwt = JWT.sign( payload, privateKey, options );
	console.log( `${privateKey.kty} jwt:`, jwt );
	return jwt;
};

module.exports.encryptJWE = ( clear, publicKey, protectedHeader ) =>
{
	const jwe = JWE.encrypt( clear, publicKey, protectedHeader );
	console.log( `${publicKey.kty} jwe:`, jwe );
	return jwe;
};

module.exports.decryptJWE = ( jwe, privateKey ) =>
{
	const clear = JWE.decrypt( jwe, privateKey ).toString( "utf-8" );
	console.log( `${privateKey.kty} clear:`, clear );
	return clear;
};

module.exports.verifyJWT = ( jwt, publicKey ) =>
{
	const valid = JWT.verify( jwt, publicKey );
	console.log( `${publicKey.kty} valid:`, valid );
	return valid;
};
