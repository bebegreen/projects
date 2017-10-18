const jwt = require('jsonwebtoken');

exports.validate = (req, res, next) => {
    let token = req.headers.authorization;
  
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.sendStatus(401);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                req.username = decoded.username;
                next();
            }
        });

    } else {
        if (req.baseUrl === '/api/jobs') next();
        else {
            
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }

    }
}
