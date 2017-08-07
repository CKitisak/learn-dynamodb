/**
 * Step 4.2: Query - All Movies Released in a Year with Certain Titles
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/
 *      GettingStarted.NodeJs.04.html#GettingStarted.NodeJs.04.Query.02
 */

var AWS = require('aws-sdk');
var awsConfig = require('./aws-config');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Querying for movies from 1992 - titles A-L, with genres and lead actor');

var params = {
    TableName: 'Movies',
    ProjectionExpression: '#yr, title, info.genres, info.actors[0]',
    KeyConditionExpression: '#yr = :yyyy and title between :letter1 and :letter2',
    ExpressionAttributeNames: {
        '#yr': 'year'
    },
    ExpressionAttributeValues: {
        ':yyyy': 1992,
        ':letter1': 'A',
        ':letter2': 'L'
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.log('Unable to query. Error:', JSON.stringify(err, null, 2));
    } else {
        console.log('Query succeeded.');
        data.Items.forEach(function(item) {
            console.log(' -', item.year + ': ' + item.title
                + ' ... ' + item.info.genres
                + ' ... ' + item.info.actors[0]);
        });
    }
});
