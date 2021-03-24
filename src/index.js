const express = require('express');
const dotenv = require('dotenv');
const {
  healthRouter, loginRouter, registerRouter, logoutRouter,
} = require('./routes');

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 7000;

app.use('/health', healthRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
