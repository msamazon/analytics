var ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = {
    secret: 'mucuxita',
    database: 'mongodb://localhost:27017/driveondb',   
    jwtSecret: 'socorrammesubinoonibusemmarrocos',
    jwtSession: {session: false}    
}