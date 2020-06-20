"use strict";

const { JWK, JWT, JWE } = require( "jose" );

module.exports.loadKey = ( key, options)  =>
{
	return JWK.asKey(key, options);
};

module.exports.signJWT = ( payload, privateKey )=>
{
	const jwt = JWT.sign( payload, privateKey, { algorithm: "ES384" } );
	console.log( "jwt:", jwt );
	return jwt;
};

module.exports.encryptJWE = ( clear, publicKey ) =>
{
	const jwe = JWE.encrypt( clear, publicKey, { enc: "A256CBC-HS512" } );
	console.log( "jwe:", jwe );
	return jwe;
};


module.exports.decryptJWE = ( secret, privateKey ) =>
{
	const clear = JWE.decrypt( secret, privateKey ).toString( "utf-8" );
	console.log( "clear:", clear );
	return clear;
};

module.exports.verifyJWT = ( jwt, publicKey ) =>
{
	const valid = JWT.verify( jwt, publicKey );
	console.log( "valid:", valid );
	return valid;
};
