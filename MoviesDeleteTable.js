/**
 * Step 5: Delete the Table
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.05.html
 */

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config');

AWS.config.update(awsConfig);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : 'Movies'
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
});
