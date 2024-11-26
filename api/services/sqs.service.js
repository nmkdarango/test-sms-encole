const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.QUEUE_MESSAGE_STATUS_ACCESS_KEY_ID,
  secretAccessKey: process.env.QUEUE_MESSAGE_STATUS_SECRET_ACCESS_KEY,
  region: "us-west-2"
});

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const enqueueMessage = (queueUri, body) => {

  const params = {
    MessageBody: JSON.stringify(body),
    DelaySeconds: 0,
    QueueUrl: queueUri
  }

  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}

module.exports = {
  enqueueMessage
}