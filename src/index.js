const express = require('express');
const dotenv = require('dotenv');
const { healthRouter } = require('./routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use('/health', healthRouter);
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
