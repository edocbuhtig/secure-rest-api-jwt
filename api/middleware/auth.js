const jwt = require('jsonwebtoken');

const fs = require('fs');

var publicKEY  = fs.readFileSync('./public.key', 'utf8');

var i  = 'Test';          // Issuer 
var s  = 'some@user.com'; // Subject 
var a  = 'http://test.in'; // Audience

var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "1h",
    algorithm:  ["RS256"]
};

const authenticate = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"] || req.headers["authorization"];
    
        //console.log("token" + token)

        if (!token) return res.status(401).json({
            error: "Sorry! You are not authorised"
        });

        if(token){

            console.log("token>>" + token)
            const tokenval = token.split(" ")[1];
            const decoded = jwt.verify(tokenval, publicKEY, verifyOptions);
            next();
        }
        
        
    } catch (ex) {
        //console.log(ex)
        res.status(400).json({
            error: "Access denied"
        });
    }
}

module.exports = authenticate;





