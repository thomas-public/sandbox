const awsIot = require( 'aws-iot-device-sdk' );

( async function main()
{
	const config = require(process.argv[2]);
	const thingName = config.thingName;
	const params =
	{
		keyPath: config.pathDeviceKey,
		certPath: config.pathDeviceCrt,
		caPath: config.pathAmazonCA,
		clientId: Date.now().toString( 32 ),
		host: config.endpointAwsIoT
	};
	console.log("params:", JSON.stringify(params, null, 4));
	let shadow = new awsIot.thingShadow( params );
	let clientTokenUpdate;
	let rval = 111 + Math.random();
	let gval = 222 + Math.random();
	let bval = 333 + Math.random();

	shadow.on( 'status', ( thingName, stat, clientToken, stateObject ) =>
	{
		console.log( 'received ', stat, '@', thingName, " clientToken:", clientToken, ' state:', JSON.stringify( stateObject, null, 4 ) );
		if ( clientTokenUpdate === clientToken )
		{
			shadow.end();
		}
	} );

	shadow.on( 'delta', ( thingName, stateObject ) =>
	{
		console.log( 'received delta on ' + thingName + ': ' + JSON.stringify( stateObject ) );
	} );

	shadow.on( 'timeout', ( thingName, clientToken ) =>
	{
		console.log( 'received timeout on ' + thingName + ' with clientToken: ' + clientToken );
		shadow.end();
	} );

	shadow.on( 'message', ( topic, message ) =>
	{
		console.log( 'received message on ' + topic + ' message: ' + message );
	} );

	await new Promise( function(reslove, reject)
	{
		shadow.on( 'connect', () =>
		{
			shadow.register( thingName, {}, () =>
			{
				console.log("shadow.register() done. thingName:", thingName);
				reslove("shadow connected.");
			} );
		} );
	} );

	// let state = { "state": { "desired": { "red": rval, "green": gval, "blue": bval } } };
	// console.log("shadow.update() state:", JSON.stringify(state));
	// clientTokenUpdate = shadow.update( thingName, state );
	// console.log( "clientTokenUpdate:", clientTokenUpdate );
	// if ( clientTokenUpdate === null )
	// {
	// 	console.log( 'update shadow failed, operation still in progress' );
	// }
	// else
	// {
	// 	console.log("shadow.update() token", clientTokenUpdate);
	// }

	console.log("shadow.get() invoke");
	clientTokenUpdate = shadow.get(thingName);
	console.log("shadow.get() token:", clientTokenUpdate);
	// shadow.end();

// end main
} )();