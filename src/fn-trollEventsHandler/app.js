
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const comprehend = new AWS.Comprehend();

exports.lambdaHandler = async ( event ) => {
    try {

        // Log incoming event and environment variables
        console.log(event)

        console.log("Variable 'UserPreferencesTable': " + process.env.UserPreferencesTable)
        console.log("Variable 'MSTeamsSQSUrl': " + process.env.MSTeamsSQSUrl)

        // STEP 1: Amazon Comprehend => AI Sentiment analysis to retrieve severity
        var sentiment = await detectSentiment(event.detail.text, 'en')
        console.log("Message sentiment: " + sentiment)

        // STEP 2: DynamoDB => Retrieve list of subscribed profiles to sensitive-types

        // STEP 3: For each subscriber route to channel sqs
        
        return "succesfully finished"
    } catch (err) {
        console.log(err);
        throw err
    }
};

async function detectSentiment(text, language) {

    var params = {
        LanguageCode: language, 
        Text: text 
    };

    var sentimentAnalysis = await comprehend.detectSentiment(params).promise()
    console.log(sentimentAnalysis)
    return sentimentAnalysis.Sentiment

}