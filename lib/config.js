var ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = {
    secret: 'mucuxita',
    database: 'mongodb://52.207.235.87:27017/driveondb',   
    jwtSecret: 'socorrammesubinoonibusemmarrocos',
    jwtSession: {session: false}    
}