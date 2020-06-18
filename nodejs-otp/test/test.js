"use strict";

const server = require( "../main/server" );
const client = require( "../main/client" );

const secret = "vt8nby97n7xfevkm"; //Date.now().toString(16);
const count = Date.now();

test( "test totp", () =>
{
    let totp = client.generateTotp( secret );
    console.log( "client gen toep:", totp );
    expect( server.verifyTotp( totp, secret ) ).toBeTruthy();
} );

test( "test hotp", () =>
{
    let hotp = client.generateHotp( secret, count );
    console.log( "client gen hotp:", hotp );
    expect( server.verifyHotp( hotp, secret, count ) ).toBeTruthy();
} );