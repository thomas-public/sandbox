"use strict";

const { readFileSync } = require( 'fs' );
const cow2cow = require( "../main/cow2cow" );
const { totp } = require( "otplib" );
totp.options = { algorithm: "sha256" };

// client load keys
const client_pri_key = cow2cow.loadKey( readFileSync( "../../../certs/keys/client.pri.pem" ) );
const server_pub_key = cow2cow.loadKey( readFileSync( "../../../certs/keys/server.pub.pem" ) );

// server load keys
const client_pub_key = cow2cow.loadKey( readFileSync( "../../../certs/keys/client.pub.pem" ) );
const server_pri_key = cow2cow.loadKey( readFileSync( "../../../certs/keys/server.pri.pem" ) );

test( "test jwejwt", () =>
{
	const payload =
	{
		iss: "dpp",
		aud: "dps",
		otp: totp.generate( client_pri_key.kid )
	};

	// client steps
	console.log( "client_pri_key:", client_pri_key );
	console.log( "server_pub_key:", server_pub_key );

	const jws = cow2cow.signJWS( payload, client_pri_key, { algorithm: "RS512" } );
	const jwe = cow2cow.encryptJWE( jws, server_pub_key, { alg: "RSA-OAEP", enc: "A256CBC-HS512" } );

	// server steps
	console.log( "client_pub_key:", client_pub_key );
	console.log( "server_pri_key:", server_pri_key );

	const clear = cow2cow.decryptJWE( jwe, server_pri_key );
	const valid = cow2cow.verifyJWS( clear, client_pub_key );
	expect( totp.verify( { token: valid.otp, secret: client_pub_key.kid } ) ).toBeTruthy();
} );
