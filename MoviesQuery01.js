/**
 * Step 4.1: Query - All Movies Released in a Year
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/
 *      GettingStarted.NodeJs.04.html#GettingStarted.NodeJs.04.Query.01
 */

var AWS = require('aws-sdk');
var awsConfig = require('./aws-config');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Querying for movies from 1985.');

var params = {
    TableName: 'Movies',
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
        '#yr': 'year'
    },
    ExpressionAttributeValues: {
        ':yyyy': 1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
        console.log('Query succeeded.');
        data.Items.forEach(function(item) {
            console.log(' -', item.year + ': ' + item.title);
        });
    }
});
