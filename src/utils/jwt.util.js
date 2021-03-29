const jwt = require('jsonwebtoken');

const jwtVerify = (jwtToken) => new Promise((resolve, reject) => {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err,user) => {
        if (err) {
          console.log("err jwt util",err);
          reject(err);
        }
        console.log('user jwt util', user);
        resolve(user);
    });
});

module.exports = { jwtVerify }


