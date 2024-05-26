const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const moment = require('moment');
const port = 5001;

app.use(bodyParser.json());

  app.post('/webhook', async (req, res) => {
    const orderId = req.body.queryResult.parameters.orderId;
    try {
      const response = await axios.post('https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus', {
        orderId: orderId
      });
      const shipmentDateISO = response.data.shipmentDate;
      const shipmentDateFormatted = moment(shipmentDateISO).format('dddd, DD MMM YYYY');
      res.json({
        fulfillmentText: `Your order will be shipped on ${shipmentDateFormatted}`
      });
    } catch (error) {
      res.json({
        fulfillmentText: 'There was an error retrieving your order status.'
      });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});