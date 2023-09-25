const jwt = require("jsonwebtoken");
const User = require("../backend/models/User"); 
const keys = require("../backend/config/key");  
function authenticate(req, res, next) {

    // Extract the token from the authorization header
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        // Verify the token
        jwt.verify(req.token, keys.secretOrKey, (err, authData) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });  
            } else {
                User.findById(authData.id)
                    .then(user => {
                        if (user) {
                            req.user = user;  
                            next();
                        } else {
                            return res.status(404).json({ message: "User not found." });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ message: "Internal server error." });
                    });
            }
        });
    } else {
        return res.status(403).json({ error: 'Authorization token is missing' });  
    }
}

module.exports = authenticate;
