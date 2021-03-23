const express = require('express');
const dotenv = require('dotenv');
const { healthRouter, loginRouter } = require('./routes');

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 7000;

app.use('/health', healthRouter);
app.use('/login', loginRouter);
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
