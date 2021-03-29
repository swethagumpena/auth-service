const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const appRoot = require('app-root-path');
const cors = require('cors');


if (process.env.NODE_APP_ENV === 'local') {
  dotenv.config({
    path: path.resolve(appRoot.path, `${process.env.NODE_APP_ENV}.env`),
  });

} else dotenv.config();

const {
  healthRouter, loginRouter, registerRouter, logoutRouter, authRouter,
} = require('./src/routes');


console.log(process.env.DB_HOSTNAME)

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7000;

app.use('/health', healthRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/validateToken', authRouter);

app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
