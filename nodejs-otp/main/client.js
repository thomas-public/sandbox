"use strict";

const sha256 = require( 'crypto' ).Hash;
const { totp, hotp } = require( 'otplib' );
totp.options = ( { algorithm: "sha256", encoding: "utf8" } );
hotp.options = ( { algorithm: "sha256", encoding: "utf8" } );

module.exports.generateTotp = ( secret ) =>
{
    return totp.generate( secret );
};

module.exports.generateHotp = ( secret, count ) =>
{
    return hotp.generate( secret, count );
};