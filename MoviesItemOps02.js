/**
 * Step 3.2: Read an Item
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.03.html
 *      #GettingStarted.NodeJs.03.02
 */

 var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');
var mockData = require('./mock-data');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

//  Get the item

var params = {
    TableName: mockData.table,
    Key: {
        year: mockData.year,
        title: mockData.title
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Get item succeeded:', JSON.stringify(data, null, 2));
    }
});
