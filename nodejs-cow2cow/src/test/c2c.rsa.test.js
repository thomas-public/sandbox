"use strict";

const { readFileSync } = require( 'fs' );
const jwejwtotp = require( "../main/cow2cow" );
const { totp } = require( "otplib" );
totp.options = { algorithm: "sha256" };

// client keys
const client_pri_key = jwejwtotp.loadKey( readFileSync( "../../../certs/keys/client.pri.pem" ), { algorithm: "RS512" }  );
const server_pub_key = jwejwtotp.loadKey( readFileSync( "../../../certs/keys/server.pub.pem" ) );

// server keys
const client_pub_key = jwejwtotp.loadKey( readFileSync( "../../../certs/keys/client.pub.pem" ) );
const server_pri_key = jwejwtotp.loadKey( readFileSync( "../../../certs/keys/server.pri.pem" ) );

test( "test jwejwt", () =>
{
	const payload =
	{
		xyz: "xxxyyyzzz",
		abc: "aaabbbccc",
		otp: totp.generate( client_pri_key.kid )
	};

	// client steps
	// console.log( "client_pri_key:", client_pri_key );
	// console.log( "server_pub_key:", server_pub_key );
	const jwt = jwejwtotp.signJWT( payload, client_pri_key );
	const jwe = jwejwtotp.encryptJWE( jwt, server_pub_key );

	// server steps
	// console.log( "client_pub_key:", client_pub_key );
	// console.log( "server_pri_key:", server_pri_key );
	const clear = jwejwtotp.decryptJWE( jwe, server_pri_key );
	const valid = jwejwtotp.verifyJWT( clear, client_pub_key );
	expect( totp.verify( { token: valid.otp, secret: client_pub_key.kid } ) ).toBeTruthy();
} );
