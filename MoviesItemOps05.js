/**
 * Step 3.5: Update an Item (Conditionally)
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.05
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

// Conditional update

var params = {
    TableName: mockData.table,
    Key: {
        year: mockData.year,
        title: mockData.title
    },
    UpdateExpression: 'remove info.actors[0]',
    ConditionExpression: 'size(info.actors) >= :num',
    ExpressionAttributeValues: {
        ':num': 3
    },
    ReturnValues: 'UPDATED_NEW'
};

console.log('Attempting a conditional update...');

docClient.update(params, function(err, data) {
    if (err) {
        console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
});
