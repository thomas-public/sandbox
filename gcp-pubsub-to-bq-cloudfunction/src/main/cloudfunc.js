const { BigQuery } = require( '@google-cloud/bigquery' );

// {"data":"eyJ0c3RhbXAiOjE1ODk0NzQ5MDIyNDIsIm5hbWUiOiJ0YW5rLWIxIiwidmFsdWUiOjYxLjg0NTMxODAwNDM2MjYyfQ=="}
exports.onPubSubEvent = async ( event, context ) =>
{
	console.debug( "data:", event.data );
	const jsonMsg = JSON.parse(Buffer.from( event.data, 'base64' ).toString());
	console.debug( "json:", JSON.stringify(jsonMsg) );

	const bigqueryClient = new BigQuery();
	// Insert data into a table
	let rows = [jsonMsg];
	console.debug( "rows:", JSON.stringify(rows) );
	let ret = await bigqueryClient
		.dataset( "wt_test" )
		.table( "wt_test1" )
		.insert( rows );
	console.debug( `Inserted ${rows.length} rows` );
	console.debug( 'ret:', ret);
};
