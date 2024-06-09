const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

const sendSSE = (res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.write(': ping\n\n');

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  sequelize.query("SELECT * FROM product", { type: QueryTypes.SELECT })
  .then(products => {
    products.forEach((product, index) => {
      setTimeout(() => {
        sendEvent({ message: `Product ${product.product_id} ${product ? 'successfully inserted' : 'failed to insert'}` });
      }, index * 1000); 
    });
  })
    .catch(error => {
      console.error('Error querying products:', error);
    });
};

module.exports = { sendSSE };
