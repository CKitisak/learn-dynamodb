/**
 * Step 2: Load Sample Data
 * REF: http://docs.aws.amazon.com/amazondynamodb/latest/
 *      gettingstartedguide/GettingStarted.NodeJs.02.html
 */

var AWS = require('aws-sdk');
var fs = require('fs');
var async = require('async');

var awsConfig = require('./aws-config');

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait...');

var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

/**
 * Allow 10 items at a time to solve 
 * importation stopped while processing
 */
var itemLimit = 10; // can change this value, depend on your machine

async.eachLimit(allMovies, itemLimit, function(movie, callback) {
    var params = {
        TableName: 'Movies',
        Item: {
            year: movie.year,
            title: movie.title,
            info: movie.info
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            callback(err);
        } else {
            console.log('Add movie succeeded:', movie.title);
            callback();
        }
    });
}, function(error) {
    if (error) {
        console.error(JSON.stringify(err, null, 2));
    } else {
        console.log('Importing movies done!!');
    }
});
