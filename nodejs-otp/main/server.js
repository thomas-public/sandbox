'use strict';

const sha256 = require( 'crypto' ).Hash;
const { totp, hotp } = require( 'otplib' );
totp.options = ( { algorithm: "sha256", encoding: "utf8" } );
hotp.options = ( { algorithm: "sha256", encoding: "utf8" } );

module.exports.verifyTotp = ( token, secret ) =>
{
    return totp.verify( { token, secret } );
};

module.exports.verifyHotp = ( token, secret, counter ) =>
{
    return hotp.verify( { token, secret, counter } );
}