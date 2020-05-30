const AWS = require( "aws-sdk" );
const ssm = new AWS.SSM( { region: "ap-northeast-1" } );

async function getParameters( paramNames )
{
    const params =
    {
        Names: paramNames,
        WithDecryption: true
    };
    const ret = await ssm.getParameters( params ).promise();
    return ret.Parameters.reduce( ( o, e ) => ( { ...o, [ e.Name ]: e.Value } ), {} );
};

// (async function test()
// {
//     const parans = await getParameters( [
//         "test.param.1.string",
//         "test.param.2.stringlist",
//         "test.param.3.securestring"
//     ] );
//     console.log( "params:", parans );
// })();

module.exports =
{
    getParameters,
};