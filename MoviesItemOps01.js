/**
 * Step 3.1: Create a New Item
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.01
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);


var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: mockData.table,
    Item: {
        year: mockData.year,
        title: mockData.title,
        info: {
            plot: 'Nothing happens at all',
            rating: 0
        }
    }
};

console.log('Adding a new item...');

docClient.put(params, function(err, data) {
    if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Added item:', JSON.stringify(data, null, 2));
    }
});
