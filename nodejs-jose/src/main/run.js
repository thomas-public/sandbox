"use strict";

const clinet = require( "./jwejwt.client" );
const server = require( "./jwejwt.server" );

const payload =
{
	xyz: "xxxyyyzzz",
	abc: "aaabbbccc"
};

const jwt = clinet.signJWT( payload );
const jwe = clinet.encryptJWE( jwt );

const clear = server.decryptJWE(jwe);
const valid = server.verifyJWT(clear);