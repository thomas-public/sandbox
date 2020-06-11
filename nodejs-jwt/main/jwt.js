'use strict';

const jwt = require("jsonwebtoken");

module.exports.sign = ( privkteKey, params, ducation = 60 ) => // duration in minutes
{
    if ( !params.iat )
    {
        console.log("[jwt] set iat & exp.");
        params.iat = Math.round(Date.now() / 1000);
        params.exp = params.iat + ducation * 3600;
    }
    return jwt.sign( params, privkteKey, { algorithm: "RS256" } );
}

module.exports.verify = ( publicKey, token ) =>
{
    return jwt.verify(token, publicKey);
}