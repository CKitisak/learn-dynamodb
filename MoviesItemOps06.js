/**
 * Step 3.6: Delete an Item
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.06
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: mockData.table,
    Key: {
        year: mockData.year,
        title: mockData.title
    },
    // ConditionExpression: 'info.rating <= :val',
    // ExpressionAttributeValues: {
    //     ':val': 5.0
    // }
};

// console.log('Attempting a conditional delete...');

docClient.delete(params, function(err, data) {
    if (err) {
        console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2));
    }
});
