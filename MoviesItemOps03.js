/**
 * Step 3.3: Update an Item
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.03
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

// Update the item, Unconditionally

var params = {
    TableName: mockData.table,
    Key: {
        year: mockData.year,
        title: mockData.title
    },
    UpdateExpression: 'set info.rating = :rating, '+
                        'info.plot = :plot, '+
                        'info.actors = :actors',
    ExpressionAttributeValues: {
        ':rating': 5.5,
        ':plot': 'Everything happens all at once.',
        ':actors': ['Larry', 'Moe', 'Curly']
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
