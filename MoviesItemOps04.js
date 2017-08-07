/**
 * Step 3.4: Increment an Atomic Counter
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.04
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

// Increment an atomic counter

var params = {
    TableName: mockData.table,
    Key: {
        year: mockData.year,
        title: mockData.title
    },
    UpdateExpression: 'set info.rating = info.rating + :val',
    ExpressionAttributeValues: {
        ':val': 1
    },
    ReturnValues: 'UPDATED_NEW'
};

console.log('Updating the item...');

docClient.update(params, function(err, data) {
    if (err) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
});
