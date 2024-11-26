const SqsService = require("../services/sqs.service");

module.exports = {
  sendSMS: async (req, res) => {
    
    const response = {
      statusCode: 200,
      message: "El mensaje se añadió éxitosamente a la cola de envíos."
    }
  
  
    const quequeUri = process.env.QUEUE_MESSAGE_STATUS_URL;
  
    const sms = req.body;
  
    if (sms.message.length < 0) {
      response.statusCode = 400;
      response.message = "El mensaje enviado no es válido.";
    }
  
    await SqsService.enqueueMessage(quequeUri, sms)
      .catch((err) => {
        console.log("SQS error:", err);
        response.statusCode = 502;
        response.message = "No ha sido posible añadir el mensaje a la cola de envíos.";
      });
  
    res.status(response.statusCode).send(response.message);

  }
}